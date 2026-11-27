import type { ChatRequest } from "../types";

/** An error whose message is safe to show to the user. */
export class ProviderError extends Error {
  constructor(public userMessage: string) { super(userMessage); }
}

const SYSTEM_PROMPT = (lang: string) =>
  `You are FINGO, a finance assistant for Indian users. Give clear, general financial information, never personalised advice or guaranteed returns. ` +
  `Mention that rules and rates can change and suggest checking official sources or a SEBI-registered advisor for decisions. ` +
  `Reply in ${lang === "hinglish" ? "Hinglish (Hindi written in Roman script mixed with English)" : "English"}. Keep answers clear and well structured.`;

// Set GEMINI_MODEL in .env.local to a model name from Google AI Studio if you want to change it.
const MODEL = () => process.env.GEMINI_MODEL || "gemini-flash-latest";

export async function generateReply(req: ChatRequest, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL()}:generateContent`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT(req.language) }] },
        contents: req.messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      }),
    });
  } catch {
    throw new ProviderError("Couldn't reach the Gemini service. Check your internet connection.");
  }
  if (!res.ok) {
    if (res.status === 400 || res.status === 403) throw new ProviderError("Gemini rejected the request. Check that AI_API_KEY in .env.local is correct and the model name is valid.");
    if (res.status === 404) throw new ProviderError("Gemini model not found. Set GEMINI_MODEL in .env.local to a current model name from Google AI Studio.");
    if (res.status === 429) throw new ProviderError("Gemini rate limit reached. Wait a minute and try again.");
    throw new ProviderError(`Gemini returned an error (${res.status}). Please try again.`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("").trim();
  if (!text) throw new ProviderError("Gemini returned no answer for this message. Try rephrasing it.");
  return text;
}
