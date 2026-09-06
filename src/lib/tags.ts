const PALETTE = [
  { bar: "#BD7C4F", soft: "#F1E2D3", ink: "#8A5A37" }, // terracota cobre
  { bar: "#6B4770", soft: "#EDE3EE", ink: "#5A3A5E" }, // ameixa clara
  { bar: "#8F7993", soft: "#EFE9F0", ink: "#6E5B72" }, // lilás bruma escuro
  { bar: "#A9873F", soft: "#F0E7D3", ink: "#7C632E" }, // cobre dourado
  { bar: "#5E7A6B", soft: "#E4EBE6", ink: "#465D51" }, // verde-sálvia (apoio, neutro quente)
];

export function tagColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
