"use client";
import { motion } from "framer-motion";
import AIOrb from "./AIOrb";
import { HOME_PROMPTS, TOPICS, UI } from "@/lib/content";
import type { Language, TopicId } from "@/lib/types";

export default function Welcome({ language, topic, onPick }: { language: Language; topic?: TopicId; onPick: (t: string) => void }) {
  const t = UI[language];
  const topicInfo = TOPICS.find((x) => x.id === topic);
  const prompts = topicInfo ? topicInfo.prompts : HOME_PROMPTS[language];
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <AIOrb size={72} />
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {topicInfo ? `${topicInfo.label}: what would you like to know?` : t.title}
      </motion.h1>
      <p className="mt-2 text-muted">{t.sub}</p>
      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {prompts.map((p) => (
          <button key={p} onClick={() => onPick(p)}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-left text-sm transition hover:border-brand hover:shadow-md active:scale-[0.99]">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
