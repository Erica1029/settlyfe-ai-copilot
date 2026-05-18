# Settlyfe AI Copilot V2 AI API Preview

Settlyfe AI Copilot V2 is a mobile-first rental planning demo that adds a real AI-assisted explanation layer while keeping recommendation facts controlled by local San Diego / UCSD sample data and rule-based logic.

Stable V1 live demo: https://settlyfe-ai-copilot.vercel.app/

## Core User Flow

Home -> Preferences -> Loading -> Result Plan -> Move-in Checklist

The V2 MVP starts from the Settlyfe Home screen, collects simplified rental preferences, shows a lightweight AI loading state, generates a recommended area plan, and turns normal supported results into a move-in checklist.

Visible V2 MVP inputs:

- Target city / area.
- School or workplace.
- Monthly budget.
- Max commute time.
- Room type.
- Car access.
- Lifestyle preference.

Secondary fields such as furniture need, private bathroom preference, move-in timeline, deal breakers, and top priorities are hidden or defaulted for MVP stability.

## V2 Scope

- Mock rental and neighborhood data.
- Local React state only.
- Rule-based recommendation engine as the source of truth.
- Server-side AI explanation route.
- Preference-driven checklist generation.
- Mobile app preview fixed around the approved Settlyfe demo flow.

AI may refine explanation wording, watch-outs, next steps, and checklist wording. AI must not change price, commute, fit score, area name, room type, or ranking.

Unsupported-location and no-strong-match states are product result states, not AI fallback. Technical fallback is only for provider failure, timeout, validation failure, missing key, or disabled AI.

## Intentionally Out of Scope

- No live listing API.
- No map API.
- No database.
- No login or account system.
- No saved user persistence beyond local demo state.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

For a production build check:

```bash
npm run build
```

## Portfolio / Interview Demo Notes

This project is designed as a product demo, not a production rental marketplace. It is useful for discussing:

- Translating a rental-app concept into a working mobile prototype.
- Designing a constrained AI-assisted decision flow without live rental or map APIs.
- Separating mock data, preference collection, recommendation logic, and checklist output.
- Showing how V2 can add AI explanation while leaving richer preferences, live rental data, maps, persistence, and broader city coverage to V3.
