import type { ChatRequest, ChatResponse } from "./types";

export class ChatApiError extends Error {
  constructor(message: string, public code: string) { super(message); }
}

/** Calls our own /api/chat route. Throws ChatApiError with a human-readable message. */
export async function sendChat(payload: ChatRequest): Promise<string> {
  let res: Response;
  try {
    res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch {
    throw new ChatApiError("Couldn't reach the server. Check your internet connection and try again.", "NETWORK");
  }
  const data: ChatResponse = await res.json().catch(() => ({}));
  if (!res.ok || !data.reply) throw new ChatApiError(data.message || "Something went wrong. Please try again.", data.code || "UNKNOWN");
  return data.reply;
}
