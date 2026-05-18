# Settlyfe AI Copilot V2 AI API Plan

## Status Note

V2 is implemented and deployed to production. This document now serves as the V2 AI architecture and guardrail reference for the current AI-assisted demo.

## 1. V2 Goal and Scope

V2 upgrades Settlyfe AI Copilot from an AI-style V1 demo into a real AI-assisted explanation experience while preserving the current product flow, UI, mock San Diego / UCSD rental data, and rule-based recommendation engine.

The V2 goal is narrow:

- Keep the same high-level flow: Home -> Preferences -> AI Loading -> AI Result Plan -> Moving Checklist.
- Use a simplified V2 MVP preference flow with only city / area, school or workplace, monthly budget, max commute time, room type, car access, and optional lifestyle preference.
- Keep the same mobile-first Settlyfe UI and screen structure.
- Keep local San Diego / UCSD mock rental and neighborhood data.
- Keep the rule-based recommendation engine as the source of truth.
- Add a server-side AI API call only to improve wording, explanation quality, and practical guidance.
- Preserve deterministic fallback output when AI is unavailable, slow, invalid, or not configured.

V2 should not add:

- Live rental APIs.
- Map APIs.
- Database.
- Login.
- Payment.
- Real-time listing availability.
- New UI screens or redesigned components.
- Client-side API keys.

For MVP stability, secondary preference fields are intentionally hidden from the user-facing flow and defaulted in state/request builders:

- Furniture need: `flexible`.
- Bathroom preference: `shared_ok`.
- Move-in timeline: `standard`.
- Deal breakers: `[]`.
- Top priorities: `[]`.

Normal V2 recommendation results are limited to matched San Diego / UCSD inputs. The target city or area must clearly be San Diego, and the school or workplace must clearly be UCSD, UC San Diego, or University of California San Diego. Do not infer UCSD from city alone; empty destinations, unsupported schools, unsupported cities, and mismatched city-school pairs should show the unsupported-location product state.

## 2. What AI Generates

The AI layer can generate improved language for these controlled sections only:

- Recommendation explanation: why the selected best-fit area or example match fits the user's stated preferences.
- Budget / commute / lifestyle tradeoff explanation: plain-language explanation of the already computed tradeoffs.
- Watch-outs: risks derived from provided rule-based facts, such as parking, commute verification, furniture, timeline, budget band, or deal breakers.
- Next steps: practical actions based on the provided recommendation result.
- Move-in checklist wording: clearer task titles and short explanations based on rule-generated checklist items.

The AI should behave like a copy and reasoning layer over existing facts. It should not rank listings, select a different winner, create new areas, create new prices, invent commute times, invent addresses, invent availability, or change fit scores.

## 3. What Remains Rule-Based / Controlled

The following must remain controlled by existing V1 logic:

- User preference collection and validation.
- Unsupported-location and no-strong-match result states.
- Supported-scope validation for matched San Diego / UCSD demo inputs.
- Mock San Diego / UCSD rental and neighborhood data.
- Best-fit recommendation selection.
- Fit score calculation.
- Other Good Matches ranking.
- Budget band labels and price ranges.
- Commute labels and commute times.
- Area names, example match names, room types, and availability-like descriptions.
- Watch-out source facts.
- Checklist source facts and categories.
- Fallback recommendation explanations and checklist copy.

The rule-based output should be passed to AI as immutable facts. The client should render either:

- AI-enhanced text that validates against the expected schema and stays inside the provided facts.
- Existing rule-based fallback text.

## 4. Server-Side API Route Architecture

Recommended later implementation:

```text
Client result generation
  -> existing rule-based recommendation engine
  -> existing rule-based checklist generator
  -> POST /api/ai-plan
      -> server validates request body
      -> server checks AI_API_KEY / OPENAI_API_KEY
      -> server sends controlled facts to AI
      -> server validates structured AI response
      -> server returns AI copy or fallback signal
  -> client merges text-only AI fields into existing result view
```

