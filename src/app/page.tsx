"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { defaultPreferences } from "@/data/mockNeighborhoods";
import { generateChecklist } from "@/lib/checklistGenerator";
import { generateRecommendation } from "@/lib/recommendationEngine";
import { buildAiPlanRequest, type AiPlanResponse } from "@/types/aiPlan";
import type { ChecklistSection, RecommendationResult, Screen, UserPreferences } from "@/types/rental";
import {
  BottomNav,
  Button,
  ChecklistCard,
  Chip,
  FlowTopBar,
  HomeFeatureGrid,
  HomeHeader,
  InsightList,
  ListingPreviewSections,
  MatchCard,
  MobileFrame,
  RadioOption,
  SectionTitle,
  StatusBar,
  StepHeader,
  StickyFooter,
  TextField,
} from "@/components/SettlyfeUI";

const commuteOptions = ["15 min", "30 min", "45 min", "60 min"];
const roomTypeOptions = ["Private room", "Shared room", "Studio", "Entire unit"];
const carOptions = ["Yes", "No"];
const lifestyleOptions = ["Quiet and focused", "Social and active", "Balanced"];
const loadingSteps = [
  "Reviewing your budget",
  "Comparing commute options",
  "Matching lifestyle preferences",
  "Checking room and car access",
  "Preparing your move-in plan",
];
const otherMatchImages = [
  "/images/match-card-1.jpg",
  "/images/match-card-2.jpg",
  "/images/match-card-3.jpg",
  "/images/match-card-4.jpg",
];

type ResultState = "normal" | "unsupported-location" | "no-strong-match";

function normalizeDemoScopeInput(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[,.]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");
}

function isSupportedSanDiegoCity(value: string) {
  const normalized = normalizeDemoScopeInput(value);
  return normalized === "san diego" || normalized === "san diego ca";
}

function isSupportedUcsdDestination(value: string) {
  const normalized = normalizeDemoScopeInput(value);
  return (
    normalized === "ucsd" ||
    normalized === "uc san diego" ||
    normalized === "university of california san diego"
  );
}

function isSupportedDemoScope(preferences: UserPreferences) {
  return (
    isSupportedSanDiegoCity(preferences.city) &&
    isSupportedUcsdDestination(preferences.destination)
  );
}

function getResultState(
  preferences: UserPreferences,
  recommendation: RecommendationResult,
): ResultState {
  if (!isSupportedDemoScope(preferences)) return "unsupported-location";
  if (
    recommendation.bestMatch.rawScore < 60 ||
    isFarBelowCheapestSampleRent(preferences, recommendation)
  ) {
    return "no-strong-match";
  }
  return "normal";
}

function formatLocationInput(preferences: UserPreferences) {
  const city = preferences.city.trim();
  const destination = preferences.destination.trim();
  if (city && destination) return `${city} / ${destination}`;
  return city || destination || "that location";
}

