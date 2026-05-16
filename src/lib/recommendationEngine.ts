import { mockNeighborhoods } from "@/data/mockNeighborhoods";
import type {
  MockRentalArea,
  RecommendationResult,
  ScoredRentalArea,
  UserPreferences,
} from "@/types/rental";

const toBudget = (value: string) => {
  const parsed = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const includes = (items: string[], target: string) => items.includes(target);

function scoreArea(area: MockRentalArea, preferences: UserPreferences): ScoredRentalArea {
  const budget = toBudget(preferences.budget) || 1500;
  const commuteTarget = Number(preferences.commute) || 30;
  const noCar = preferences.hasCar === "No";
  const wantsPrivate = preferences.roomType === "Private room";
  const wantsStudio = preferences.roomType === "Studio" || preferences.roomType === "Entire unit";
  const needsFurniture = preferences.furniture === "Fully" || preferences.furniture === "Partially";
  let score = 58;
  const reasons: string[] = [];

  if (area.price <= budget) {
    score += 16;
    reasons.push("Within budget");
  } else if (area.price <= budget + 175) {
    score += 6;
    reasons.push("Close to your budget");
  } else {
    score -= 9;
  }

  if (area.commuteMinutes <= commuteTarget) {
    score += 16;
    reasons.push(`${area.commuteMinutes} min to ${preferences.destination || "campus"}`);
  } else {
    score -= 8;
  }

  if (noCar && area.transitFriendly) {
    score += 9;
    reasons.push("Works without a car");
  }
  if (noCar && !area.transitFriendly) {
    score -= 10;
  }

  if (wantsPrivate && area.roomType === "Private room") {
    score += 8;
    reasons.push("Matches private-room target");
  }
  if (wantsStudio && area.roomType === "Studio") {
    score += 8;
    reasons.push("Supports private studio search");
  }
  if (preferences.roomType === "Shared room" && area.roomType === "Shared room") {
    score += 8;
    reasons.push("Best value shared option");
  }

  if (needsFurniture && area.furnished !== "unfurnished") {
    score += 7;
    reasons.push("Furniture setup is easier");
  }
  if (needsFurniture && area.furnished === "unfurnished") {
    score -= 5;
  }

  if (area.lifestyleTags.includes(preferences.lifestyle)) {
    score += 8;
    reasons.push(`${preferences.lifestyle} lifestyle fit`);
  }

  if (includes(preferences.priorities, "Budget") && area.tags.includes("budget")) score += 7;
  if (includes(preferences.priorities, "Commute") && area.tags.includes("commute")) score += 7;
  if (includes(preferences.priorities, "Lifestyle") && area.tags.includes("social")) score += 6;
  if (includes(preferences.priorities, "Furniture") && area.tags.includes("furnished")) score += 6;
  if (includes(preferences.priorities, "Amenities") && area.tags.includes("amenities")) score += 5;

  if (includes(preferences.dealBreakers, "Over budget") && area.price > budget) score -= 12;
  if (includes(preferences.dealBreakers, "Long commute") && area.commuteMinutes > commuteTarget) {
    score -= 12;
  }
  if (includes(preferences.dealBreakers, "No parking") && area.parkingRisk) score -= 7;
  if (includes(preferences.dealBreakers, "Too noisy") && area.tags.includes("social")) score -= 9;
  if (includes(preferences.dealBreakers, "Unfurnished") && area.furnished === "unfurnished") {
    score -= 9;
  }

  return {
    ...area,
    fitScore: clamp(Math.round(score), 61, 96),
    scoreReasons: reasons.slice(0, 4),
  };
}

export function generateRecommendation(preferences: UserPreferences): RecommendationResult {
  const budget = toBudget(preferences.budget) || 1500;
  const commuteTarget = Number(preferences.commute) || 30;
  const scored = mockNeighborhoods
    .map((area) => scoreArea(area, preferences))
    .sort((a, b) => b.fitScore - a.fitScore);
  const bestMatch = scored[0];
  const otherMatches = scored.slice(1, 5);
  const noCar = preferences.hasCar === "No";
  const needsFurniture = preferences.furniture === "Fully" || preferences.furniture === "Partially";

  const budgetFit =
    bestMatch.price <= budget
      ? `$${bestMatch.price}/mo is inside your $${budget}/mo target before utilities.`
      : `$${bestMatch.price}/mo is slightly above your $${budget}/mo target, so compare fees carefully.`;

  const commuteAnalysis =
    bestMatch.commuteMinutes <= commuteTarget
      ? `${bestMatch.area} keeps the commute around ${bestMatch.commuteMinutes} min, inside your ${commuteTarget} min target.`
      : `${bestMatch.area} may exceed your ${commuteTarget} min commute target during peak hours.`;

  const watchOuts = [...bestMatch.tradeoffs];
  if (noCar && !bestMatch.transitFriendly) {
    watchOuts.unshift("This area needs careful bus or shuttle verification because you do not have a car.");
  }
  if (needsFurniture && bestMatch.furnished === "unfurnished") {
    watchOuts.unshift("Unfurnished setup can add cost and coordination before move-in.");
  }
  if (preferences.moveInTimeline === "ASAP") {
    watchOuts.push("ASAP move-ins usually require faster document prep and fewer tour options.");
  }

  return {
    bestMatch,
    otherMatches,
    intro:
      "Fit score reflects budget, commute, lifestyle, and move-in needs. Examples below — confirm with live listings before applying.",
    fitExplanation: `${bestMatch.fitScore}% fit based on your budget, commute, room type, and priority choices.`,
    recommendedRoomType:
      bestMatch.roomType === preferences.roomType
        ? bestMatch.roomType
        : `${bestMatch.roomType} is a better tradeoff than a broad ${preferences.roomType} search.`,
    budgetFit,
    commuteAnalysis,
    lifestyleFit: bestMatch.lifestyleTags.includes(preferences.lifestyle)
      ? `This match supports a ${preferences.lifestyle.toLowerCase()} routine.`
      : `This match is a practical compromise even though it is not the purest ${preferences.lifestyle.toLowerCase()} option.`,
    whyThisFits: bestMatch.scoreReasons.length
      ? bestMatch.scoreReasons
      : bestMatch.strengths.slice(0, 3),
    watchOuts: watchOuts.slice(0, 3),
    nextSteps: [
      "Prepare application documents",
      bestMatch.parkingRisk ? "Ask about parking availability" : "Confirm commute and access details",
      needsFurniture ? "Compare furniture costs before signing" : "Confirm utilities and move-in fees",
    ],
  };
}
