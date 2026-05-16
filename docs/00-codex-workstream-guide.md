# Settlyfe AI project Codex Workstream Guide

Use separate Codex conversations for separate kinds of work. Start each conversation with the exact workstream name below so the task scope is clear.

Current conversation should be treated as:

`01 Product Docs｜产品文档`

This guide is the source of truth for conversation boundaries because the Codex app UI cannot be renamed directly from this workspace.

## 01 Product Docs｜产品文档

### Purpose

This conversation is only for product thinking and documentation.

Use it to clarify the product idea, user problem, MVP scope, AI value, recommendation logic, product positioning, and product documentation structure.

### Can Edit

- `docs/workflow.md`
- `docs/idea.md`
- `docs/PRD.md`
- `docs/feature-spec.md`
- `docs/codex-task.md`
- `docs/roadmap.md`
- `docs/v1-scope.md`
- Product positioning notes.
- MVP scope notes.
- User pain point notes.
- AI value proposition notes.
- Mock recommendation logic documentation.

### Should Not Do

- Do not write app code.
- Do not edit `src/`.
- Do not install dependencies.
- Do not start the dev server.
- Do not change UI styling files.
- Do not deploy.

### Example Prompts

```text
This is the 01 Product Docs｜产品文档 workstream for the Settlyfe AI project.
Please review idea.md and PRD.md, then improve the MVP scope and product positioning.
Do not write app code or install dependencies.
```

```text
This is the 01 Product Docs｜产品文档 workstream.
Please update feature-spec.md to match the current flow:
Core product stages: Home Entry -> Preference Input -> AI Loading -> AI Result Plan -> Moving Checklist.
V1 implementation screens/states: Home with AI Copilot banner, Preference Step 1 - Move Basics, Preference Step 2 - Housing Needs, Preference Step 3 - Lifestyle & Priorities, AI Loading, AI Result Plan, Moving Checklist.
Do not modify UI or app code.
```

## 02 Design System & UI｜设计系统与界面

### Purpose

This conversation is only for design system and UI direction.

Use it to align Settlyfe AI Copilot with the existing Settlyfe mobile app, Figma design system, Stitch/Figma prompts, page layout, visual hierarchy, AI Copilot entry card, and UI consistency.

### Can Edit

- `docs/design-system.md`
- `docs/figma-handoff.md`
- `docs/ui-implementation-guide.md`
- Stitch prompt drafts.
- Figma prompt drafts.
- UI direction notes.
- Screen layout notes.
- AI Copilot entry card specs.
- Button, form, card, list, modal, bottom sheet, and tab bar guidance.

### Should Not Do

- Do not implement app code unless explicitly requested.
- Do not edit React components by default.
- Do not install dependencies.
- Do not start the dev server.
- Do not change product scope unless the product docs workstream requests it.
- Do not deploy.

### Example Prompts

```text
This is the 02 Design System & UI｜设计系统与界面 workstream for the Settlyfe AI project.
Please review design-system.md and make the AI Copilot UI feel more consistent with the existing Settlyfe Figma style.
Do not implement app code.
```

```text
This is the 02 Design System & UI｜设计系统与界面 workstream.
Please define the AI Copilot entry card, preference form layout, recommendation cards, and checklist UI rules based on Settlyfe's existing design system.
```

## 03 Implementation｜V1 Demo实现

### Purpose

This conversation is only for building the actual mobile-first V1 Web App Demo.

Use it to implement the Next.js demo, React components, Tailwind styling, form state, mock recommendation logic, page transitions, loading state, AI Result Plan, and Moving Checklist.

### Can Edit

- `src/`
- `public/` assets needed by the app.
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- Tailwind and styling configuration.
- Component files.
- Mock data files.
- App routing and page files.
- Implementation-specific utility files.

### Should Read First

- `docs/idea.md`
- `docs/PRD.md`
- `docs/feature-spec.md`
- `docs/design-system.md`
- `docs/codex-task.md`
- `docs/figma-handoff.md`, if it exists.
- `docs/ui-implementation-guide.md`, if it exists.
- `public/references/`
- `public/images/ai-copilot-banner-bg.png`

### Should Not Do

- Do not rewrite product documentation unless explicitly requested.
- Do not change V1 scope without confirmation.
- Do not connect a real AI API in V1.
- Do not add a database.
- Do not add login.
- Do not add maps.
- Do not add payment.
- Do not connect live rental listings.
- Do not deploy unless the task moves to the Debug & Deploy workstream.

### Example Prompts

```text
This is the 03 Implementation｜V1 Demo实现 workstream for the Settlyfe AI project.
Please read the approved product docs, design system, Figma handoff, and visual references first.
Then summarize the product flow, screens to implement, components to create, files to edit, and unclear risks before coding.
```

