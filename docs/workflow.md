# Settlyfe AI Copilot Project Workflow

## Project Goal

Settlyfe AI Copilot is a mobile-first interactive web app demo for an AI-assisted rental planning experience inside the Settlyfe product direction.

It supports North America student and young-renter housing scenarios. San Diego / UCSD / North America student rental is the first validation market.

San Diego is not the only future market. The product logic and data model should remain extensible to other high-mobility rental markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

The goal is to help users clarify budget, commute, room type, lifestyle tradeoffs, and move-in preparation before they browse listings.

The final project should be suitable for a portfolio case study, live interview demo, and future product iteration.

## Version Structure

- V1 = Interactive mock-data demo.
- V2 = AI-powered recommendation explanation.
- V3 = Data-connected city MVP.

## Core Product Stages

The product still has 5 core product stages:

1. Home Entry.
2. Preference Input.
3. AI Loading.
4. AI Result Plan.
5. Moving Checklist.

These stages describe the user-facing product journey.

## V1 Implementation Screens / States

The V1 implementation expands the 5 product stages into 7 screens or states:

1. Home with AI Copilot banner inside the original Settlyfe homepage.
2. Preference Step 1 - Move Basics.
3. Preference Step 2 - Housing Needs.
4. Preference Step 3 - Lifestyle & Priorities.
5. AI Loading.
6. AI Result Plan.
7. Moving Checklist.

This structure keeps the product journey simple while making the preference input flow easier to complete on mobile.

V2 MVP keeps the same high-level journey but uses a simpler 6-state flow:

1. Home with AI Copilot banner.
2. Preference Step 1 - Move Basics.
3. Preference Step 2 - Room and Lifestyle.
4. AI Loading.
5. AI Result Plan or product guardrail state.
6. Moving Checklist for normal supported results.

## V1 Workflow

1. Define product direction.
2. Write PRD and feature specification.
3. Define design system and Figma handoff.
4. Export approved Figma viewport and full-scroll references.
5. Build mobile-first V1 web app demo.
6. Use structured San Diego mock data.
7. Use a rule-based recommendation engine.
8. Prepare the implementation so it is deploy-ready for Vercel.
9. Package the project as a portfolio case study.

## V1 Scope

V1 is an interactive mock-data product demo.

V1 uses:

- Structured user preference state.
- Structured San Diego mock rental and neighborhood data.
- Local state.
- Rule-based recommendation logic.
- Rule-based explanation output generated from structured mock data.
- Settlyfe-style mobile UI.

V1 does not include:

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

V1 should be interactive and driven by structured user input, so the recommendation output changes when the user's preferences change.

## V2 / V3 Roadmap Summary

V2 can add a real AI API for:

- Recommendation explanation.
- Watch-outs.
- Next steps.
- Checklist generation.

V2 should still keep listing data controlled through mock or curated San Diego data, so the demo feels genuinely AI-assisted without depending on unstable live rental data.

For the V2 MVP, the user-facing preference flow is simplified to city / area, school or workplace, monthly budget, max commute time, room type, car access, and optional lifestyle preference. Furniture need, private bathroom preference, move-in timeline, deal breakers, and top priorities are hidden or defaulted to reduce edge cases.

V2 AI is an explanation layer only. Rule-based recommendation facts remain the source of truth, and AI must not change prices, commute values, fit scores, area names, room types, or ranking. Unsupported-location and no-strong-match states are product result states; AI fallback is reserved for provider failure, timeout, invalid output, missing key, or disabled AI.

V3 can explore:

- Real or semi-real rental data.
- Commute or map data.
- Neighborhood or place data.
- Richer preference capture and broader city coverage.
- Persistence through tools such as Supabase or Firebase.

V3 is a data-connected city MVP. San Diego is the first validation city, but the product logic should remain extensible to other high-mobility rental markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

## Implementation Architecture Rule

V1 should separate:

- User preferences.
- Mock rental / neighborhood data.
- Recommendation logic.
- Explanation output.
- UI rendering.
- Checklist generation.

## Implementation Handoff Rule

Product docs define what should be built.

Design system and Figma handoff define how it should look.

Implementation should read approved product docs, design system, and visual references before coding.

Debug & Deploy should only fix build, runtime, dependency, and deployment issues unless a design or product change is explicitly approved.

## Version 1 Success Standard

V1 is successful when:

- A user can complete the full flow from Home to Moving Checklist.
- User input changes the recommendation output.
- The recommendation feels structured and explainable.
- The app visually matches the approved Settlyfe Figma direction.
- The app can be shown live in a portfolio interview.
- The app can be deployed to Vercel.
