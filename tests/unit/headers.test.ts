import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { site } from "../../src/config/site";

describe("en-têtes de démonstration", () => {
  it("aligne le noindex du dépôt avec le mode publié", () => {
    const vercel = JSON.parse(readFileSync("vercel.json", "utf8")) as {
      headers: { headers: { key: string; value: string }[] }[];
    };
    const robots = vercel.headers
      .flatMap((group) => group.headers)
      .find((header) => header.key === "X-Robots-Tag");
    expect(site.indexing).toBe("noindex");
    expect(robots?.value).toContain("noindex");
    const csp = vercel.headers
      .flatMap((group) => group.headers)
      .find((header) => header.key === "Content-Security-Policy");
    expect(csp?.value).toContain("default-src 'self'");
    expect(csp?.value).not.toContain("unsafe-inline");
  });
});