Suggested route:

```text
src/app/api/ai-plan/route.ts
```

The route should be server-only. The browser should never call the AI provider directly.

The route should accept controlled inputs and return structured copy. It should not fetch rental data, map data, user accounts, or database records.

Recommended route behavior:

- Accept `POST` only.
- Validate input shape before calling AI.
- Reject oversized payloads.
- Use a short timeout.
- Return a safe fallback response if the API key is missing.
- Return a safe fallback response if the model call fails.
- Validate AI output before returning it to the client.
- Never return provider errors or API keys to the client.

## 5. Input Schema Sent to AI

The AI request should include only the information needed to explain the already computed plan.

Recommended input shape:

```ts
type AiPlanRequest = {
  version: "v2-ai-plan";
  locale: "en-US";
  userPreferences: {
    targetCityOrArea: string;
    schoolOrWorkplace: string;
    monthlyBudget: number;
    maxCommuteMinutes: number;
    roomType: string;
    bathroomPreference: string;
    furnitureNeed: string;
    carOwnership: string;
    moveInTimeline: string;
    lifestylePreference: string;
    topPriorities: string[];
    dealBreakers: string[];
  };
  recommendationFacts: {
    bestFit: {
      areaName: string;
      exampleMatchName: string;
      fitScore: number;
      roomType: string;
      budgetBand: string;
      commuteLabel: string;
      commuteMinutes?: number;
      lifestyleTags: string[];
      strengths: string[];
      tradeoffs: string[];
      riskNotes: string[];
    };
    otherGoodMatches: Array<{
      label: string;
      areaName: string;
      fitScore: number;
      budgetBand: string;
      roomType: string;
      commuteLabel: string;
      strength: string;
      tradeoff: string;
    }>;
  };
  checklistFacts: Array<{
    section: "Rental Prep" | "Viewing Questions" | "Furniture Plan" | "Move-in Day";
    title: string;
    reason: string;
    priority?: "high" | "medium" | "low";
    sourceReason?: string;
  }>;
  constraints: {
    mayOnlyUseProvidedFacts: true;
    mustNotInventPrices: true;
    mustNotInventCommuteTimes: true;
    mustNotInventAddresses: true;
    mustNotInventAvailability: true;
    mustPreserveRecommendationRanking: true;
  };
};
```

Fields can be adjusted to match existing TypeScript types during the later implementation pass. The important rule is that the request must send recommendation facts, not ask the model to independently decide the recommendation.

## 6. Structured Output Schema Returned by AI

The route should request and validate structured JSON, not free-form prose.

Recommended output shape:

```ts
type AiPlanResponse = {
  status: "ai" | "fallback";
  explanation: {
    fitSummary: string;
    budgetCommuteLifestyleTradeoff: string;
    whyThisFits: string[];
    watchOuts: string[];
    nextSteps: string[];
  };
  checklist: Array<{
    section: "Rental Prep" | "Viewing Questions" | "Furniture Plan" | "Move-in Day";
    title: string;
    description: string;
    priority?: "high" | "medium" | "low";
  }>;
  safety: {
    usedOnlyProvidedFacts: boolean;
    changedRecommendation: false;
    addedExternalListingData: false;
  };
};
```

Validation requirements:

- `fitSummary` and `budgetCommuteLifestyleTradeoff` should be concise.
- `whyThisFits`, `watchOuts`, and `nextSteps` should have bounded item counts.
- Checklist sections must match existing V1 checklist sections.
- The response must not include new prices, new addresses, new listing names, new commute times, or availability claims.
- If validation fails, discard AI output and use fallback.

## 7. Prompt Strategy

Use a strict prompt that frames AI as an explanation assistant, not a recommendation engine.

Prompt priorities:

