# Settlyfe AI Copilot Feature Specification

## 1. Overview

V1 is an interactive mock-data product demo for Settlyfe AI Copilot, a native AI planning feature inside the existing Settlyfe rental app.

V1 uses structured San Diego / UCSD / North America student-rental mock data, local state, and a rule-based recommendation engine. In V1, recommendation explanations are generated from structured mock data and rules, not from a real AI API.

V1 does not use real AI API, real rental listing API, live rental API, map API, database, login, payment, broker / landlord / agent contact, saved persistence, real-time listing availability, or live Zillow, Apartments.com, or marketplace listings.

San Diego / UCSD / North America student rental is the first validation market. San Diego is not the only future market; the product logic and data model should remain extensible to high-mobility rental markets such as Shanghai, Hong Kong, New York, and other student or intern relocation cities.

Core product stages:

Home Entry -> Preference Input -> AI Loading -> AI Result Plan -> Moving Checklist.

V1 implementation screens / states:

1. Home with AI Copilot banner inside the original Settlyfe homepage.
2. Preference Step 1 - Move Basics.
3. Preference Step 2 - Housing Needs.
4. Preference Step 3 - Lifestyle & Priorities.
5. AI Loading.
6. AI Result Plan.
7. Moving Checklist.

## 2. Shared Data Model

These are product-level structures. Implementation can translate them into TypeScript types later.

### UserPreferences

Stores the user's rental planning inputs:

- Target city or area.
- School or workplace.
- Monthly budget.
- Max commute time.
- Room type.
- Bathroom preference.
- Furniture need.
- Car ownership.
- Move-in timeline.
- Lifestyle preference.
- Top priorities.
- Deal breakers.

### MockNeighborhood / MockRentalArea

Represents a controlled San Diego rental direction or example area:

- Area name.
- Example match name or description.
- Area type, such as campus-adjacent, budget-friendly, transit-friendly, social, or furniture-ready.
- Typical budget band.
- Example room types.
- Commute profile.
- Lifestyle tags.
- Furniture availability notes.
- Parking / transit notes.
- Key strengths.
- Key tradeoffs or risks.

### RecommendationResult

Represents the generated plan shown on the result screen:

- Best Fit Area / Example Match.
- Fit score and explanation.
- Recommended room type.
- Budget fit.
- Commute analysis.
- Lifestyle fit.
- Why this fits.
- Watch out for.
- Other Good Matches.
- Next steps.

### ChecklistItem

Represents one action in the Moving Checklist:

- Section, such as Rental Prep, Viewing Questions, Furniture Plan, or Move-in Day.
- Task title.
- Optional short explanation.
- Priority or timing.
- Completion state in local UI state.
- Source reason, such as no car, needs furniture, parking risk, short move-in timeline, or commute concern.

## 3. Screen 1: Home

### Goal

Introduce AI Copilot as a native feature inside the existing Settlyfe homepage.

### Content

- Original Settlyfe homepage shell.
- AI Copilot banner.
- Banner label: Settlyfe AI.
- Title: Not sure where to live?
- Body: Settlyfe AI compares your budget, commute, room type, furniture needs, and move-in steps before you apply.
- CTA: Build my plan.
- Original 4-tab bottom navigation: Home, Find Homes, Messages, Account.
- Do not add AI Copilot as a bottom tab.

### Behavior

- Tapping Build my plan opens Preference Step 1.
- Home may scroll vertically if below-the-fold content exists.

## 4. Screen 2: Preference Step 1 - Move Basics

### Goal

Collect location and budget basics.

### Inputs

- Target city or area.
- School or workplace.
- Monthly budget.
- Max commute time.

### Behavior

- Next validates required fields lightly.
- Valid input opens Preference Step 2.
- Invalid input shows compact error feedback.
- Store values in structured local state.

## 5. Screen 3: Preference Step 2 - Housing Needs

### Goal

Collect housing requirement preferences.

### Inputs

- Room type.
- Bathroom preference.
- Furniture need.
- Car ownership.
- Move-in timeline.

### Behavior

- Next opens Preference Step 3.
- This page may scroll slightly because content can extend behind the sticky bottom CTA.
- Store values in structured local state.

## 6. Screen 4: Preference Step 3 - Lifestyle & Priorities

### Goal

Collect lifestyle preference, top priorities, and deal breakers.

### Inputs

- Lifestyle preference.
- Top priorities.
- Deal breakers.

### Behavior

- Generate Plan validates required fields lightly.
- Valid input opens AI Loading.
- Invalid input shows compact error feedback.
- Store values in structured local state.

## 7. Screen 5: AI Loading

### Goal

Simulate AI analysis and create a transition from input to result.

### Content

- Loading title, such as Preparing your rental plan.
- Short subtitle explaining the app is comparing budget, commute, lifestyle, and move-in needs.
- Step list:
  - Reviewing your budget.
  - Comparing commute options.
  - Matching lifestyle preferences.
  - Checking furniture needs.
  - Preparing your move-in plan.

### Behavior

- Automatically opens AI Result Plan after around 2.5 seconds.
- Loading animation does not need to exactly match one static screenshot.
- Keep it lightweight and Settlyfe-native.

## 8. Screen 6: AI Result Plan

### Goal

Show structured recommendation output based on user preferences and mock San Diego rental data.

### Required Outputs

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
- Secondary action to edit preferences if appropriate.

### Important Notes

- V1 recommendation cards represent example matches or area-level rental directions, not guaranteed live listings.
- The screen may scroll vertically.
- Use full-scroll Figma reference only to understand below-the-fold content.

### Other Good Matches

Include several alternative matches with role labels such as:

- Budget Pick.
- Short Commute.
- Social Area.
- Furniture Ready.

Each alternative match should include:

- Fit score.
- Price or budget band.
- Area.
- Room type.
- Commute note.
- One strength.
- One tradeoff.

### Behavior

- Recommendation output should change based on user inputs.
- CTA opens Moving Checklist.
- Edit preferences returns to the preference flow.

## 9. Screen 7: Moving Checklist

### Goal

Convert the recommendation into practical actions.

### Required Sections

- Rental Prep.
- Viewing Questions.
- Furniture Plan.
- Move-in Day.

### Behavior

- Checklist items should reflect user preferences and recommendation risks.
- If user has no car, include transit / commute verification tasks.
- If user needs furniture, include furniture measuring and delivery tasks.
- If parking is a risk, include parking questions.
- If move-in timeline is soon, include urgent application and viewing tasks.
- Fake Save Plan button can show local non-persistent confirmation state.
- Page may scroll vertically if needed.

## 10. Mock Recommendation Rules

Product-level rules:

- Lower budgets recommend shared housing or value areas.
- Higher budgets can recommend private room, studio, or closer areas.
- Short commute limits prioritize close-in or transit-friendly neighborhoods.
- No car prioritizes transit-friendly areas and adds commute verification tasks.
- Furniture need adds furnished-search and furniture setup tasks.
- Lifestyle preference affects area tags and watch-outs.
- Deal breakers should influence warnings and ranking.

## 11. Implementation Guardrails

- Do not hard-code all recommendation output directly in UI components.
- Separate user preferences, mock rental / neighborhood data, recommendation logic, explanation output, UI rendering, and checklist generation.
- Use local state only in V1.
- Keep UI aligned with the approved Settlyfe Figma direction and docs/design-system.md.
- Keep V1 Vercel-ready.
