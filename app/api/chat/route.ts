import { NextResponse } from "next/server";
import type { ChatRequest } from "@/lib/types";
import { generateReply, ProviderError } from "@/lib/server/provider";

export async function POST(req: Request) {
  let body: ChatRequest;
  try { body = await req.json(); } catch {
    return NextResponse.json({ code: "BAD_REQUEST", message: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0)
    return NextResponse.json({ code: "BAD_REQUEST", message: "No message to send." }, { status: 400 });

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey)
    return NextResponse.json({ code: "AI_NOT_CONFIGURED", message: "The AI service isn't configured yet. Add AI_API_KEY to .env.local and restart the app." }, { status: 503 });

  try {
    const reply = await generateReply(body, apiKey);
    return NextResponse.json({ reply });
  } catch (e) {
    const message = e instanceof ProviderError ? e.userMessage : "The AI service returned an error. Please try again.";
    return NextResponse.json({ code: "UPSTREAM_ERROR", message }, { status: 502 });
  }
}
