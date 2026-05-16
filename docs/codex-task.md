# Codex Implementation Brief

This file is the implementation brief for the `03 Implementation｜V1 Demo实现` workstream.

## 1. Project Summary

Build Settlyfe AI Copilot as a mobile-first Next.js web app demo.

Settlyfe AI Copilot is an AI-assisted rental planning feature inside the existing Settlyfe rental app. It is not a standalone AI product.

V1 is an interactive mock-data product demo, not a static prototype. It should validate the guided rental planning flow, recommendation structure, and move-in checklist experience before adding real AI or live data.

## 2. V1 Scope

V1 should use:

- Local state only.
- Structured San Diego / UCSD / North America student-rental mock data.
- A rule-based recommendation engine.
- Approved Settlyfe Figma visual references.
- The exported AI banner background asset.

V1 should not use:

- Real AI API.
- Live rental listing API.
- Map API.
- Database.
- Login or account system.
- Payment.
- Saved plans with persistence.
- Real-time listing availability.

San Diego / UCSD / North America student rental is the first validation market. San Diego is not the only future market, so keep the product logic and data model extensible to Shanghai, Hong Kong, New York, and other student or intern relocation cities.

## 3. Required Screens / States

The product has 5 core product stages:

Home Entry -> Preference Input -> AI Loading -> AI Result Plan -> Moving Checklist.

The V1 implementation has 7 screens / states:

1. Home with AI Copilot banner inside the original Settlyfe homepage.
2. Preference Step 1 - Move Basics.
3. Preference Step 2 - Housing Needs.
4. Preference Step 3 - Lifestyle & Priorities.
5. AI Loading.
6. AI Result Plan.
7. Moving Checklist.

## 4. Visual Reference Requirements

Before implementation, read:

- `docs/design-system.md`.
- `docs/figma-handoff.md`, if it exists.
- `docs/ui-implementation-guide.md`, if it exists.
- `public/references/` viewport screenshots.
- `public/references/` full-scroll screenshots.
- `public/images/ai-copilot-banner-bg.png`.

Visual reference rules:

- 375x812 viewport screenshots are the primary visual reference.
- Full-scroll screenshots are only for understanding below-the-fold content.
- Do not implement full-scroll images as fixed-height screens.
- The real app should be mobile-first and scroll vertically when needed.

## 5. Home Screen Requirements

- Use the original Settlyfe homepage shell style.
- Keep original 4-tab bottom navigation: Home, Find Homes, Messages, Account.
- Do not add AI Copilot as a bottom tab.
- Use AI Copilot banner as the main feature entry.
- Use the exported banner background image.

Banner copy:

- Label: Settlyfe AI.
- Title: Not sure where to live?
- Body: Settlyfe AI compares your budget, commute, room type, furniture needs, and move-in steps before you apply.
- CTA: Build my plan.

## 6. Preference Flow Requirements

### Preference Step 1 - Move Basics

- Target city or area.
- School / workplace.
- Monthly budget.
- Max commute time.

### Preference Step 2 - Housing Needs

- Room type.
- Bathroom preference.
- Furniture need.
- Car ownership.
- Move-in timeline.

### Preference Step 3 - Lifestyle & Priorities

- Lifestyle preference.
- Top priorities.
- Deal breakers.

## 7. Recommendation Requirements

AI Result Plan should include:

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
- Optional edit preferences action.

V1 recommendation cards represent example matches or area-level rental directions, not guaranteed live listings.

Recommendation output should change based on user preferences such as budget, commute limit, location, room type, bathroom preference, furniture need, car ownership, lifestyle preference, top priorities, and deal breakers.

## 8. Checklist Requirements

Moving Checklist should include:

- Rental Prep.
- Viewing Questions.
- Furniture Plan.
- Move-in Day.

Checklist items should respond to user preferences and recommendation risks. For example:

- No car should add transit / commute verification tasks.
- Furniture need should add furniture measuring, delivery, and setup tasks.
- Parking risk should add parking questions.
- Short move-in timeline should add urgent application and viewing tasks.

## 9. Architecture Requirements

The implementation should separate:

- User preferences.
- Mock rental / neighborhood data.
- Recommendation logic.
- Explanation output.
- UI rendering.
- Checklist generation.

Suggested implementation structure:

- `src/types/`.
- `src/data/mockNeighborhoods.ts` or similar.
- `src/lib/recommendationEngine.ts`.
- `src/lib/checklistGenerator.ts`.
- `src/components/`.
- `src/app/` or App Router pages / components.

Do not hard-code all recommendation results directly in UI components.

## 10. Technical Requirements

- Next.js.
- TypeScript.
- Tailwind.
- Mobile-first layout.
- 375px-centered desktop preview.
- Reusable components for buttons, cards, fields, progress, scores, recommendation cards, risk cards, checklist rows, and bottom navigation.
- Vercel-ready.

## 11. Implementation Process

Before writing code in the `03 Implementation｜V1 Demo实现` workstream, Codex should first read the docs and visual references, then summarize:

- Product flow understanding.
- Screens to implement.
- Components to create.
- Files to edit.
- Unclear points or risks.

If the task asks for a plan first, Codex should wait for confirmation before implementation.
