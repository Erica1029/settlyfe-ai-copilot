# Settlyfe AI Copilot AI Guardrails

## AI Role

In V2, AI is an explanation layer. It improves wording for recommendation explanations, watch-outs, next steps, and checklist text after the rule-based engine has already produced a complete plan.

The rule-based recommendation engine remains the source of truth for facts and ranking.

## AI Cannot-Do Rules

AI must not:

- Choose the best-fit area.
- Change recommendation ranking.
- Change fit scores.
- Change budget bands or price ranges.
- Change commute values.
- Change room type.
- Invent addresses.
- Invent listing availability.
- Invent landlord, broker, or agent claims.
- Invent live rental or market data.
- Expand the supported demo scope beyond San Diego / UCSD.

## Product Guardrails

- V2 supports normal recommendations only for matched San Diego / UCSD inputs.
- Unsupported cities, unsupported schools, city-school mismatches, and empty destinations show an unsupported-location product state.
- Extremely unrealistic budgets can show a no-strong-match product state.
- Unsupported-location and no-strong-match states should not call AI.
- AI-enhanced text should stay practical, student-renter-friendly, and concise enough for mobile UI.

## Technical Guardrails

- API keys must stay server-side.
- Do not expose provider keys with `NEXT_PUBLIC_`.
- Do not log provider keys.
- Do not return raw provider errors to the client.
- Validate request shape before calling AI.
- Validate structured AI output before rendering.
- Reject AI output that changes controlled facts or invents unsupported details.
- Keep timeout and failure handling short and predictable.

## Fallback Behavior

Fallback is required and should feel like a normal product path.

Use rule-based fallback output when:

- AI is disabled.
- API key is missing.
- Provider request times out.
- Provider returns an error.
- Provider returns invalid JSON.
- Schema validation fails.
- AI appears to invent facts or change the recommendation.

Fallback should preserve the full flow from Home to Moving Checklist. The user should still receive a structured recommendation or the appropriate product state without seeing technical error details.
