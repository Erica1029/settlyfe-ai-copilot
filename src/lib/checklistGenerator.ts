import { Home, MessageCircle, Sofa, Truck } from "lucide-react";
import type {
  ChecklistSection,
  RecommendationResult,
  UserPreferences,
} from "@/types/rental";

const isSampleMarket = (preferences: UserPreferences) =>
  /san diego|ucsd|uc san diego|la jolla/i.test(
    `${preferences.city} ${preferences.destination}`,
  );

const commuteDestinationLabel = (preferences: UserPreferences) =>
  isSampleMarket(preferences)
    ? preferences.destination || "UCSD"
    : "the UCSD sample area";

export function generateChecklist(
  preferences: UserPreferences,
  recommendation: RecommendationResult,
): ChecklistSection[] {
  const budget = preferences.budget.replace(/[^0-9]/g, "") || "1500";
  const best = recommendation.bestMatch;
  const destinationLabel = commuteDestinationLabel(preferences);
  const noCar = preferences.hasCar === "No";
  const needsFurniture = preferences.furniture === "Fully" || preferences.furniture === "Partially";
  const urgent = preferences.moveInTimeline === "ASAP";

  return [
    {
      id: "rentalPrep",
      title: "Rental Prep",
      icon: Home,
      items: [
        {
          id: "budget",
          title: `Set max budget at $${Number(budget).toLocaleString()}/mo before fees`,
        },
        {
          id: "documents",
          title: "Prepare ID & proof of income",
        },
        {
          id: "cosigner",
          title: urgent ? "Request co-signer info today" : "Request co-signer info",
        },
        {
          id: "shortlist",
          title: `Save 3 ${best.area} listings to compare`,
          reason: best.area,
        },
      ],
    },
    {
      id: "viewingQuestions",
      title: "Viewing Questions",
      icon: MessageCircle,
      items: [
        {
          id: "parking",
          title: best.parkingRisk
            ? "Confirm parking availability & weekend access"
            : "Confirm guest parking and move-in access",
        },
        {
          id: "utilities",
          title: "Ask about utilities, wifi, and average bills",
        },
        {
          id: "noise",
          title: preferences.dealBreakers.includes("Too noisy")
            ? "Check noise levels at evening hours"
            : "Ask about building quiet hours",
        },
        {
          id: "commute",
          title: noCar
            ? `Confirm bus / shuttle commute to ${destinationLabel}`
            : `Drive the sample route to ${destinationLabel} during peak hours`,
        },
      ],
    },
    {
      id: "furniturePlan",
      title: "Furniture Plan",
      icon: Sofa,
      items: [
        {
          id: "furniture-list",
          title: needsFurniture
            ? `List essentials missing from a ${preferences.furniture.toLowerCase()} furnished room`
            : "List first-week essentials before choosing a higher rent option",
        },
        {
          id: "bundles",
          title: "Compare Settlyfe furniture bundles vs. buying separately",
        },
        {
          id: "delivery",
          title: urgent
            ? "Schedule delivery before signing if move-in is urgent"
            : "Schedule delivery to match move-in date",
        },
      ],
    },
    {
      id: "moveInDay",
      title: "Move-in Day",
      icon: Truck,
      items: [
        {
          id: "photos",
          title: "Photograph unit condition before unpacking",
        },
        {
          id: "systems",
          title: "Test outlets, plumbing, and AC",
        },
        {
          id: "wifi",
          title: "Set up wifi & transfer utilities",
        },
        {
          id: "roommates",
          title: preferences.roomType === "Private room"
            ? "Meet roommates and exchange contact info"
            : "Save lease and emergency contacts",
        },
      ],
    },
  ];
}
