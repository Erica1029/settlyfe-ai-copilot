# Settlyfe AI Copilot PRD

## Product Overview

Settlyfe AI Copilot is a mobile-first AI rental planning assistant embedded inside the existing Settlyfe rental app. It is not a standalone AI product.

The feature helps students, interns, and young renters clarify budget, commute, room type, lifestyle, furniture needs, and move-in preparation before they browse listings or apply for housing.

V1 is an interactive mock-data product demo. It validates the core AI Copilot flow and recommendation structure without relying on real AI or live rental data.

Version structure:

- V1 = Interactive mock-data demo.
- V2 = AI-powered recommendation explanation.
- V3 = Data-connected city MVP.

## First Validation Market

San Diego / UCSD / North America student rental is the first validation market.

This is the first validation market because Settlyfe is currently positioned around North American student and young-renter housing scenarios. San Diego is not the only future market.

The product logic and data model should remain extensible to other high-mobility rental markets later, such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

## Problem Statement

Young renters often begin housing searches before they understand their realistic budget, commute tradeoffs, room type needs, furniture setup, or move-in timeline. Listing platforms show inventory, but they do not help users form a clear rental strategy before search.

## Target User

The primary user is a student, intern, or early-career renter moving to a new city with limited rental experience.

Typical needs:

- Understand whether a budget is realistic.
- Compare rent, commute, room type, lifestyle, and furniture tradeoffs.
- Identify risks before contacting listings.
- Turn a rental decision into a practical move-in checklist.

## Product Goal

Help users move from vague rental intent to a clear, actionable rental plan in under five minutes.

V1 should validate:

- The AI Copilot user flow.
- The recommendation output structure.
- The move-in checklist experience.
- The fit with Settlyfe's existing mobile app style and rental journey.

## AI Value Proposition

Settlyfe AI Copilot turns user preferences into structured rental guidance. In V1, the AI behavior is simulated with structured mock data and rule-based recommendation logic.

In V1, explanations are rule-based and generated from structured mock data. In V2, the explanation layer can be upgraded to a real AI API.

The output should feel explainable and useful:

- What area or match fits best.
- Why it fits the user.
- What tradeoffs or risks to watch.
- What to do next.
- What to prepare before moving in.

## User Flow

### Core Product Stages

Home Entry -> Preference Input -> AI Loading -> AI Result Plan -> Moving Checklist.

### V1 Implementation Screens / States

1. Home with AI Copilot banner inside the original Settlyfe homepage.
2. Preference Step 1 - Move Basics.
3. Preference Step 2 - Housing Needs.
4. Preference Step 3 - Lifestyle & Priorities.
5. AI Loading.
6. AI Result Plan.
7. Moving Checklist.

## Preference Input

Preference Input is a 3-step flow to keep the mobile experience focused.

### Step 1 - Move Basics

- Target city or area.
- School or workplace.
- Monthly budget.
- Max commute time.

### Step 2 - Housing Needs

- Room type.
- Bathroom preference.
- Furniture need.
- Car ownership.
- Move-in timeline.

### Step 3 - Lifestyle & Priorities

- Lifestyle preference.
- Top priorities.
- Deal breakers.

## AI Result Plan

The AI Result Plan should render structured recommendation output, not a generic paragraph.

Required output:

- Best Fit Area / Example Match.
- Fit score explanation.
- Recommended room type.
- Budget fit.
- Commute analysis.
- Lifestyle fit.
- Why this fits.
- Watch out for.
- Other Good Matches.
- Next steps.
- CTA to Moving Checklist.

## Moving Checklist

The Moving Checklist converts the recommendation into practical actions.

Required sections:

- Rental prep.
- Viewing questions.
- Furniture plan.
- Move-in day tasks.

Checklist items should reflect recommendation risks and user preferences, such as:

- Parking.
- Utilities.
- Commute.
- Furniture needs.
- Private bathroom or roommate expectations.
- Move-in timing.

## MVP Scope

V1 is an interactive mock-data product demo.

V1 should include:

- Mobile-first Settlyfe-style web app demo.
- Structured user preference state.
- Structured San Diego mock rental / neighborhood data.
- Rule-based recommendation engine.
- Dynamic recommendation output based on user inputs.
- Personalized checklist generation.
- Local state only.
- Vercel-ready implementation.

## Non-MVP / Out of Scope

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

## Implementation Principle

Even though V1 uses mock data, recommendation results should not be hard-coded directly inside UI components.

The implementation should separate:

- User preferences.
- Mock rental / neighborhood data.
- Recommendation logic.
- Explanation output.
- UI rendering.
- Checklist generation.

This keeps V1 simple while allowing V2 and V3 to upgrade without redesigning the whole app.

## Success Metrics

V1 is successful if:

- A user can complete the full flow from Home to Moving Checklist.
- User input changes the recommendation output.
- The result feels explainable and structured.
- The UI matches the approved Settlyfe Figma direction.
- The demo can be shown live in portfolio interviews.
- The app can build and deploy to Vercel.

## Future Expansion

### V2: AI-Powered Recommendation Explanation

- Add a real AI API for recommendation explanation, watch-outs, next steps, and checklist generation.
- Keep rental data controlled through mock or curated San Diego data.
- Preserve the V1 flow and UI structure.

### V3: Data-Connected City MVP

- Explore real or semi-real city-level rental data, starting with San Diego.
- Add commute, map, neighborhood, or place data.
- Consider optional persistence through tools such as Supabase or Firebase.
- Move from portfolio demo toward a realistic city-level MVP that can later extend to markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.