const toBudget = (value: string) => {
  const parsed = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

function getCandidateRents(recommendation: RecommendationResult) {
  return [recommendation.bestMatch, ...recommendation.otherMatches].map((match) => match.price);
}

function getCheapestAvailableRent(recommendation: RecommendationResult) {
  return Math.min(...getCandidateRents(recommendation));
}

function isFarBelowCheapestSampleRent(
  preferences: UserPreferences,
  recommendation: RecommendationResult,
) {
  const budget = toBudget(preferences.budget);
  const cheapestRent = getCheapestAvailableRent(recommendation);
  return budget > 0 && Number.isFinite(cheapestRent) && budget < cheapestRent * 0.7;
}

function formatRent(value: number) {
  return `$${value.toLocaleString()}/mo`;
}

function getNoStrongMatchSuggestions(
  preferences: UserPreferences,
  recommendation: RecommendationResult,
) {
  const suggestions: string[] = [];
  const budget = toBudget(preferences.budget);
  const commute = Number(preferences.commute);
  const cheapestRent = getCheapestAvailableRent(recommendation);

  if (isFarBelowCheapestSampleRent(preferences, recommendation)) {
    suggestions.push(
      `Increase budget closer to the lowest available sample rent. Lowest sample option starts around ${formatRent(cheapestRent)}.`,
    );
  } else if (budget > 0 && budget < 1000) {
    suggestions.push("Increase monthly budget to open more realistic San Diego / UCSD options.");
  }
  if (Number.isFinite(commute) && commute <= 15) {
    suggestions.push("Expand your commute target beyond 15 minutes to include more sample areas.");
  }
  if (preferences.roomType === "Private room" || preferences.bathroom === "Private") {
    suggestions.push("Consider shared room or shared bathroom options while comparing tradeoffs.");
  }
  if (preferences.furniture === "Fully" || preferences.furniture === "Partially") {
    suggestions.push("Relax the furnished requirement or plan a separate furniture setup.");
  }
  if (preferences.hasCar === "No") {
    suggestions.push("Check transit-friendly areas or increase commute flexibility if you do not have a car.");
  }

  return suggestions.length
    ? suggestions
    : ["Review budget, commute, room type, and furniture constraints before generating another plan."];
}

async function requestAiEnhancement({
  preferences,
  recommendation,
  checklist,
  signal,
}: {
  preferences: UserPreferences;
  recommendation: RecommendationResult;
  checklist: ChecklistSection[];
  signal: AbortSignal;
}) {
  try {
    const response = await fetch("/api/ai-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildAiPlanRequest(preferences, recommendation, checklist)),
      signal,
    });

    if (!response.ok) return null;

    const aiPlan = (await response.json()) as AiPlanResponse;
    return aiPlan.status === "ai" ? aiPlan : null;
  } catch {
    return null;
  }
}

function mergeAiRecommendation(
  recommendation: RecommendationResult,
  aiPlan: AiPlanResponse,
): RecommendationResult {
  return {
    ...recommendation,
    intro: aiPlan.explanation.intro,
    budgetFit: aiPlan.explanation.budgetFit,
    commuteAnalysis: aiPlan.explanation.commuteAnalysis,
    lifestyleFit: aiPlan.explanation.lifestyleFit,
    whyThisFits: aiPlan.explanation.whyThisFits,
    watchOuts: aiPlan.explanation.watchOuts,
    nextSteps: aiPlan.explanation.nextSteps,
  };
}

function mergeAiChecklist(
  checklist: ChecklistSection[],
  aiPlan: AiPlanResponse,
): ChecklistSection[] {
  const aiTitles = new Map(aiPlan.checklist.map((item) => [item.id, item.title]));

  return checklist.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      title: aiTitles.get(item.id) ?? item.title,
    })),
  }));
}

