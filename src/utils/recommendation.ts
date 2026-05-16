export type RentalPreferences = {
  city: string;
  location: string;
  budget: string;
  commute: string;
  roomType: string;
  privateBathroom: string;
  furnished: string;
  car: string;
  lifestyle: string;
  priority: string;
};

export type RentalRecommendation = {
  area: string;
  areaDescription: string;
  roomType: string;
  roomDescription: string;
  budgetFit: number;
  commute: string;
  commuteScore: string;
  lifestyleFit: string;
  pros: string[];
  risks: string[];
  nextSteps: string[];
  prepChecklist: string[];
  viewingQuestions: string[];
  furnitureSuggestions: string[];
  timeline: string[];
};

const toBudget = (value: string) => {
  const parsed = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export function generateRecommendation(
  preferences: RentalPreferences,
): RentalRecommendation {
  const budget = toBudget(preferences.budget);
  const commuteLimit = Number(preferences.commute) || 35;
  const city = preferences.city.trim() || "your target city";
  const location = preferences.location.trim() || "campus or workplace";
  const noCar = preferences.car === "No";
  const wantsFurnished = preferences.furnished === "Yes";
  const wantsPrivate = preferences.roomType === "Studio" || preferences.roomType === "1B1B";
  const budgetFirst = preferences.priority === "Lowest rent" || budget < 1600;
  const commuteFirst = preferences.priority === "Shortest commute" || commuteLimit <= 25;

  let area = "Balanced close-in neighborhood";
  let areaDescription = `Prioritize neighborhoods near ${location} with enough transit, food, and student-friendly housing supply.`;

  if (city.toLowerCase().includes("san diego")) {
    if (budget >= 2200 && commuteFirst) {
      area = "UTC / La Jolla";
      areaDescription =
        "Best for short UCSD access, strong convenience, and higher rent competition.";
    } else if (budgetFirst || budget < 1700) {
      area = "Clairemont / Kearny Mesa";
      areaDescription =
        "Better value with a tradeoff in commute planning and fewer walkable student clusters.";
    } else {
      area = "Mira Mesa / Costa Verde";
      areaDescription =
        "Balanced option for budget control, commute access, and everyday convenience.";
    }
  } else if (noCar) {
    area = "Transit-first rental zone";
    areaDescription =
      "Focus on areas with direct bus, subway, or shuttle routes instead of only measuring distance.";
  } else if (budgetFirst) {
    area = "Value neighborhood near commute corridor";
    areaDescription =
      "Look slightly outside the premium core while protecting a realistic commute path.";
  }

  const roomType = wantsPrivate
    ? budget >= 2400
      ? preferences.roomType
      : "Private room in 2B2B or 3B2B"
    : budget < 1400
      ? "Shared room or private room in a larger apartment"
      : preferences.roomType || "Private room";

  const budgetFit = Math.max(
    58,
    Math.min(
      94,
      budget >= 2400 ? 88 : budget >= 1800 ? 82 : budget >= 1400 ? 73 : 64,
    ),
  );

  const commuteText = noCar
    ? `${Math.min(commuteLimit, 35)} min by direct transit or campus shuttle`
    : `${Math.min(commuteLimit, 25)} min drive, with transit backup preferred`;

  const lifestyleFit =
    preferences.lifestyle === "Quiet study focused"
      ? "Quiet blocks, study access, and reliable commute should outrank nightlife."
      : preferences.lifestyle === "Social and convenient"
        ? "Prioritize grocery, cafes, gym, and friend density over maximum space."
        : preferences.lifestyle === "Premium and private"
          ? "Privacy is achievable if budget stays flexible and search starts early."
          : "Balanced everyday convenience with controlled rent pressure.";

  const pros = [
    "Clear area type before opening listing platforms.",
    `${roomType} fits the current budget and privacy target better than a broad search.`,
    noCar
      ? "Transit access is treated as a requirement, not a nice-to-have."
      : "Car access gives more flexibility for value neighborhoods.",
  ];

  const risks = [
    budget < 1600
      ? "Budget may be tight for private space near premium campus or work areas."
      : "Competition can rise quickly before semester or internship start dates.",
    wantsFurnished
      ? "Furnished listings reduce setup work but can limit inventory and raise rent."
      : "Unfurnished housing needs a separate setup budget for essentials.",
    preferences.privateBathroom === "Yes"
      ? "Private bathroom demand can narrow the search and increase price."
      : "Shared bathroom fit depends heavily on roommate expectations.",
  ];

  const nextSteps = [
    "Start searching 6 to 8 weeks before move-in.",
    "Compare at least three neighborhoods using the same budget and commute rules.",
    "Save questions about utilities, parking, lease terms, and furniture before touring.",
  ];

  return {
    area,
    areaDescription,
    roomType,
    roomDescription:
      wantsPrivate && budget < 2400
        ? "A shared apartment with a private bedroom gives a better value-to-privacy balance."
        : "This room type keeps the search focused while leaving enough inventory to compare.",
    budgetFit,
    commute: commuteText,
    commuteScore: commuteFirst ? "High priority" : "Balanced",
    lifestyleFit,
    pros,
    risks,
    nextSteps,
    prepChecklist: [
      "Set a maximum monthly rent including utilities and internet.",
      "Prepare proof of income, student status, ID, and guarantor details if needed.",
      "Create a shortlist of 3 area types before contacting listings.",
      "Decide which tradeoff is non-negotiable: rent, commute, privacy, or furniture.",
    ],
    viewingQuestions: [
      "What utilities are included in rent?",
      "Is the lease individual or shared with roommates?",
      "How long does the commute take during peak hours?",
      "What fees are due before move-in?",
    ],
    furnitureSuggestions: wantsFurnished
      ? [
          "Confirm bed, desk, chair, mattress, and kitchen basics before signing.",
          "Ask for recent photos or a video walkthrough of included furniture.",
          "Budget for bedding, lighting, storage, and small kitchen items.",
        ]
      : [
          "Prioritize mattress, desk, chair, lamp, and basic cookware first.",
          "Reserve a setup budget before choosing a higher-rent option.",
          "Use pickup-friendly sources for the first week instead of buying everything new.",
        ],
    timeline: [
      "8 weeks out: define budget and neighborhoods.",
      "6 weeks out: contact listings and schedule tours.",
      "4 weeks out: compare lease terms and submit applications.",
      "2 weeks out: confirm utilities, furniture, and move-in logistics.",
    ],
  };
}
