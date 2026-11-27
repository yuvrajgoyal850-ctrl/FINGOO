import type { Chat } from "./types";
const KEY = "fingo:chats";
export function loadChats(): Chat[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveChats(chats: Chat[]) {
  try { localStorage.setItem(KEY, JSON.stringify(chats.slice(0, 50))); } catch { /* storage full or blocked */ }
}
export const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
