export default function Logo({ size = 32, showWord = true }: { size?: number; showWord?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgb(var(--brand))" /><stop offset="1" stopColor="rgb(var(--accent))" /></linearGradient></defs>
        <rect width="32" height="32" rx="9" fill="url(#fg)" />
        <path d="M11 24V9h10M11 16h7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="22.5" cy="22.5" r="2.2" fill="#fff" />
      </svg>
      {showWord && <span className="font-display text-xl font-bold tracking-tight">FINGO</span>}
    </div>
  );
}