export default function SettlyfeCopilotV1() {
  const [screen, setScreen] = useState<Screen>("home");
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [recommendation, setRecommendation] = useState<RecommendationResult>(() =>
    generateRecommendation(defaultPreferences),
  );
  const [checklist, setChecklist] = useState<ChecklistSection[]>(() =>
    generateChecklist(defaultPreferences, generateRecommendation(defaultPreferences)),
  );
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);
  const generationId = useRef(0);

  useEffect(() => {
    if (screen !== "loading") return;

    const currentGenerationId = generationId.current + 1;
    generationId.current = currentGenerationId;
    const controller = new AbortController();

    setLoadingIndex(0);
    const interval = window.setInterval(() => {
      setLoadingIndex((current) => Math.min(current + 1, loadingSteps.length));
    }, 430);
    const timeout = window.setTimeout(() => {
      const nextRecommendation = generateRecommendation(preferences);
      const nextChecklist = generateChecklist(preferences, nextRecommendation);
      void (async () => {
        const nextResultState = getResultState(preferences, nextRecommendation);
        const aiPlan = nextResultState === "normal"
          ? await requestAiEnhancement({
              preferences,
              recommendation: nextRecommendation,
              checklist: nextChecklist,
              signal: controller.signal,
            })
          : null;

        if (controller.signal.aborted || generationId.current !== currentGenerationId) {
          return;
        }

        setRecommendation(aiPlan ? mergeAiRecommendation(nextRecommendation, aiPlan) : nextRecommendation);
        setChecklist(aiPlan ? mergeAiChecklist(nextChecklist, aiPlan) : nextChecklist);
        setCompleted({});
        setSaved(false);
        setScreen("result");
        window.clearInterval(interval);
      })();
    }, 2500);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [preferences, screen]);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => {
    setPreferences((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const validateMoveBasics = () => {
    const budget = Number(preferences.budget.replace(/[^0-9]/g, ""));
    if (!preferences.city.trim() || !budget) {
      setError("Please add your city and monthly budget.");
      return;
    }
    setScreen("housingNeeds");
  };

  const completedCount = useMemo(() => {
    return checklist
      .flatMap((section) => section.items)
      .filter((item) => Boolean(completed[item.id])).length;
  }, [checklist, completed]);

  const savePlan = () => {
    setSaved(true);
    window.setTimeout(() => {
      setScreen("home");
      setSaved(false);
      setCompleted({});
    }, 900);
  };

  return (
    <MobileFrame>
      {screen === "home" ? (
        <HomeScreen onStart={() => setScreen("moveBasics")} />
      ) : null}

      {screen === "moveBasics" ? (
        <MoveBasicsScreen
          preferences={preferences}
          error={error}
          onBack={() => setScreen("home")}
          onChange={updatePreference}
          onNext={validateMoveBasics}
        />
      ) : null}

      {screen === "housingNeeds" ? (
        <HousingNeedsScreen
          preferences={preferences}
          onBack={() => setScreen("moveBasics")}
          onChange={updatePreference}
          onGenerate={() => setScreen("loading")}
        />
      ) : null}

      {screen === "loading" ? <LoadingScreen currentStep={loadingIndex} /> : null}

      {screen === "result" ? (
        <ResultScreen
          preferences={preferences}
          recommendation={recommendation}
          onBack={() => setScreen("housingNeeds")}
          onChecklist={() => setScreen("checklist")}
          onRetry={() => setScreen("moveBasics")}
        />
      ) : null}

      {screen === "checklist" ? (
        <ChecklistScreen
          sections={checklist}
          completed={completed}
          completedCount={completedCount}
          saved={saved}
          onBack={() => setScreen("result")}
          onSave={savePlan}
          onToggle={(id) =>
            setCompleted((current) => ({
              ...current,
              [id]: !Boolean(current[id]),
            }))
          }
        />
      ) : null}
    </MobileFrame>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="scrollbar-hidden flex-1 overflow-y-auto pb-3">
        <HomeHeader />
        <section className="px-4 pt-7">
          <div
            className="relative h-[270px] overflow-hidden rounded-[14px] bg-[#f1efff] bg-cover bg-[70%_center] px-4 py-4 shadow-[0_10px_22px_rgba(100,99,240,0.12)]"
            style={{ backgroundImage: "url('/images/ai-copilot-banner-bg.png')" }}
          >
            <div className="absolute inset-y-0 left-0 w-[68%] bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.78)_58%,rgba(255,255,255,0)_100%)]" />
            <div className="relative z-10 max-w-[153px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/82 px-3 py-2 text-[14px] font-medium text-[#6463F0] shadow-[0_8px_18px_rgba(100,99,240,0.13)]">
                <Sparkles size={15} />
                Settlyfe AI
              </div>
              <h1 className="mt-5 text-[22px] font-extrabold leading-[27px]">
                Not sure
                <br />
                where to live?
              </h1>
              <p
                className="mt-2 w-[153px] text-[10px] leading-[16px] tracking-0 text-[#262628]"
                style={{ fontFamily: "Avenir, 'Avenir Next', Inter, system-ui, sans-serif" }}
              >
                Settlyfe AI compares your budget, commute, room type, and
                lifestyle tradeoffs before you apply.
              </p>
              <Button
                onClick={onStart}
                className="mt-3 text-[12px]"
                style={{ width: 107, height: 30, minHeight: 30, padding: 0, fontSize: 12, lineHeight: "14px" }}
              >
                Build my plan
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-7">
          <HomeFeatureGrid />
        </div>
        <div className="mt-9">
          <ListingPreviewSections />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function MoveBasicsScreen({
  preferences,
  error,
  onBack,
  onChange,
  onNext,
}: {
  preferences: UserPreferences;
  error: string;
  onBack: () => void;
  onChange: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StepHeader
        step="1 of 2"
        title="Tell us where you're moving"
        body="A few basics so we can match the right homes."
        onBack={onBack}
      />
      <div className="grid gap-2.5 px-4 pt-6">
        <p className="rounded-[8px] bg-[#f6f5ff] px-3 py-2 text-[13px] leading-[19px] text-[#646165]">
          Start with this sample San Diego / UCSD profile, or edit the details below.
        </p>
        <TextField
          label="Target city or area"
          value={preferences.city}
          onChange={(event) => onChange("city", event.target.value)}
        />
        <TextField
          label="School or workplace"
          value={preferences.destination}
          onChange={(event) => onChange("destination", event.target.value)}
        />
        <TextField
          label="Monthly budget (USD)"
          inputMode="numeric"
          value={preferences.budget}
          onChange={(event) => onChange("budget", event.target.value)}
        />
        <div className="pt-1.5">
          <SectionTitle>Max commute time</SectionTitle>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {commuteOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={`${preferences.commute} min` === option}
                onClick={() => onChange("commute", option.replace(" min", ""))}
              />
            ))}
          </div>
        </div>
        {error ? (
          <p className="rounded-[8px] bg-[#fff5eb] px-3 py-2 text-[13px] text-[#9a5400]">
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex-1" />
      <StickyFooter>
        <Button onClick={onNext} className="w-full">
          Next
        </Button>
      </StickyFooter>
    </div>
  );
}

function HousingNeedsScreen({
  preferences,
  onBack,
  onChange,
  onGenerate,
}: {
  preferences: UserPreferences;
  onBack: () => void;
  onChange: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StepHeader
        step="2 of 2"
        title="Room and lifestyle"
        body="Keep the plan focused with only the core tradeoffs."
        onBack={onBack}
      />
      <div className="scrollbar-hidden flex-1 overflow-y-auto">
        <div className="grid gap-4 px-4 pb-4 pt-6">
          <ChoiceGroup title="Room type">
            {roomTypeOptions.map((option) => (
              <RadioOption
                key={option}
                label={option}
                selected={preferences.roomType === option}
                onSelect={() => onChange("roomType", option)}
              />
            ))}
          </ChoiceGroup>
          <ChipGroup
            title="Do you have a car?"
            options={carOptions}
            selected={preferences.hasCar}
            onSelect={(value) => onChange("hasCar", value)}
          />
          <ChoiceGroup title="Lifestyle preference">
            {lifestyleOptions.map((option) => (
              <RadioOption
                key={option}
                label={option}
                selected={preferences.lifestyle === option}
                onSelect={() => onChange("lifestyle", option)}
              />
            ))}
          </ChoiceGroup>
        </div>
      </div>
      <StickyFooter>
        <Button onClick={onGenerate} className="w-full">
          Generate AI Plan
        </Button>
      </StickyFooter>
    </div>
  );
}

function LoadingScreen({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="grid flex-1 place-items-center px-6 pb-14">
        <div className="w-full">
          <div className="mx-auto grid size-[72px] place-items-center rounded-full bg-[#eeeeff] text-[#6463F0]">
            <span className="size-8 animate-spin rounded-full border-[3px] border-[#6463F0] border-t-transparent" />
          </div>
          <div className="mt-7 text-center">
            <h1 className="text-[22px] leading-[28px]">Preparing your rental plan</h1>
            <p className="mx-auto mt-3 max-w-[260px] text-[15px] leading-[24px] text-[#77777a]">
              We're comparing budget, commute, room type, car access, and lifestyle.
            </p>
          </div>
          <div className="mt-10 rounded-[8px] bg-white p-6 shadow-[0_14px_36px_rgba(0,0,0,0.05)]">
            <ul className="grid gap-5">
              {loadingSteps.map((step, index) => {
                const done = index < currentStep;
                const active = index === currentStep;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-4 text-[16px] leading-[22px] ${
                      done || active ? "text-[#262628]" : "text-[#b8b8bc]"
                    }`}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-full ${
                        done ? "bg-[#6463F0] text-white" : active ? "text-[#6463F0]" : "border border-[#d9d9dc]"
                      }`}
                    >
                      {done ? (
                        <Check size={15} strokeWidth={3} />
                      ) : active ? (
                        <span className="size-6 animate-spin rounded-full border-2 border-[#6463F0] border-t-transparent" />
                      ) : null}
                    </span>
                    {step}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({
  preferences,
  recommendation,
  onBack,
  onChecklist,
  onRetry,
}: {
  preferences: UserPreferences;
  recommendation: RecommendationResult;
  onBack: () => void;
  onChecklist: () => void;
  onRetry: () => void;
}) {
  const resultState = getResultState(preferences, recommendation);

  if (resultState === "unsupported-location") {
    return (
      <GuardrailResultScreen
        title="Demo area not available yet"
        body={`This V2 demo currently supports San Diego / UCSD sample data. ${formatLocationInput(preferences)} is outside the current demo scope, so it can't generate a reliable commute or rental plan for this input yet.`}
        suggestions={[
          "Try San Diego, CA and UC San Diego to view the full AI rental plan demo.",
          "Add destination-specific commute data in a future version.",
          "Expand the sample dataset before comparing unsupported schools, workplaces, or cities.",
        ]}
        onBack={onBack}
        onRetry={onRetry}
      />
    );
  }

  if (resultState === "no-strong-match") {
    return (
      <GuardrailResultScreen
        title="No strong match yet"
        body="Your current budget, commute, room, and housing preferences are difficult to satisfy within the controlled San Diego / UCSD sample data."
        suggestions={getNoStrongMatchSuggestions(preferences, recommendation)}
        onBack={onBack}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      <FlowTopBar title="Your AI Plan" onBack={onBack} />
      <div className="scrollbar-hidden flex-1 overflow-y-auto px-4 pb-32 pt-4">
        <div className="rounded-[14px] bg-[#eeeeff] p-3">
          <div className="flex gap-3">
            <Sparkles className="mt-1 shrink-0 text-[#6463F0]" size={17} />
            <div>
              <h1 className="text-[16px] leading-[22px]">Here's your match</h1>
              <p className="mt-1 text-[14px] leading-[21px] text-[#646165]">
                {recommendation.intro}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-extrabold">Best Fit Area</h2>
          <span className="shrink-0 rounded-full border border-[#6463F0] px-3 py-1 text-[12px] text-[#6463F0]">
            {recommendation.bestMatch.role}
          </span>
        </div>
        <div className="mt-3">
          <MatchCard
            match={recommendation.bestMatch}
            imageSrc="/images/result-main-home.jpg"
            large
          />
        </div>

        <PlanDetails recommendation={recommendation} />

        <div className="mt-8">
          <h2 className="mb-4 text-[17px] font-extrabold">Other Good Matches</h2>
          <div className="scrollbar-hidden -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {recommendation.otherMatches.map((match, index) => (
              <div key={match.id} className="h-[260px] w-[205px] shrink-0">
                <MatchCard match={match} imageSrc={otherMatchImages[index]} />
              </div>
            ))}
          </div>
        </div>

        <section className="mt-7">
          <h2 className="mb-4 text-[17px] font-extrabold">Next steps</h2>
          <InsightList items={recommendation.nextSteps} tone="action" />
        </section>
      </div>
      <StickyFooter>
        <Button onClick={onChecklist} className="w-full">
          View Move-in Checklist
        </Button>
      </StickyFooter>
    </div>
  );
}

function GuardrailResultScreen({
  title,
  body,
  suggestions,
  onBack,
  onRetry,
}: {
  title: string;
  body: string;
  suggestions: string[];
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      <FlowTopBar title="Your AI Plan" onBack={onBack} />
      <div className="scrollbar-hidden flex-1 overflow-y-auto px-4 pb-8 pt-4">
        <section className="rounded-[14px] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
          <div className="flex gap-3">
            <Sparkles className="mt-1 shrink-0 text-[#6463F0]" size={18} />
            <div>
              <h1 className="text-[18px] leading-[24px]">{title}</h1>
              <p className="mt-3 text-[14px] leading-[22px] text-[#646165]">
                {body}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[12px] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
          <h2 className="mb-4 text-[17px] font-extrabold">Suggested next steps</h2>
          <ul className="grid gap-4">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="flex items-start gap-3 text-[15px] leading-[22px] text-[#262628]">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#eeeeff] text-[#6463F0]">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-6">
          <Button onClick={onRetry} className="w-full">
            Try another search
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlanDetails({ recommendation }: { recommendation: RecommendationResult }) {
  return (
    <>
      <section className="mt-7">
        <h2 className="mb-4 text-[17px] font-extrabold">Why this fits</h2>
        <InsightList items={recommendation.whyThisFits} />
      </section>
      <section className="mt-7">
        <h2 className="mb-4 text-[17px] font-extrabold">Watch out for</h2>
        <InsightList items={recommendation.watchOuts} tone="warning" />
      </section>
      <section className="mt-7 rounded-[12px] bg-white p-4 text-[14px] leading-[21px] shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
        <h2 className="mb-3 text-[17px] font-extrabold">Plan details</h2>
        <div className="grid gap-3 text-[#5f5f63]">
          <p><strong className="text-[#262628]">Room type:</strong> {recommendation.recommendedRoomType}</p>
          <p><strong className="text-[#262628]">Budget fit:</strong> {recommendation.budgetFit}</p>
          <p><strong className="text-[#262628]">Commute:</strong> {recommendation.commuteAnalysis}</p>
          <p><strong className="text-[#262628]">Lifestyle:</strong> {recommendation.lifestyleFit}</p>
        </div>
      </section>
    </>
  );
}

function ChecklistScreen({
  sections,
  completed,
  completedCount,
  saved,
  onBack,
  onSave,
  onToggle,
}: {
  sections: ChecklistSection[];
  completed: Record<string, boolean>;
  completedCount: number;
  saved: boolean;
  onBack: () => void;
  onSave: () => void;
  onToggle: (id: string) => void;
}) {
  const total = sections.flatMap((section) => section.items).length;
  const progress = total ? (completedCount / total) * 100 : 0;

  return (
    <div className="flex h-full flex-col bg-[#f7f7f8]">
      <FlowTopBar title="Move-in Checklist" onBack={onBack} />
      <div className="scrollbar-hidden flex-1 overflow-y-auto px-4 pb-24 pt-5">
        <h1 className="text-[23px] leading-[30px]">Your move-in plan</h1>
        <p className="mt-3 text-[15px] text-[#77777a]">
          {completedCount} of {total} tasks complete
        </p>
        <div className="mt-5 h-1 rounded-full bg-[#e7e7ea]">
          <div
            className="h-full rounded-full bg-[#6463F0]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-6 grid gap-5">
          {sections.map((section) => (
            <ChecklistCard
              key={section.id}
              section={section}
              completed={completed}
              onToggle={onToggle}
            />
          ))}
        </div>
        {saved ? (
          <p className="mt-5 rounded-[8px] bg-[#effaf4] px-4 py-3 text-[14px] text-[#168553]">
            Plan saved for this demo session.
          </p>
        ) : null}
      </div>
      <StickyFooter>
        <Button onClick={onSave} disabled={saved} className="w-full">
          {saved ? "Saved" : "Save Plan"}
        </Button>
      </StickyFooter>
    </div>
  );
}

function ChoiceGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-2.5 grid gap-1">{children}</div>
    </section>
  );
}

function ChipGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </section>
  );
}
