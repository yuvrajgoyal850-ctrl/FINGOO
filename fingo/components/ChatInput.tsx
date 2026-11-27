"use client";
import { useRef, useState } from "react";
import { ArrowUp, FileText, Paperclip, X, Info } from "lucide-react";
import { UI } from "@/lib/content";
import type { Language } from "@/lib/types";

const ACCEPT = ".pdf,.doc,.docx,.txt";

export default function ChatInput({ language, loading, onSend }: { language: Language; loading: boolean; onSend: (t: string) => void }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const t = UI[language];

  const submit = () => {
    const v = text.trim();
    if (!v || loading) return;
    onSend(v);
    setText(""); setFiles([]);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      {files.length > 0 && (
        <div className="mb-2 rounded-xl border border-accent/50 bg-accent/10 p-2 text-sm">
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <span key={f.name + i} className="flex items-center gap-1.5 rounded-lg bg-surface px-2 py-1">
                <FileText className="h-4 w-4 text-brand" />{f.name}
                <button aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-3.5 w-3.5" /></button>
              </span>
            ))}
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-muted"><Info className="mt-0.5 h-4 w-4 shrink-0" />
            Document processing isn&apos;t set up yet. Attached files will not be read or sent. You can still send your question.</p>
        </div>
      )}
      <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 shadow-sm focus-within:border-brand">
        <input ref={fileRef} type="file" accept={ACCEPT} multiple hidden
          onChange={(e) => { setFiles((p) => [...p, ...Array.from(e.target.files || [])]); e.target.value = ""; }} />
        <button aria-label="Attach a PDF or document" onClick={() => fileRef.current?.click()}
          className="rounded-xl p-2 text-muted transition hover:bg-bg hover:text-ink"><Paperclip className="h-5 w-5" /></button>
        <textarea value={text} rows={1} placeholder={t.placeholder} aria-label="Message"
          onChange={(e) => { setText(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px"; }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
          className="max-h-40 flex-1 resize-none bg-transparent py-2 outline-none placeholder:text-muted" />
        <button aria-label="Send message" onClick={submit} disabled={!text.trim() || loading}
          className="rounded-xl bg-brand p-2 text-white transition enabled:hover:opacity-90 disabled:opacity-40 dark:text-bg">
          {loading ? <span className="block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <ArrowUp className="h-5 w-5" />}
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-muted">{t.disclaimer}</p>
    </div>
  );
}
