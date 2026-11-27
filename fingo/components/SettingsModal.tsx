"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import type { Language } from "@/lib/types";

interface Props { open: boolean; onClose: () => void; dark: boolean; onTheme: (dark: boolean) => void; language: Language; onLanguage: (l: Language) => void; onClear: () => void; }

export default function SettingsModal(p: Props) {
  const seg = (active: boolean) => `flex-1 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-brand text-white dark:text-bg" : "hover:bg-bg"}`;
  return (
    <AnimatePresence>
      {p.open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={p.onClose}>
          <motion.div role="dialog" aria-label="Settings" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.96, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }}
            className="w-full max-w-sm rounded-2xl border border-line bg-surface p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-bold">Settings</h2>
              <button aria-label="Close settings" onClick={p.onClose}><X className="h-5 w-5" /></button></div>
            <p className="mb-1.5 text-sm text-muted">Theme</p>
            <div className="mb-4 flex gap-1 rounded-xl border border-line p-1">
              <button className={seg(!p.dark)} onClick={() => p.onTheme(false)}><Sun className="mr-1 inline h-4 w-4" />Light</button>
              <button className={seg(p.dark)} onClick={() => p.onTheme(true)}><Moon className="mr-1 inline h-4 w-4" />Dark</button>
            </div>
            <p className="mb-1.5 text-sm text-muted">Language</p>
            <div className="mb-4 flex gap-1 rounded-xl border border-line p-1">
              <button className={seg(p.language === "en")} onClick={() => p.onLanguage("en")}>English</button>
              <button className={seg(p.language === "hinglish")} onClick={() => p.onLanguage("hinglish")}>Hinglish</button>
            </div>
            <button onClick={() => { if (confirm("Delete all chats on this device?")) { p.onClear(); p.onClose(); } }}
              className="w-full rounded-xl border border-line px-3 py-2 text-sm text-red-600 hover:bg-bg dark:text-red-400">Clear all chat history</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
