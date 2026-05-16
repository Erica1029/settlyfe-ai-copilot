# Figma Handoff Guide

## 1. Purpose

This file is the Figma-to-implementation handoff guide for the Settlyfe AI Copilot V1 demo.

Use it together with:

- `docs/design-system.md`
- `docs/ui-implementation-guide.md`
- `docs/feature-spec.md`
- `docs/codex-task.md`

This file does not replace the design system. It records the approved Figma screen references and implementation-specific visual notes that should help the 03 Implementation workstream translate the approved Figma design into a mobile-first Next.js demo.

## 2. Approved Screen References

Viewport screenshots:

- `public/references/01-home-viewport.png`
- `public/references/02-preference-move-basics-viewport.png`
- `public/references/03-preference-housing-needs-viewport.png`
- `public/references/04-preference-lifestyle-priorities-viewport.png`
- `public/references/05-ai-loading-viewport.png`
- `public/references/06-result-plan-viewport.png`
- `public/references/07-checklist-viewport.png`

Full-scroll references:

- `public/references/01-home-full-scroll.png`
- `public/references/03-preference-housing-needs-full-scroll.png`
- `public/references/06-result-plan-full-scroll.png`
- `public/references/07-checklist-full-scroll.png`

Production image asset:

- `public/images/ai-copilot-banner-bg.png`

## 3. Viewport and Scroll Rules

- Use 375x812 viewport screenshots as the primary visual implementation reference.
- Use full-scroll screenshots only to understand content below the fold.
- Do not implement full-scroll screenshots as fixed-height pages.
- The actual app should be mobile-first, 375px wide, and vertically scrollable when content exceeds the viewport.
- On desktop, center the 375px mobile app preview.
- Home, Result Plan, Checklist, and Preference Step 2 may scroll vertically.
- Loading screen should fit within the viewport.

## 4. Home Screen Handoff

- Home should use the original Settlyfe homepage shell style.
- Keep the original 4-tab bottom navigation: Home, Find Homes, Messages, Account.
- Do not add AI Copilot as a bottom tab.
- AI Copilot enters through the homepage banner.
- Use `public/images/ai-copilot-banner-bg.png` as the banner background image.
- Banner text and CTA should be implemented as real HTML/CSS layers, not baked into the background image.
- Tapping the CTA should open Preference Step 1.

Banner copy:

- Label: `Settlyfe AI`
- Title: `Not sure where to live?`
- Body: `Settlyfe AI compares your budget, commute, room type, furniture needs, and move-in steps before you apply.`
- CTA: `Build my plan`

## 5. Preference Screens Handoff

- Preference Input is implemented as a 3-step flow.
- Step 1: Move Basics.
- Step 2: Housing Needs.
- Step 3: Lifestyle & Priorities.
- Follow Settlyfe onboarding/application form style.
- Use clean top navigation with a back action.
- Use step indicators where shown in Figma.
- Use rounded input fields, radio rows, chips, and sticky bottom CTA.
- Preference Step 2 may scroll slightly because content can extend behind the sticky bottom CTA.
- Keep all entered values in structured local state.

## 6. Loading Screen Handoff

- Loading screen should stay lightweight and Settlyfe-native.
- It does not need to match one exact spinner frame.
- Use a simple spinner or subtle progress treatment.
- Automatically move to AI Result Plan after around 2.5 seconds.

Show analysis steps:

- Reviewing your budget.
- Comparing commute options.
- Matching lifestyle preferences.
- Checking furniture needs.
- Preparing your move-in plan.

## 7. AI Result Plan Handoff

- Result Plan may scroll vertically.
- Use the viewport screenshot for first-screen composition.
- Use the full-scroll screenshot for below-the-fold sections.
- V1 recommendation cards represent example matches or area-level rental directions, not guaranteed live listings.
- Other Good Matches should have role labels such as Budget Pick, Short Commute, Social Area, or Furniture Ready.

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

## 8. Moving Checklist Handoff

- Checklist may scroll vertically.
- Use grouped list/card patterns.
- Checklist items should reflect recommendation risks and user preferences.
- Fake Save Plan can show a local non-persistent confirmation state.

Required sections:

- Rental Prep
- Viewing Questions
- Furniture Plan
- Move-in Day

## 9. Visual System Notes

- Follow `docs/design-system.md` as source of truth.
- Primary action color: `#6463F0`.
- Use Avenir-like typography.
- Keep white / very light gray backgrounds.
- Use rounded cards, rounded inputs, light borders, and soft shadows.
- Use minimal line icons.
- Do not create a futuristic AI dashboard style.
- Do not use dark mode, neon effects, or unrelated AI visual language.
- Keep AI visuals helpful, subtle, and integrated into Settlyfe.

## 10. Implementation Notes

- Treat the Figma references as visual targets, not image-based UI.
- Do not place entire screenshots into the app.
- Recreate the interface with real components.
- Use the exported banner background asset only for the AI banner illustration.
- Keep UI components reusable.
- Keep data, recommendation logic, explanation output, UI rendering, and checklist generation separated.
- This handoff is for V1 only, but the implementation should remain upgradeable for V2 AI API and V3 data-connected MVP.
