# Settlyfe AI Copilot V2 QA Report

## Status

V2 has been manually QA checked and deployed as the current production AI-assisted demo.

Live demo: `https://settlyfe-ai-copilot.vercel.app/`

## Manual QA Cases

### 1. San Diego, CA + UC San Diego Normal Result

- Input: `San Diego, CA` as city / area and `UC San Diego` as school / workplace.
- Expected: supported normal recommendation result.
- Expected AI behavior: `/api/ai-plan` can be called for explanation wording.
- Expected UI: AI Result Plan shows a best-fit area, explanation, watch-outs, next steps, and checklist CTA.

### 2. san diego + ucsd Normal Result

- Input: lowercase `san diego` and `ucsd`.
- Expected: supported normal recommendation result.
- Expected AI behavior: input normalization accepts common lowercase variants.
- Expected UI: same normal result behavior as the canonical San Diego / UCSD case.

### 3. San Diego + UCLA Unsupported

- Input: `San Diego` with `UCLA`.
- Expected: unsupported-location product state.
- Expected AI behavior: do not call `/api/ai-plan`.
- Expected UI: do not show a confident San Diego / UCSD recommendation.

### 4. New York + NYU Unsupported

- Input: `New York` with `NYU`.
- Expected: unsupported-location product state.
- Expected AI behavior: do not call `/api/ai-plan`.
- Expected UI: explain that V2 is limited to the controlled San Diego / UCSD demo scope.

### 5. San Diego + UCSD + Budget 200 No Strong Match

- Input: supported San Diego / UCSD scope with monthly budget `200`.
- Expected: no-strong-match product state.
- Expected AI behavior: do not call `/api/ai-plan`.
- Expected UI: explain that the budget is too low for a confident recommendation in the controlled mock data.

### 6. `/api/ai-plan` Behavior

- Expected: only normal supported San Diego / UCSD recommendations call the route.
- Expected: request sends controlled recommendation and checklist facts after rule-based generation.
- Expected: response may enhance explanation wording only.
- Expected: AI must not change area, ranking, price / budget band, commute value, room type, fit score, or availability-like facts.

### 7. Fallback Behavior

- Trigger examples: missing API key, disabled AI, provider timeout, provider error, invalid JSON, schema validation failure, or invented-fact detection.
- Expected: app still completes the flow.
- Expected: UI uses rule-based fallback explanation and checklist copy.
- Expected: user does not see raw provider errors or API details.

## Final QA Notes

- Unsupported-location and no-strong-match are product result states, not technical fallback states.
- Technical fallback is only for AI route or provider failure.
- V2 preserves V1 constraints for data, recommendation facts, and demo scope.
