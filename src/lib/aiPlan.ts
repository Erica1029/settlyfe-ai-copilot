import "server-only";

import type { AiPlanRequest, AiPlanResponse } from "@/types/aiPlan";

const AI_RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    status: { type: "string", enum: ["ai"] },
    explanation: {
      type: "object",
      additionalProperties: false,
      properties: {
        intro: { type: "string" },
        budgetFit: { type: "string" },
        commuteAnalysis: { type: "string" },
        lifestyleFit: { type: "string" },
        whyThisFits: {
          type: "array",
          minItems: 2,
          maxItems: 4,
          items: { type: "string" },
        },
        watchOuts: {
          type: "array",
          minItems: 2,
          maxItems: 4,
          items: { type: "string" },
        },
        nextSteps: {
          type: "array",
          minItems: 2,
          maxItems: 4,
          items: { type: "string" },
        },
      },
      required: [
        "intro",
        "budgetFit",
        "commuteAnalysis",
        "lifestyleFit",
        "whyThisFits",
        "watchOuts",
        "nextSteps",
      ],
    },
    checklist: {
      type: "array",
      minItems: 1,
      maxItems: 16,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          section: {
            type: "string",
            enum: ["Rental Prep", "Viewing Questions", "Furniture Plan", "Move-in Day"],
          },
          id: { type: "string" },
          title: { type: "string" },
        },
        required: ["section", "id", "title"],
      },
    },
    safety: {
      type: "object",
      additionalProperties: false,
      properties: {
        usedOnlyProvidedFacts: { type: "boolean", enum: [true] },
        changedRecommendation: { type: "boolean", enum: [false] },
        addedExternalListingData: { type: "boolean", enum: [false] },
      },
      required: ["usedOnlyProvidedFacts", "changedRecommendation", "addedExternalListingData"],
    },
  },
  required: ["status", "explanation", "checklist", "safety"],
} as const;

const fallbackExplanation = (request: AiPlanRequest): AiPlanResponse["explanation"] => ({
  intro: request.recommendationFacts.intro,
  budgetFit: request.recommendationFacts.controlledCopy.budgetFit,
  commuteAnalysis: request.recommendationFacts.controlledCopy.commuteAnalysis,
  lifestyleFit: request.recommendationFacts.controlledCopy.lifestyleFit,
  whyThisFits: request.recommendationFacts.controlledCopy.whyThisFits,
  watchOuts: request.recommendationFacts.controlledCopy.watchOuts,
  nextSteps: request.recommendationFacts.controlledCopy.nextSteps,
});

export function createFallbackAiPlanResponse(
  request: AiPlanRequest,
  fallbackReason = "AI plan is unavailable.",
): AiPlanResponse {
  return {
    status: "fallback",
    explanation: fallbackExplanation(request),
    checklist: request.checklistFacts.map(({ section, id, title }) => ({ section, id, title })),
    safety: {
      usedOnlyProvidedFacts: true,
      changedRecommendation: false,
      addedExternalListingData: false,
    },
    fallbackReason,
  };
}

export function isAiPlanRequest(value: unknown): value is AiPlanRequest {
  if (!value || typeof value !== "object") return false;
  const request = value as Partial<AiPlanRequest>;

  return (
    request.version === "v2-ai-plan" &&
    request.locale === "en-US" &&
    Boolean(request.userPreferences) &&
    Boolean(request.recommendationFacts?.bestFit) &&
    Array.isArray(request.recommendationFacts?.otherGoodMatches) &&
    Array.isArray(request.checklistFacts) &&
    request.constraints?.mayOnlyUseProvidedFacts === true &&
    request.constraints.mustNotInventPrices === true &&
    request.constraints.mustNotInventCommuteTimes === true &&
    request.constraints.mustNotInventAddresses === true &&
    request.constraints.mustNotInventAvailability === true &&
    request.constraints.mustPreserveRecommendationRanking === true
  );
}

