export const card = "rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]";

export const label = "mb-1.5 block text-[13px] font-medium text-ink-soft";

export const field =
  "mb-4 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent-soft";

export const buttonPrimary =
  "gradient-plum inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(58,27,61,0.55)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface-sunken disabled:opacity-50";

export const buttonGhost =
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink";

export const pageTitle = "text-[20px] font-semibold text-ink";
export const sectionTitle = "text-[14px] font-semibold text-ink";

export function badge(tone: "neutral" | "accent" | "mist" | "danger" = "neutral") {
  const tones = {
    neutral: "bg-surface-sunken text-ink-soft",
    accent: "bg-accent-soft text-accent-soft-ink",
    mist: "bg-mist-soft text-ink-soft",
    danger: "bg-danger-soft text-danger",
  };
  return `inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`;
}
