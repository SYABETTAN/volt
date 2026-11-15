export function stripControls(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const invisible =
      code <= 0x1f ||
      code === 0x7f ||
      (code >= 0x200b && code <= 0x200f) ||
      (code >= 0x202a && code <= 0x202e) ||
      (code >= 0x2060 && code <= 0x2069) ||
      code === 0xfeff;
    if (!invisible) result += char;
  }
  return result;
}

export function sanitizeBrandName(value: string, maxGraphemes = 32): string {
  const cleaned = stripControls(value.normalize("NFC"))
    .replace(/[<>&"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const segmenter = new Intl.Segmenter("fr", { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(cleaned)].map((part) => part.segment);
  return graphemes.slice(0, maxGraphemes).join("");
}