- The rule-based recommendation is final.
- The model may only explain, clarify, and rewrite provided facts.
- The model must preserve all area names, fit scores, budget bands, commute values, room types, and ranking order.
- The model must not add listing inventory, addresses, availability, landlord claims, application advice that implies guarantee, or market data.
- The model should write in clear, practical, student-renter-friendly language.
- The model should be concise enough for mobile UI.
- The model should return only valid structured JSON matching the schema.

Suggested system instruction:

```text
You are Settlyfe AI Copilot's explanation writer. You do not choose listings,
prices, commute times, addresses, rankings, or availability. The rule-based
recommendation facts are the only source of truth. Explain the provided plan
clearly for a student or young renter, using only the facts in the request.
Return valid JSON only.
```

Suggested user instruction:

```text
Rewrite and explain this controlled recommendation plan. Do not change the
winner, rankings, fit scores, budget bands, commute values, room types, area
names, checklist sections, or source facts. If a detail is not present, do not
add it.
```

## 8. Fallback Behavior

Fallback behavior is required and should be treated as part of the product, not as an error state.

Use existing rule-based copy when:

- No API key exists.
- The server route is unavailable.
- The AI provider times out.
- The AI provider returns invalid JSON.
- The AI response violates schema validation.
- The AI response appears to invent unsupported facts.
- Rate limits or provider errors occur.

Unsupported-location and no-strong-match are product result states, not AI fallback states. They should be decided before AI enhancement and should not call `/api/ai-plan`. Unsupported-location covers unsupported cities, unsupported destinations, empty destinations, and city-school mismatches.

Recommended client behavior:

- Generate and display the V1 rule-based result immediately or after the existing loading state.
- Attempt AI enhancement in the background during the loading or result preparation step.
- If AI succeeds, render enhanced explanation text inside the existing result structure.
- If AI fails, render V1 text with no disruptive error message.

The user experience should still complete from Home to Moving Checklist without AI.

## 9. API Key Protection

API keys must stay server-side only.

Rules:

- Store provider keys only in environment variables.
- Do not prefix provider keys with `NEXT_PUBLIC_`.
- Do not send provider keys to client components.
- Do not log provider keys.
- Do not include raw provider error payloads in client responses.
- Keep the AI call inside a server route or server action.
- Add `.env.local` to local-only setup and keep it out of source control.

Recommended variable names:

```text
OPENAI_API_KEY=...
AI_MODEL=...
AI_PLAN_ENABLED=true
AI_PLAN_TIMEOUT_MS=8000
```

`AI_MODEL` can be configured later without hard-coding a model name into client code.

## 10. Vercel Environment Variable Setup

Later Vercel setup:

1. Open the Vercel project settings for the deployed Settlyfe AI Copilot app.
2. Go to Environment Variables.
3. Add `OPENAI_API_KEY` or the selected provider key for Production, Preview, and Development as needed.
4. Add `AI_MODEL` if the server route reads the model name from environment.
5. Add `AI_PLAN_ENABLED=true` for environments where AI should run.
6. Redeploy after setting variables.
7. Verify the browser bundle does not expose provider keys.

Local setup for later implementation:

```text
.env.local
OPENAI_API_KEY=...
AI_MODEL=...
AI_PLAN_ENABLED=true
AI_PLAN_TIMEOUT_MS=8000
```

If `AI_PLAN_ENABLED` is missing or false, the app should use fallback copy.

## 11. Implementation Steps for Later Coding Pass

Do not implement these steps in this planning pass.

Recommended later sequence:

1. Review existing recommendation and checklist types.
2. Define shared V2 AI request and response TypeScript types.
3. Add a server-only AI provider utility.
4. Add `POST /api/ai-plan`.
5. Add request validation and response validation.
6. Add fallback response handling.
7. Wire the existing result generation flow to call the route after rule-based output exists.
8. Merge AI text into the existing Result Plan and Checklist structures without changing layout.
9. Add environment variable documentation.
10. Add minimal tests or manual QA cases for success, missing key, timeout, invalid JSON, and invented-fact rejection.
11. Run local build checks.
12. Deploy to Vercel only after fallback behavior is verified.

