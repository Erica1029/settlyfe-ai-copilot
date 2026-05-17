import { NextResponse } from "next/server";
import {
  createFallbackAiPlanResponse,
  isAiPlanRequest,
  requestAiPlan,
} from "@/lib/aiPlan";

export const runtime = "nodejs";

const DEFAULT_MODEL = "gpt-4.1-mini";
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_TIMEOUT_MS = 15000;
const MAX_BODY_BYTES = 25_000;

function parseTimeoutMs(value: string | undefined) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_TIMEOUT_MS;
  return Math.min(parsed, MAX_TIMEOUT_MS);
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { status: "fallback", fallbackReason: "AI request was too large." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { status: "fallback", fallbackReason: "AI request JSON was invalid." },
      { status: 400 },
    );
  }

  if (!isAiPlanRequest(body)) {
    return NextResponse.json(
      { status: "fallback", fallbackReason: "AI request shape was invalid." },
      { status: 400 },
    );
  }

  const aiEnabled = process.env.AI_PLAN_ENABLED === "true";
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || DEFAULT_MODEL;
  const timeoutMs = parseTimeoutMs(process.env.AI_PLAN_TIMEOUT_MS);

  if (!aiEnabled) {
    return NextResponse.json(createFallbackAiPlanResponse(body, "AI plan is disabled."));
  }

  if (!apiKey) {
    return NextResponse.json(createFallbackAiPlanResponse(body, "AI API key is missing."));
  }

  const aiResponse = await requestAiPlan({
    request: body,
    apiKey,
    model,
    timeoutMs,
  });

  if (!aiResponse) {
    return NextResponse.json(
      createFallbackAiPlanResponse(body, "AI response failed validation or timed out."),
    );
  }

  return NextResponse.json(aiResponse);
}
