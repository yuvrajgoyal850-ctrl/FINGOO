import AIOrb from "./AIOrb";
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="FINGO is typing">
      <AIOrb size={28} />
      <div className="flex gap-1.5 rounded-2xl bg-surface border border-line px-4 py-3">
        <span className="dot h-2 w-2 rounded-full bg-muted" /><span className="dot h-2 w-2 rounded-full bg-muted" /><span className="dot h-2 w-2 rounded-full bg-muted" />
      </div>
    </div>
  );
}
