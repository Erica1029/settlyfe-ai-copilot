# Settlyfe AI Copilot V1 Demo

Settlyfe AI Copilot V1 is a mobile-first rental planning demo that shows how an AI-style assistant could guide a student or renter from discovery to a personalized moving checklist inside the Settlyfe app experience.

Live demo: https://settlyfe-ai-copilot.vercel.app/

## Core User Flow

Home -> Preferences -> Loading -> Result Plan -> Move-in Checklist

The demo starts from the Settlyfe Home screen, collects rental preferences, shows a lightweight AI loading state, generates a recommended area plan, and turns the result into a move-in checklist.

## V1 Scope

- Mock rental and neighborhood data.
- Local React state only.
- Rule-based recommendation engine.
- Preference-driven checklist generation.
- Mobile app preview fixed around the approved Settlyfe V1 demo flow.

## Intentionally Out of Scope

- No real AI API.
- No live listing API.
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

This project is designed as a V1 product demo, not a production rental marketplace. It is useful for discussing:

- Translating a rental-app concept into a working mobile prototype.
- Designing a constrained AI-assisted decision flow without connecting real APIs.
- Separating mock data, preference collection, recommendation logic, and checklist output.
- Showing deploy-ready frontend execution with local assets and a clear V1 scope boundary.
