import type { LucideIcon } from "lucide-react";

export type PreferenceStep = "move" | "housing" | "lifestyle";

export type Screen =
  | "home"
  | "moveBasics"
  | "housingNeeds"
  | "lifestylePriorities"
  | "loading"
  | "result"
  | "checklist";

export type UserPreferences = {
  city: string;
  destination: string;
  budget: string;
  commute: string;
  roomType: string;
  bathroom: string;
  furniture: string;
  hasCar: string;
  moveInTimeline: string;
  lifestyle: string;
  priorities: string[];
  dealBreakers: string[];
};

export type MockRentalArea = {
  id: string;
  role: string;
  area: string;
  exampleMatch: string;
  price: number;
  roomType: string;
  bathroom: string;
  commuteMinutes: number;
  budgetBand: [number, number];
  tags: string[];
  lifestyleTags: string[];
  strengths: string[];
  tradeoffs: string[];
  transitFriendly: boolean;
  parkingRisk: boolean;
  furnished: "full" | "partial" | "unfurnished";
  visualTone: string;
};

export type RecommendationResult = {
  bestMatch: ScoredRentalArea;
  otherMatches: ScoredRentalArea[];
  intro: string;
  fitExplanation: string;
  recommendedRoomType: string;
  budgetFit: string;
  commuteAnalysis: string;
  lifestyleFit: string;
  whyThisFits: string[];
  watchOuts: string[];
  nextSteps: string[];
};

export type ScoredRentalArea = MockRentalArea & {
  fitScore: number;
  scoreReasons: string[];
};

export type ChecklistSectionId =
  | "rentalPrep"
  | "viewingQuestions"
  | "furniturePlan"
  | "moveInDay";

export type ChecklistItem = {
  id: string;
  title: string;
  defaultDone?: boolean;
  reason?: string;
};

export type ChecklistSection = {
  id: ChecklistSectionId;
  title: string;
  icon: LucideIcon;
  items: ChecklistItem[];
};
