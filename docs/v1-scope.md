# Settlyfe AI Copilot V1 Scope

## Purpose

This document defines exactly what V1 includes and excludes.

V1 should be treated as an interactive mock-data product demo. It is not the final production version.

The purpose of V1 is to validate the core AI Copilot experience before adding real AI, live data, persistence, or marketplace integrations.

Version structure:

- V1 = Interactive mock-data demo.
- V2 = AI-powered recommendation explanation.
- V3 = Data-connected city MVP.

## V1 Positioning

V1 is designed to validate:

- The AI Copilot user flow.
- The recommendation structure.
- The move-in checklist experience.
- The fit between Settlyfe's existing rental journey and an AI-assisted planning layer.

San Diego / UCSD / North America student rental is the first validation market.

This market is the right V1 focus because Settlyfe is currently positioned around North American student and young-renter housing scenarios. San Diego is not the only future market.

The product logic and data model should remain extensible to other high-mobility rental markets in the future, such as:

- Shanghai.
- Hong Kong.
- New York.
- Other student or intern relocation cities.

## V1 Should Include

### Product Experience

- Mobile-first web app demo.
- Home screen with an AI Copilot banner inside the existing Settlyfe homepage.
- Preference Step 1: Move Basics.
- Preference Step 2: Housing Needs.
- Preference Step 3: Lifestyle & Priorities.
- AI Loading screen.
- AI Result Plan screen.
- Moving Checklist screen.

### Data and Logic

- Structured user preference state.
- Structured San Diego mock rental / neighborhood data.
- Rule-based recommendation engine.
- Rule-based explanation output generated from structured mock data.
- Local state only.

### Recommendation Output

- Best Fit Area / Example Match.
- Other Good Matches.
- Why this fits.
- Watch out for.
- Next steps.
- Personalized moving checklist.

### Delivery

- Vercel-ready implementation.
- Mobile-first interaction quality.
- Visual alignment with the approved Settlyfe Figma direction.

## V1 Should Not Include

V1 should not include:

- Real AI API.
- Real rental listing API.
- Live rental API.
- Map API.
- Live Zillow, Apartments.com, or marketplace listings.
- Login or account system.
- Database.
- Payment.
- Broker / landlord / agent contact.
- Real-time listing availability.
- Saved plans with persistence.

These exclusions are intentional. V1 should reduce implementation risk and focus on validating the product flow and recommendation experience first.

## Important Implementation Principle

Even though V1 uses mock data, the implementation should not hard-code all recommendation results directly inside UI components.

The code should separate:

- User preferences.
- Mock rental / neighborhood data.
- Recommendation logic.
- Explanation output.
- UI rendering.
- Checklist generation.

This separation allows V2 and V3 to upgrade the product without redesigning the entire app.

## Recommended V1 Architecture

### User Preferences

Store user preference answers in a structured state object.

Preference state should include the major decision inputs:

- City or target market.
- School or workplace.
- Move-in timeline.
- Budget.
- Commute tolerance.
- Room type.
- Bathroom preference.
- Furniture need.
- Car ownership.
- Lifestyle preference.
- Priority ranking.

### Mock Rental / Neighborhood Data

Store San Diego mock rental / neighborhood data separately from UI components.

Mock data should represent useful decision inputs, such as:

- Neighborhood or area name.
- Example match.
- Area type.
- Typical budget range.
- Commute profile.
- Transit friendliness.
- Furniture availability.
- Student fit.
- Lifestyle tags.
- Risk notes.

### Recommendation Logic

Use a rule-based recommendation engine for V1.

The engine should compare user preferences against structured mock data and return a structured recommendation result.

The recommendation result should include:

- Best fit area.
- Example match.
- Other good matches.
- Budget fit explanation.
- Commute fit explanation.
- Why this fits.
- Watch-outs.
- Next steps.
- Checklist items.

### UI Rendering

UI components should render structured recommendation output. They should not contain the full recommendation logic.

This keeps the interface flexible when V2 introduces AI-generated explanations or V3 introduces richer data.

### Checklist Generation

Checklist generation should be its own rule-based layer or utility.

Checklist items should respond to user preferences such as:

- Furnished vs unfurnished.
- Car vs no car.
- Short commute requirement.
- Private bathroom preference.
- Move-in timeline.

## V1 Success Criteria

V1 is successful if:

- A user can complete the full flow from Home to Moving Checklist.
- User input changes the recommendation output.
- The recommendation feels structured and explainable.
- The app visually matches the approved Settlyfe Figma direction.
- The app can be shown live in a portfolio interview.
- The app can be deployed to Vercel.

## Relationship to Future Versions

V1 validates the experience.

V2 can upgrade the explanation layer to a real AI API for recommendation explanations, watch-outs, next steps, and checklist generation while keeping data controlled.

V3 can explore a data-connected city MVP with real or semi-real rental data, commute data, map data, and persistence, starting with San Diego and later extending to other high-mobility rental markets.

The V1 implementation should therefore be simple, mock-based, and modular.
