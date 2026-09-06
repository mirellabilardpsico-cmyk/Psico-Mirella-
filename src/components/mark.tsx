export function Mark({ className, tone = "accent" }: { className?: string; tone?: "accent" | "ivory" }) {
  const ring = tone === "accent" ? "var(--accent)" : "rgba(248, 241, 230, 0.55)";
  const dot = tone === "accent" ? "var(--accent)" : "#f8f1e6";

  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="18.5" stroke={ring} strokeOpacity="0.35" />
      <circle cx="20" cy="20" r="12.5" stroke={ring} strokeOpacity="0.7" />
      <circle cx="20" cy="20" r="4" fill={dot} />
    </svg>
  );
}
