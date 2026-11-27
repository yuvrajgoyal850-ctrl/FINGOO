export type Language = "en" | "hinglish";
export type Role = "user" | "assistant";
export interface Message { id: string; role: Role; content: string; error?: boolean; createdAt: number; }
export interface Chat { id: string; title: string; topic?: TopicId; messages: Message[]; updatedAt: number; }
export type TopicId = "tools" | "schemes" | "banking" | "investments" | "insurance" | "tax" | "stocks" | "news" | "education";
export interface ChatRequest { messages: { role: Role; content: string }[]; language: Language; topic?: TopicId; }
export interface ChatResponse { reply?: string; code?: string; message?: string; }
