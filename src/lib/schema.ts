import type { SiteConfig } from "../types/content";

export function structuredData(
  config: SiteConfig,
): Record<string, unknown> | null {
  if (
    config.mode !== "client" ||
    config.indexing !== "index" ||
    config.showFictionLabels
  ) {
    return null;
  }
  if (
    !config.business.publishAddress ||
    !config.business.address ||
    !config.business.legalName
  ) {
    return null;
  }
  if (config.testimonials.some((item) => !item.verified || item.fictional))
    return null;
  if (config.certifications.some((item) => !item.documented)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: config.business.legalName,
    email: config.business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.business.address,
    },
  };
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028");
}
