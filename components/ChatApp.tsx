"use client";
import { useCallback, useEffect, useState } from "react";
import { Menu, Moon, Plus, Sun } from "lucide-react";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import SettingsModal from "./SettingsModal";
import Logo from "./Logo";
import { loadChats, saveChats, uid } from "@/lib/storage";
import { sendChat, ChatApiError } from "@/lib/chatApi";
import type { Chat, Language, Message, TopicId } from "@/lib/types";

export default function ChatApp() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingTopic, setPendingTopic] = useState<TopicId | undefined>();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [dark, setDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load saved state once on the client
  useEffect(() => {
    setChats(loadChats());
    setDark(document.documentElement.classList.contains("dark"));
    setLanguage((localStorage.getItem("fingo:lang") as Language) || "en");
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => { setIsMobile(mq.matches); setSidebarOpen(!mq.matches); };
    apply(); mq.addEventListener("change", apply);
    setReady(true);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => { if (ready) saveChats(chats); }, [chats, ready]);

  const setTheme = (d: boolean) => { setDark(d); document.documentElement.classList.toggle("dark", d); localStorage.setItem("fingo:theme", d ? "dark" : "light"); };
  const changeLang = (l: Language) => { setLanguage(l); localStorage.setItem("fingo:lang", l); };

  const active = chats.find((c) => c.id === activeId) || null;
  const topic = active ? active.topic : pendingTopic;
  const closeIfMobile = () => isMobile && setSidebarOpen(false);

  const newChat = () => { setActiveId(null); setPendingTopic(undefined); closeIfMobile(); };
  const pickTopic = (t: TopicId) => { setActiveId(null); setPendingTopic(t); closeIfMobile(); };
  const select = (id: string) => { setActiveId(id); closeIfMobile(); };
  const remove = (id: string) => { setChats((cs) => cs.filter((c) => c.id !== id)); if (id === activeId) setActiveId(null); };
  const clearAll = () => { setChats([]); setActiveId(null); };

  const send = useCallback(async (text: string) => {
    const userMsg: Message = { id: uid(), role: "user", content: text, createdAt: Date.now() };
    let chatId = activeId;
    let history: Message[] = active ? active.messages : [];
    if (!chatId) {
      chatId = uid();
      const chat: Chat = { id: chatId, title: text.slice(0, 40), topic: pendingTopic, messages: [userMsg], updatedAt: Date.now() };
      setChats((cs) => [chat, ...cs]); setActiveId(chatId);
    } else {
      setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, userMsg], updatedAt: Date.now() } : c)));
    }
    const id = chatId;
    const push = (m: Message) => setChats((cs) => cs.map((c) => (c.id === id ? { ...c, messages: [...c.messages, m], updatedAt: Date.now() } : c)));
    setLoading(true);
    try {
      const reply = await sendChat({
        messages: [...history, userMsg].filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
        language, topic: active ? active.topic : pendingTopic,
      });
      push({ id: uid(), role: "assistant", content: reply, createdAt: Date.now() });
    } catch (e) {
      const msg = e instanceof ChatApiError ? e.message : "Something went wrong. Please try again.";
      push({ id: uid(), role: "assistant", content: msg, error: true, createdAt: Date.now() });
    } finally { setLoading(false); }
  }, [active, activeId, language, pendingTopic]);

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar open={sidebarOpen} isMobile={isMobile} language={language} chats={chats} activeId={activeId} activeTopic={topic}
        onClose={() => setSidebarOpen(false)} onNewChat={newChat} onTopic={pickTopic} onSelect={select} onDelete={remove} onSettings={() => { setSettingsOpen(true); closeIfMobile(); }} />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            {!sidebarOpen && <button aria-label="Open sidebar" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-surface"><Menu className="h-5 w-5" /></button>}
            {!sidebarOpen && <Logo size={26} />}
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="New chat" onClick={newChat} className="rounded-lg p-2 hover:bg-surface"><Plus className="h-5 w-5" /></button>
            <button aria-label="Toggle light and dark mode" onClick={() => setTheme(!dark)} className="rounded-lg p-2 hover:bg-surface">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {active && active.messages.length > 0
            ? <MessageList messages={active.messages} loading={loading} />
            : <Welcome language={language} topic={topic} onPick={send} />}
        </div>
        <ChatInput language={language} loading={loading} onSend={send} />
      </main>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} dark={dark} onTheme={setTheme} language={language} onLanguage={changeLang} onClear={clearAll} />
    </div>
  );
}
