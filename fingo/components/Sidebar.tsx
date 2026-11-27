"use client";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, PanelLeftClose, Plus, Settings, Trash2 } from "lucide-react";
import Logo from "./Logo";
import { TOPICS, UI } from "@/lib/content";
import type { Chat, Language, TopicId } from "@/lib/types";

interface Props {
  open: boolean; isMobile: boolean; language: Language; chats: Chat[]; activeId: string | null; activeTopic?: TopicId;
  onClose: () => void; onNewChat: () => void; onTopic: (t: TopicId) => void; onSelect: (id: string) => void;
  onDelete: (id: string) => void; onSettings: () => void;
}

export default function Sidebar(p: Props) {
  const t = UI[p.language];
  const body = (
    <div className="flex h-full w-72 flex-col border-r border-line bg-surface">
      <div className="flex items-center justify-between p-4">
        <Logo />
        <button aria-label="Close sidebar" onClick={p.onClose} className="rounded-lg p-1.5 text-muted hover:bg-bg"><PanelLeftClose className="h-5 w-5" /></button>
      </div>
      <div className="px-3">
        <button onClick={p.onNewChat} className="flex w-full items-center gap-2 rounded-xl bg-brand px-3 py-2.5 font-medium text-white transition hover:opacity-90 dark:text-bg">
          <Plus className="h-5 w-5" />{t.newChat}
        </button>
      </div>
      <nav className="mt-3 space-y-0.5 px-3" aria-label="Topics">
        {TOPICS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => p.onTopic(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-bg ${p.activeTopic === id ? "bg-bg font-medium text-brand" : "text-ink"}`}>
            <Icon className="h-[18px] w-[18px]" />{label}
          </button>
        ))}
      </nav>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-3">
        <h2 className="px-3 pb-1 text-xs font-medium text-muted">{t.history}</h2>
        {p.chats.length === 0 && <p className="px-3 py-2 text-sm text-muted">{t.empty}</p>}
        {p.chats.map((c) => (
          <div key={c.id} className={`group flex items-center rounded-lg hover:bg-bg ${c.id === p.activeId ? "bg-bg" : ""}`}>
            <button onClick={() => p.onSelect(c.id)} className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm">
              <MessageSquare className="h-4 w-4 shrink-0 text-muted" /><span className="truncate">{c.title}</span>
            </button>
            <button aria-label={`Delete chat ${c.title}`} onClick={() => p.onDelete(c.id)} className="mr-2 rounded p-1 text-muted opacity-100 hover:text-ink md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t border-line p-3">
        <button onClick={p.onSettings} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-bg"><Settings className="h-[18px] w-[18px]" />Settings</button>
      </div>
    </div>
  );

  if (p.isMobile) {
    return (
      <AnimatePresence>
        {p.open && (
          <>
            <motion.div key="scrim" className="fixed inset-0 z-30 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose} />
            <motion.aside key="drawer" className="fixed inset-y-0 left-0 z-40" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.22 }}>{body}</motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }
  return (
    <motion.aside initial={false} animate={{ width: p.open ? 288 : 0 }} transition={{ type: "tween", duration: 0.22 }} className="shrink-0 overflow-hidden">{body}</motion.aside>
  );
}