Suggested file ownership for later:

- `src/app/api/ai-plan/route.ts` for the server route.
- `src/lib/aiPlan.ts` or similar for server-side provider call and validation helpers.
- Existing recommendation engine remains the source of truth.
- Existing UI components should receive compatible text fields and should not be redesigned.

## 12. QA Checklist

Functional QA:

- Full flow still works from Home to Moving Checklist.
- V2 MVP preference flow only asks for city / area, school or workplace, monthly budget, max commute time, room type, car access, and optional lifestyle preference.
- Hidden secondary preferences use safe defaults for furniture, bathroom, move-in timeline, deal breakers, and top priorities.
- Normal recommendations require both San Diego city scope and UCSD destination scope.
- Preference changes still change the rule-based recommendation.
- Unsupported-location and no-strong-match states do not call AI and do not show confident recommendation sections.
- Missing API key still completes the flow.
- AI timeout still completes the flow.
- Invalid AI JSON still completes the flow.
- AI output does not change best-fit area, ranking, score, budget band, commute value, or room type.
- AI output does not invent prices, addresses, availability, or live listing claims.
- Checklist sections remain Rental Prep, Viewing Questions, Furniture Plan, and Move-in Day.

UI QA:

- No new screens are introduced.
- Existing mobile layout remains intact.
- Existing loading state remains lightweight.
- Result Plan still uses the current structured UI.
- Checklist still uses the current checklist UI.
- Text length fits mobile cards and does not overflow.

Security QA:

- API key is not present in browser source, network responses, or console logs.
- Provider errors are not exposed directly to users.
- `.env.local` is not committed.
- Vercel environment variables are scoped correctly.

Deployment QA:

- Production build passes.
- Vercel deployment succeeds with AI disabled.
- Vercel deployment succeeds with AI enabled.
- Fallback works in Preview and Production.

## 13. Risks and Guardrails

### Risk: AI Invents Rental Facts

Guardrails:

- Send only controlled facts.
- Prompt the model to explain only provided facts.
- Validate structured output.
- Reject unsupported prices, addresses, commute times, availability, and listing claims.
- Fall back to rule-based copy if validation fails.

### Risk: AI Changes Recommendation Logic

Guardrails:

- Keep ranking and fit score outside AI.
- Do not ask AI to choose the best match.
- Preserve existing engine output as immutable input.
- Use AI only for text fields.

### Risk: API Failure Breaks the Demo

Guardrails:

- Make fallback mandatory.
- Treat missing API key as normal.
- Use short timeout and safe fallback.
- Keep V1 text generation available.

### Risk: API Key Exposure

Guardrails:

- Server route only.
- No `NEXT_PUBLIC_` provider keys.
- No provider key logging.
- No raw provider error responses to client.

### Risk: Text Becomes Too Long for Mobile UI

Guardrails:

- Bound response length in prompt and schema.
- Cap list item counts.
- QA on mobile viewport.
- Fall back or truncate only at controlled render points if needed.

### Risk: V2 Drifts Into V3

Guardrails:

- Do not add live rental APIs.
- Do not add map APIs.
- Do not add database or login.
- Keep San Diego mock data as the source for V2.
- Keep richer preferences, live rental data, map/commute integrations, persistence, and broader city coverage for V3.
- Keep V3 data and map planning separate from this V2 AI API upgrade.

## Proposed V2 Architecture Summary

V2 should add a server-side AI explanation layer after the existing rule-based recommendation engine has already produced a complete plan. The browser sends user preferences, selected recommendation facts, other match facts, and checklist facts to a protected server route. The server route calls the AI provider, requests structured JSON, validates the response, and returns text-only enhancements. If anything fails, the app uses the existing V1 rule-based output.

This preserves the current V1 demo while making the result feel more genuinely AI-assisted. The AI improves wording and reasoning clarity, but the product remains stable, controlled, and safe for a portfolio demo.