function isStringArray(value: unknown, min: number, max: number): value is string[] {
  return (
    Array.isArray(value) &&
    value.length >= min &&
    value.length <= max &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function allText(response: AiPlanResponse) {
  return [
    response.explanation.intro,
    response.explanation.budgetFit,
    response.explanation.commuteAnalysis,
    response.explanation.lifestyleFit,
    ...response.explanation.whyThisFits,
    ...response.explanation.watchOuts,
    ...response.explanation.nextSteps,
    ...response.checklist.map((item) => item.title),
  ].join(" \n ");
}

const normalizeMoney = (value: string) => Number(value.replace(/[^0-9]/g, ""));

function collectAllowedMoney(request: AiPlanRequest) {
  const money = new Set<number>();
  money.add(request.userPreferences.monthlyBudget);
  money.add(request.recommendationFacts.bestFit.price);
  request.recommendationFacts.bestFit.budgetBand.forEach((value) => money.add(value));
  request.recommendationFacts.otherGoodMatches.forEach((match) => {
    money.add(match.price);
    match.budgetBand.forEach((value) => money.add(value));
  });
  return money;
}

function collectAllowedCommutes(request: AiPlanRequest) {
  const commutes = new Set<number>();
  commutes.add(request.userPreferences.maxCommuteMinutes);
  commutes.add(request.recommendationFacts.bestFit.commuteMinutes);
  request.recommendationFacts.otherGoodMatches.forEach((match) => {
    commutes.add(match.commuteMinutes);
  });
  return commutes;
}

function hasUnsupportedMoney(text: string, request: AiPlanRequest) {
  const allowed = collectAllowedMoney(request);
  const matches = text.match(/\$\s?[0-9][0-9,]*/g) ?? [];
  return matches.some((match) => !allowed.has(normalizeMoney(match)));
}

function hasUnsupportedCommute(text: string, request: AiPlanRequest) {
  const allowed = collectAllowedCommutes(request);
  const matches = [...text.matchAll(/\b([0-9]{1,3})\s?(?:min|mins|minute|minutes)\b/gi)];
  return matches.some((match) => !allowed.has(Number(match[1])));
}

function hasForbiddenClaims(text: string) {
  return /\b(available now|currently available|live listing|live listings|real-time|real time|address|unit #[a-z0-9-]+|apply now|guaranteed|guarantee)\b/i.test(
    text,
  );
}

export function validateAiPlanResponse(
  value: unknown,
  request: AiPlanRequest,
): value is AiPlanResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<AiPlanResponse>;
  const checklistIds = new Set(request.checklistFacts.map((item) => item.id));
  const checklistSections = new Map(request.checklistFacts.map((item) => [item.id, item.section]));

  if (response.status !== "ai") return false;
  if (!response.explanation || typeof response.explanation !== "object") return false;
  if (!response.safety || response.safety.usedOnlyProvidedFacts !== true) return false;
  if (response.safety.changedRecommendation !== false) return false;
  if (response.safety.addedExternalListingData !== false) return false;
  if (typeof response.explanation.intro !== "string") return false;
  if (typeof response.explanation.budgetFit !== "string") return false;
  if (typeof response.explanation.commuteAnalysis !== "string") return false;
  if (typeof response.explanation.lifestyleFit !== "string") return false;
  if (!isStringArray(response.explanation.whyThisFits, 2, 4)) return false;
  if (!isStringArray(response.explanation.watchOuts, 2, 4)) return false;
  if (!isStringArray(response.explanation.nextSteps, 2, 4)) return false;
  if (!Array.isArray(response.checklist)) return false;
  if (response.checklist.length !== request.checklistFacts.length) return false;
  if (!/\b(sample|controlled|San Diego|UCSD)\b/i.test(response.explanation.intro)) return false;
  if (
    !response.checklist.every(
      (item) =>
        checklistIds.has(item.id) &&
        checklistSections.get(item.id) === item.section &&
        typeof item.title === "string" &&
        item.title.trim().length > 0,
    )
  ) {
    return false;
  }

  const candidate = response as AiPlanResponse;
  const text = allText(candidate);
  if (hasUnsupportedMoney(text, request)) return false;
  if (hasUnsupportedCommute(text, request)) return false;
  if (hasForbiddenClaims(text)) return false;

  return true;
}

function responseTextFromOpenAiPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const outputText = (payload as { output_text?: unknown }).output_text;
  if (typeof outputText === "string") return outputText;

  const output = (payload as { output?: unknown }).output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const content = (item as { content?: unknown }).content;
      if (!Array.isArray(content)) return [];
      return content
        .map((contentItem) => {
          if (!contentItem || typeof contentItem !== "object") return "";
          const text = (contentItem as { text?: unknown }).text;
          return typeof text === "string" ? text : "";
        })
        .filter(Boolean);
    })
    .join("");
}

export async function requestAiPlan({
  request,
  apiKey,
  model,
  timeoutMs,
}: {
  request: AiPlanRequest;
  apiKey: string;
  model: string;
  timeoutMs: number;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "You are Settlyfe AI Copilot's explanation writer. You do not choose listings, prices, commute times, addresses, rankings, room types, bathroom types, or availability. The rule-based recommendation facts are the only source of truth. Explain the provided plan clearly for a student or young renter, using only the facts in the request. Return valid JSON only.",
          },
          {
            role: "user",
            content: JSON.stringify({
              task:
                "Rewrite and explain this controlled recommendation plan. Do not change the winner, rankings, fit scores, budget bands, commute values, room types, bathroom types, area names, checklist sections, checklist item ids, or source facts. Keep the transparency note. If a detail is not present, do not add it.",
              plan: request,
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "settlyfe_ai_plan_response",
            strict: true,
            schema: AI_RESPONSE_SCHEMA,
          },
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    const text = responseTextFromOpenAiPayload(payload);
    if (!text) return null;

    const parsed = JSON.parse(text) as unknown;
    return validateAiPlanResponse(parsed, request) ? parsed : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
