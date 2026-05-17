import type { ChecklistSection, RecommendationResult, UserPreferences } from "@/types/rental";

export type AiPlanChecklistSectionTitle =
  | "Rental Prep"
  | "Viewing Questions"
  | "Furniture Plan"
  | "Move-in Day";

export type AiPlanChecklistFact = {
  section: AiPlanChecklistSectionTitle;
  id: string;
  title: string;
  reason: string;
};

export type AiPlanRequest = {
  version: "v2-ai-plan";
  locale: "en-US";
  transparencyNote: string;
  userPreferences: {
    targetCityOrArea: string;
    schoolOrWorkplace: string;
    monthlyBudget: number;
    maxCommuteMinutes: number;
    roomType: string;
    bathroomPreference: string;
    furnitureNeed: string;
    carOwnership: string;
    moveInTimeline: string;
    lifestylePreference: string;
    topPriorities: string[];
    dealBreakers: string[];
  };
  recommendationFacts: {
    intro: string;
    bestFit: {
      areaName: string;
      exampleMatchName: string;
      fitScore: number;
      roomType: string;
      bathroomType: string;
      price: number;
      budgetBand: [number, number];
      commuteMinutes: number;
      commuteLabel: string;
      lifestyleTags: string[];
      strengths: string[];
      tradeoffs: string[];
      riskNotes: string[];
      scoreReasons: string[];
    };
    otherGoodMatches: Array<{
      label: string;
      areaName: string;
      fitScore: number;
      price: number;
      budgetBand: [number, number];
      roomType: string;
      bathroomType: string;
      commuteMinutes: number;
      commuteLabel: string;
      strength: string;
      tradeoff: string;
    }>;
    controlledCopy: {
      recommendedRoomType: string;
      budgetFit: string;
      commuteAnalysis: string;
      lifestyleFit: string;
      whyThisFits: string[];
      watchOuts: string[];
      nextSteps: string[];
    };
  };
  checklistFacts: AiPlanChecklistFact[];
  constraints: {
    mayOnlyUseProvidedFacts: true;
    mustNotInventPrices: true;
    mustNotInventCommuteTimes: true;
    mustNotInventAddresses: true;
    mustNotInventAvailability: true;
    mustPreserveRecommendationRanking: true;
  };
};

export type AiPlanResponse = {
  status: "ai" | "fallback";
  explanation: {
    intro: string;
    budgetFit: string;
    commuteAnalysis: string;
    lifestyleFit: string;
    whyThisFits: string[];
    watchOuts: string[];
    nextSteps: string[];
  };
  checklist: Array<{
    section: AiPlanChecklistSectionTitle;
    id: string;
    title: string;
  }>;
  safety: {
    usedOnlyProvidedFacts: boolean;
    changedRecommendation: false;
    addedExternalListingData: false;
  };
  fallbackReason?: string;
};

const checklistSectionTitles: Record<ChecklistSection["id"], AiPlanChecklistSectionTitle> = {
  rentalPrep: "Rental Prep",
  viewingQuestions: "Viewing Questions",
  furniturePlan: "Furniture Plan",
  moveInDay: "Move-in Day",
};

const parseNumber = (value: string) => {
  const parsed = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const isSampleMarket = (preferences: UserPreferences) =>
  /san diego|ucsd|uc san diego|la jolla/i.test(
    `${preferences.city} ${preferences.destination}`,
  );

const commuteDestinationLabel = (preferences: UserPreferences) =>
  isSampleMarket(preferences)
    ? preferences.destination || "UCSD"
    : "the UCSD sample area";

export function buildAiPlanRequest(
  preferences: UserPreferences,
  recommendation: RecommendationResult,
  checklist: ChecklistSection[],
): AiPlanRequest {
  const best = recommendation.bestMatch;
  const destinationLabel = commuteDestinationLabel(preferences);

  return {
    version: "v2-ai-plan",
    locale: "en-US",
    transparencyNote:
      "This V2 demo uses controlled San Diego / UCSD sample data only. It is not a live rental search.",
    userPreferences: {
      targetCityOrArea: preferences.city,
      schoolOrWorkplace: preferences.destination,
      monthlyBudget: parseNumber(preferences.budget),
      maxCommuteMinutes: parseNumber(preferences.commute),
      roomType: preferences.roomType,
      bathroomPreference: preferences.bathroom,
      furnitureNeed: preferences.furniture,
      carOwnership: preferences.hasCar,
      moveInTimeline: preferences.moveInTimeline,
      lifestylePreference: preferences.lifestyle,
      topPriorities: preferences.priorities,
      dealBreakers: preferences.dealBreakers,
    },
    recommendationFacts: {
      intro: recommendation.intro,
      bestFit: {
        areaName: best.area,
        exampleMatchName: best.exampleMatch,
        fitScore: best.fitScore,
        roomType: best.roomType,
        bathroomType: best.bathroom,
        price: best.price,
        budgetBand: best.budgetBand,
        commuteMinutes: best.commuteMinutes,
        commuteLabel: `${best.commuteMinutes} min to ${destinationLabel}`,
        lifestyleTags: best.lifestyleTags,
        strengths: best.strengths,
        tradeoffs: best.tradeoffs,
        riskNotes: recommendation.watchOuts,
        scoreReasons: best.scoreReasons,
      },
      otherGoodMatches: recommendation.otherMatches.map((match) => ({
        label: match.role,
        areaName: match.area,
        fitScore: match.fitScore,
        price: match.price,
        budgetBand: match.budgetBand,
        roomType: match.roomType,
        bathroomType: match.bathroom,
        commuteMinutes: match.commuteMinutes,
        commuteLabel: `${match.commuteMinutes} min to ${destinationLabel}`,
        strength: match.strengths[0] ?? "",
        tradeoff: match.tradeoffs[0] ?? "",
      })),
      controlledCopy: {
        recommendedRoomType: recommendation.recommendedRoomType,
        budgetFit: recommendation.budgetFit,
        commuteAnalysis: recommendation.commuteAnalysis,
        lifestyleFit: recommendation.lifestyleFit,
        whyThisFits: recommendation.whyThisFits,
        watchOuts: recommendation.watchOuts,
        nextSteps: recommendation.nextSteps,
      },
    },
    checklistFacts: checklist.flatMap((section) =>
      section.items.map((item) => ({
        section: checklistSectionTitles[section.id],
        id: item.id,
        title: item.title,
        reason: item.reason ?? section.title,
      })),
    ),
    constraints: {
      mayOnlyUseProvidedFacts: true,
      mustNotInventPrices: true,
      mustNotInventCommuteTimes: true,
      mustNotInventAddresses: true,
      mustNotInventAvailability: true,
      mustPreserveRecommendationRanking: true,
    },
  };
}
