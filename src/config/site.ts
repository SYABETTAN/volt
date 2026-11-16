import { certifications } from "../data/certifications";
import { faqs } from "../data/faq";
import { navigation } from "../data/navigation";
import { packages, priceExclusions, taxLabel } from "../data/packages";
import { process } from "../data/process";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { stats } from "../data/stats";
import { testimonials } from "../data/testimonials";
import { zones } from "../data/zones";
import { assertValidDeployment } from "../lib/deployment";
import type { SiteConfig } from "../types/content";

export const DEMO_ORIGIN = "https://volt-paris-project.vercel.app";
export const DISCLAIMER = "Site de démonstration — entreprise fictive.";
export const FICTION_REVIEWS = "Avis fictifs — exemples de présentation";
export const FICTION_STATS = "Chiffres fictifs — exemples de mise en page";
export const CERTIFICATION_LABEL = "Certifications réelles à renseigner";

const demoSite: SiteConfig = {
  mode: "demo",
  indexing: "noindex",
  showFictionLabels: true,
  showAgencyCta: true,
  quoteFlow: "simulated",
  taxLabel,
  priceExclusions,
  business: {
    brand: "VOLT",
    descriptor: "Électricité Paris",
    cityLabel: "Paris",
    publishAddress: false,
  },
  inquiry: {
    recipient: "syabettan@gmail.com",
    delivery: "mailto",
  },
  legal: {
    clientSupplied: false,
    privacy: "",
    mentions: "",
  },
  navigation,
  services,
  projects,
  process,
  testimonials,
  stats,
  certifications,
  faqs,
  packages,
  zones,
};

export const site = assertValidDeployment(demoSite);