```text
This is the 03 Implementation｜V1 Demo实现 workstream.
Please implement the V1 flow using mock data only.
Core product stages: Home Entry -> Preference Input -> AI Loading -> AI Result Plan -> Moving Checklist.
V1 implementation screens/states:
1. Home with AI Copilot banner inside the original Settlyfe homepage
2. Preference Step 1 - Move Basics
3. Preference Step 2 - Housing Needs
4. Preference Step 3 - Lifestyle & Priorities
5. AI Loading
6. AI Result Plan
7. Moving Checklist
```

```text
This is the 03 Implementation｜V1 Demo实现 workstream.
Please create reusable Settlyfe-style components for buttons, cards, fields, progress, scores, recommendation cards, risk cards, checklist rows, and bottom navigation.
Follow docs/design-system.md and docs/codex-task.md.
```

## 04 Debug & Deploy｜调试与部署

### Purpose

This conversation is only for debugging, build fixes, and deployment preparation.

Use it to fix installation issues, dev server errors, build errors, Tailwind issues, lint problems, Vercel deployment issues, README updates, and deployment preparation.

### Can Edit

- Build and configuration files.
- Dependency files.
- README or deployment notes.
- Small implementation fixes required to resolve runtime, build, or deployment errors.
- Vercel configuration if needed.

### Should Not Do

- Do not change product scope.
- Do not redesign the UI unless required to fix a concrete error.
- Do not rewrite product docs unless deployment instructions need updating.
- Do not add real AI, database, maps, login, payment, or live listings.
- Do not make broad refactors unrelated to the bug or deployment issue.

### Example Prompts

```text
This is the 04 Debug & Deploy｜调试与部署 workstream for the Settlyfe AI project.
Please run the install/build/dev checks, fix errors, and keep changes limited to debugging and deployment readiness.
Do not change product scope or redesign the UI.
```

```text
This is the 04 Debug & Deploy｜调试与部署 workstream.
Please prepare the project for Vercel deployment, including build checks and README deployment instructions.
Do not add new product features.
```

## 05 V2 AI API Planning｜AI接入规划

### Purpose

This conversation is only for future real AI API integration planning.

Use it to plan OpenAI / AI API architecture, server-side routes, prompt strategy, structured output schema, fallback behavior, API key protection, and how V2 upgrades the V1 mock recommendation engine.

### Can Edit

- `docs/v2-ai-api-plan.md`
- `docs/roadmap.md`, if needed.
- API planning notes.
- Prompt / structured output notes.
- V2 architecture notes.

### Should Not Do

- Do not edit V1 implementation code unless explicitly requested.
- Do not add real AI API to V1.
- Do not expose API keys.
- Do not change V1 scope unless approved.
- Do not deploy.

### Example Prompts

```text
This is the 05 V2 AI API Planning｜AI接入规划 workstream.
Please draft docs/v2-ai-api-plan.md for how V2 can add a real AI API through a server-side route while preserving the V1 mock-data flow.
Do not edit V1 implementation code.
```

```text
This is the 05 V2 AI API Planning｜AI接入规划 workstream.
Please design the prompt strategy, structured output schema, fallback behavior, and API key protection plan for future AI-generated recommendation explanations.
```

## 06 V3 Data & Map Planning｜数据地图规划

### Purpose

This conversation is only for future data-connected MVP planning.

Use it to plan real or semi-real rental data, San Diego city data, commute / map / place data, database options, saved plans, and expansion to other rental markets.

### Can Edit

- `docs/v3-data-map-plan.md`
- `docs/roadmap.md`, if needed.
- Data model notes.
- Map / commute planning notes.
- Database planning notes.

### Should Not Do

- Do not edit V1 implementation code unless explicitly requested.
- Do not connect live rental APIs in V1.
- Do not add database / map / payment / login to V1.
- Do not scrape live rental platforms without an approved data strategy.
- Do not deploy.

### Example Prompts

```text
This is the 06 V3 Data & Map Planning｜数据地图规划 workstream.
Please draft docs/v3-data-map-plan.md for a future data-connected city MVP, starting with San Diego and keeping expansion to Shanghai, Hong Kong, New York, and other student/intern relocation cities in mind.
Do not edit V1 implementation code.
```

```text
This is the 06 V3 Data & Map Planning｜数据地图规划 workstream.
Please compare data, map, commute, and database options for V3 planning only.
Do not connect live APIs or add database code to V1.
```

## Cross-Workstream Handoff Rules

- Product Docs defines what should be built.
- Design System & UI defines how it should look and feel.
- Implementation builds the V1 demo from approved docs, Figma handoff, and reference images.
- Debug & Deploy makes the demo run reliably and prepares it for sharing.
- V2 AI API Planning should not modify V1 unless explicitly approved.
- V3 Data & Map Planning should not modify V1 unless explicitly approved.
- Any major product change should go back to `01 Product Docs｜产品文档`.
- Any major visual direction change should go back to `02 Design System & UI｜设计系统与界面`.
- Keep V1 mock-only unless an approved future workstream changes the scope.
