# UI Implementation Guide

## 1. Purpose

This guide explains how to implement the approved Settlyfe AI Copilot UI in code.

Use it together with:

- `docs/design-system.md`
- `docs/figma-handoff.md`
- `docs/feature-spec.md`
- `docs/codex-task.md`

This guide should not replace the PRD or feature spec. It translates the approved design direction into practical implementation guidance for the 03 Implementation workstream.

## 2. Overall UI Direction

- Settlyfe AI Copilot is a feature extension inside the existing Settlyfe rental app.
- It should not look like a standalone AI landing page or futuristic AI dashboard.
- The UI should feel clean, practical, lightweight, student-friendly, and native to Settlyfe.
- Use approved Figma screenshots as visual references.
- Recreate screens with real components, not screenshot images.

## 3. App Shell

- Build a mobile-first app preview.
- Target viewport: 375px wide.
- On desktop, center the mobile app shell.
- Use white / very light gray app background.
- Home should keep the original Settlyfe 4-tab bottom navigation:
  - Home
  - Find Homes
  - Messages
  - Account
- Do not add AI Copilot as a bottom tab.
- Preference, Loading, Result, and Checklist screens can use a focused flow layout with top back navigation where appropriate.

## 4. Home Screen Implementation

- Use the original Settlyfe homepage structure.
- AI Copilot should appear as a banner entry inside the homepage.
- Use `public/images/ai-copilot-banner-bg.png` as the banner background.
- Banner text and button should be real HTML/CSS, not baked into the image.
- CTA opens Preference Step 1.
- Home can scroll vertically when below-the-fold content exists.
- Keep the banner expressive but still integrated with Settlyfe.

Banner copy:

- Label: `Settlyfe AI`
- Title: `Not sure where to live?`
- Body: `Settlyfe AI compares your budget, commute, room type, furniture needs, and move-in steps before you apply.`
- CTA: `Build my plan`

## 5. Preference Flow Implementation

- Preference Input is a 3-step flow.
- Step 1: Move Basics.
- Step 2: Housing Needs.
- Step 3: Lifestyle & Priorities.
- Use Settlyfe onboarding / application form style.
- Use rounded inputs, radio rows, chips, and sticky bottom CTA.
- Keep the form spacious but not decorative.
- Step 2 may scroll slightly because content can extend behind the sticky bottom CTA.
- Store all answers in a structured user preference state object.
- Do not hard-code preference results directly in UI.

## 6. Loading Screen Implementation

- Loading should feel lightweight and native.
- Use a simple spinner or subtle progress indicator.
- Loading does not need to exactly match one static Figma frame.
- Automatically transition to AI Result Plan after around 2.5 seconds.

Show step list:

- Reviewing your budget.
- Comparing commute options.
- Matching lifestyle preferences.
- Checking furniture needs.
- Preparing your move-in plan.

## 7. AI Result Plan Implementation

- Result Plan should render a structured recommendation object.
- It should not be a hard-coded static page.
- Use viewport screenshot for first-screen layout.
- Use full-scroll screenshot to understand below-the-fold content.
- The page may scroll vertically.
- Recommendation cards represent example matches or area-level rental directions, not guaranteed live listings.
- Other Good Matches should include role labels such as Budget Pick, Short Commute, Social Area, or Furniture Ready.

Required sections:

- Best Fit Area / Example Match
- Fit score explanation
- Recommended room type
- Budget fit
- Commute analysis
- Lifestyle fit
- Why this fits
- Watch out for
- Other Good Matches
- Next steps
- CTA to Moving Checklist

## 8. Moving Checklist Implementation

- Checklist should be generated from user preferences and recommendation risks.
- Use grouped Settlyfe-style cards/lists.
- Page may scroll vertically.
- Fake Save Plan can use a local non-persistent confirmation state.
- Do not add database persistence in V1.

Required sections:

- Rental Prep
- Viewing Questions
- Furniture Plan
- Move-in Day

## 9. Data and Logic Separation

- Keep user preferences separate from UI components.
- Keep San Diego mock rental / neighborhood data in a dedicated data file.
- Keep recommendation rules in a dedicated recommendation engine file.
- Keep checklist generation in a dedicated utility or rule layer.
- UI components should render structured output, not contain the full business logic.
- This separation allows future V2 AI API and V3 data-connected upgrades.

## 10. Recommended Component Set

Create reusable components where useful:

- `AppShell` / `MobileFrame`
- `BottomNav`
- `Button`
- `Card`
- `InputField`
- `RadioOption`
- `ChipSelector`
- `StepHeader`
- `ProgressStep` / `LoadingStep`
- `ScoreCard`
- `RecommendationCard`
- `RiskCard`
- `NextStepItem`
- `ChecklistSection`
- `ChecklistItem`

## 11. Visual Rules

- Primary color: `#6463F0`.
- Use Avenir-like typography.
- Use white and very light gray backgrounds.
- Use rounded cards, rounded inputs, thin borders, and soft shadows.
- Use minimal line icons.
- Keep button labels around 14px / 18px when possible.
- Keep UI compact enough for a 375px mobile screen.
- Avoid overly bold text.
- Avoid dark AI dashboards, neon effects, cyber visuals, or unrelated AI styling.

## 12. Reference Image Rules

- 375x812 viewport screenshots are the primary implementation references.
- Full-scroll screenshots are only for below-the-fold content.
- Do not implement full-scroll screenshots as fixed-height pages.
- Do not place full screenshots directly into the app.
- Use `public/images/ai-copilot-banner-bg.png` only as the banner background asset.
- Recreate the rest of the UI with components.

## 13. V1 Constraints

- No real AI API.
- No live rental API.
- No map API.
- No database.
- No login.
- No payment.
- No saved persistence.
- No real-time availability.
- No broker / landlord / agent contact.
- V1 should remain an interactive mock-data product demo.

## 14. Implementation Handoff

Before coding, the 03 Implementation workstream should read:

- `docs/idea.md`
- `docs/PRD.md`
- `docs/workflow.md`
- `docs/feature-spec.md`
- `docs/design-system.md`
- `docs/figma-handoff.md`
- `docs/ui-implementation-guide.md`
- `docs/codex-task.md`

Then inspect the visual references in:

- `public/references/`
- `public/images/`

The implementation should summarize its plan before writing code if asked.
