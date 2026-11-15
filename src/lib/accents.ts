export interface AccentPreset {
  id: string;
  label: string;
  value: string;
}

export const ACCENT_PRESETS = [
  { id: "volt", label: "Volt", value: "#e4f34a" },
  { id: "cuivre", label: "Cuivre", value: "#e7cba7" },
  { id: "sauge", label: "Sauge", value: "#d7e2cc" },
  { id: "ardoise", label: "Ardoise", value: "#d5dde6" },
  { id: "terre", label: "Terre", value: "#ead0be" },
] as const satisfies readonly AccentPreset[];

export type AccentId = (typeof ACCENT_PRESETS)[number]["id"];

export function isAccentId(value: string): value is AccentId {
  return ACCENT_PRESETS.some((preset) => preset.id === value);
}

export function accentValue(id: string): string {
  const match = ACCENT_PRESETS.find((preset) => preset.id === id);
  return match?.value ?? ACCENT_PRESETS[0].value;
}
