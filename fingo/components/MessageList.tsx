"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { Message } from "@/lib/types";
import AIOrb from "./AIOrb";
import TypingIndicator from "./TypingIndicator";

export default function MessageList({ messages, loading }: { messages: Message[]; loading: boolean }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, loading]);
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
      {messages.map((m) => (
        <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className={m.role === "user" ? "flex justify-end" : "flex items-start gap-3"}>
          {m.role === "assistant" && (m.error ? <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden /> : <AIOrb size={28} />)}
          <div className={
            m.role === "user" ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-white dark:text-bg"
            : m.error ? "max-w-[85%] whitespace-pre-wrap rounded-2xl border border-accent/50 bg-accent/10 px-4 py-2.5"
            : "max-w-[85%] whitespace-pre-wrap rounded-2xl border border-line bg-surface px-4 py-2.5"
          }>{m.content}</div>
        </motion.div>
      ))}
      {loading && <TypingIndicator />}
      <div ref={end} />
    </div>
  );
}
