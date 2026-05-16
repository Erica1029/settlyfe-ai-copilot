# Settlyfe AI Copilot Roadmap

## Roadmap Principle

Settlyfe AI Copilot should be built as a staged product, not as a fully integrated rental platform from day one.

V1 is intentionally scoped as an interactive mock-data product demo. It is not the final product. The goal is to reduce implementation risk and validate the core AI product experience first: the guided preference flow, recommendation structure, and move-in checklist.

San Diego / UCSD / North America student rental is the first validation market. San Diego is not the only future market; the product logic and data model should remain extensible to other high-mobility rental markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

The implementation should keep these layers separated so later versions can upgrade without redesigning the entire app:

- User preferences.
- Mock rental / neighborhood data.
- Recommendation logic.
- Explanation output.
- UI rendering.
- Checklist generation.

## V1: Interactive Mock-Data Demo

### Goal

Validate the AI Copilot user flow, recommendation structure, and move-in checklist experience.

### Scope

- Mobile-first Settlyfe AI Copilot demo.
- Uses structured San Diego mock rental / neighborhood data.
- Uses local state for user inputs and flow state.
- Uses a rule-based recommendation engine.
- Produces structured recommendation outputs such as best-fit area, room type, budget fit, commute fit, watch-outs, next steps, and move-in checklist.
- Generates rule-based explanations from structured mock data.

### Explicit Non-Goals

V1 should not include:

- Real AI API.
- Real rental listing API.
- Live rental API.
- Map API.
- Database.
- Login or account system.
- Payment.
- Broker / landlord / agent contact.
- Real-time listing availability.
- Saved plans with persistence.
- Live Zillow, Apartments.com, or marketplace listings.

### Why This Scope

V1 is designed to answer the most important product question first: does the AI Copilot flow help renters make clearer decisions before they search or apply?

Using mock data keeps the demo stable, controllable, and easier to present in a portfolio or interview setting. It also avoids spending early time on unstable data integration before the product experience is validated.

### Implementation Notes

- Keep San Diego mock rental / neighborhood data in a dedicated data layer.
- Keep recommendation rules in a dedicated utility or engine layer.
- Keep rule-based explanation output separate from UI components.
- Keep UI components separate from recommendation logic.
- Keep form state local and simple.
- Make the recommendation output structure clear enough for V2 to replace or enhance explanations with AI-generated content.

## V2: AI-Powered Recommendation Explanation

### Goal

Make the demo feel genuinely AI-assisted without depending on unstable live rental data.

### Scope

- Add a real AI API through a server-side route.
- Keep listings controlled through mock or curated San Diego data.
- Use AI to generate recommendation explanations, watch-outs, next steps, and checklist items.
- Preserve the V1 preference flow and recommendation UI structure.

### AI Responsibilities

The AI layer should generate or refine:

- Why a recommended area fits the user.
- Budget and commute tradeoff explanations.
- Risk or watch-out notes.
- Next-step suggestions.
- Move-in and furniture checklist items.

### Data Strategy

V2 should not depend on live rental data. Controlled San Diego mock or curated data should remain the source for listing-like inputs, while a real AI API can upgrade the explanation layer.

### Implementation Notes

- Add the AI API behind a server-side route so API keys are not exposed to the client.
- Keep AI output structured so the UI can render it predictably.
- Maintain fallback mock explanations in case AI generation fails.
- Do not redesign the whole app when adding AI. Replace or enhance only the explanation layer.

## V3: Data-Connected City MVP

### Goal

Move from a portfolio demo toward a realistic city-level MVP, starting with San Diego as the first validation city.

### Scope

- Explore real or semi-real city-level rental data, starting with San Diego.
- Add commute, map, neighborhood, or place data.
- Consider Supabase or Firebase for persistence.
- Evaluate saved plans, user sessions, and more realistic recommendation history.
- Keep the product logic extensible to other high-mobility rental markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

### Data and Integration Options

Potential V3 data sources or integrations:

- Curated city neighborhood data, starting with San Diego.
- Semi-real rental data maintained by the project.
- Commute or map APIs.
- Place and amenity data.
- Supabase or Firebase for saved plans and lightweight persistence.

### Product Questions

V3 should investigate:

- Which San Diego neighborhoods should be supported first?
- What level of rental data freshness is necessary?
- Whether commute and amenity data improve decision quality.
- Whether users need saved plans, comparison views, or export features.
- How Settlyfe Copilot should connect to applications, furniture, services, and move-in workflows.

### Implementation Notes

- Keep data adapters separate from UI components.
- Keep recommendation logic modular so live or semi-live data can replace mock data.
- Add persistence only after the core flow and AI explanation layer are stable.
- Avoid turning the product into a full rental marketplace before validating the Copilot decision assistant value.

## Upgrade Path

The roadmap should progress in this order:

1. Validate the guided decision flow with mock data.
2. Add AI-generated explanations while keeping data controlled.
3. Connect richer city-level rental, commute, and neighborhood data, starting with San Diego.

This staged approach keeps V1 achievable while still leaving a clear path toward a realistic MVP.
