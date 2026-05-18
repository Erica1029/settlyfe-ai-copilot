# Settlyfe AI Copilot Version History

## V1 Interactive Demo

V1 delivered the original interactive mock-data demo.

- Status: archived.
- Branch: `archive/v1-interactive-demo`.
- Tag: `v1-interactive-demo`.
- Scope: local state, structured San Diego / UCSD mock data, rule-based recommendation engine, no real AI API, no live rental API, no database, no login.
- Purpose: validate the guided rental planning flow, recommendation structure, and move-in checklist experience.

## V2 AI-Assisted Demo

V2 is the current production demo.

- Status: implemented and deployed.
- Production branch: `main`.
- Archive branch: `archive/v2-ai-assisted-demo`.
- Tag: `v2-ai-assisted-demo`.
- Live demo: `https://settlyfe-ai-copilot.vercel.app/`.
- Scope: keeps rule-based recommendation facts as the source of truth and adds a server-side AI-assisted explanation layer for supported San Diego / UCSD results.
- Purpose: make the demo feel genuinely AI-assisted while preserving controlled facts, fallback behavior, and V1 product boundaries.

## V3 Data-Connected City MVP Planning

V3 is a future planning track, not implemented in the current demo.

- Status: planning only.
- Branch: not created yet.
- Tag: not created yet.
- Scope direction: real or semi-real city-level rental data, commute / map / place data, optional persistence, and expansion beyond San Diego after the core city MVP is validated.
- Purpose: move from portfolio demo toward a realistic data-connected city MVP.
