export type SiteMode = "demo" | "client";
export type IndexingPolicy = "noindex" | "index";
export type QuoteFlow = "simulated" | "mailto" | "endpoint";
export type InquiryDelivery = "mailto" | "endpoint";

export interface NavigationItem {
  href: string;
  label: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  summary: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: ProjectImage;
  alt: string;
  illustrative: boolean;
  rightsConfirmed: boolean;
}

export type ProjectImage =
  "ouvert" | "escalier" | "facade" | "suspension" | "borne" | "detail";

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  fictional: boolean;
  verified: boolean;
}

export interface SampleStat {
  id: string;
  value: string;
  label: string;
  fictional: boolean;
  verified: boolean;
}

export interface CertificationSlot {
  id: string;
  title: string;
  summary: string;
  documented: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PackageOffer {
  id: "essentiel" | "acquisition" | "croissance";
  name: string;
  creationPrice: number;
  monthlyPrice: number;
  summary: string;
  includes: string[];
  featured: boolean;
}

export interface BusinessProfile {
  brand: string;
  descriptor: string;
  cityLabel: string;
  legalName?: string;
  siret?: string;
  email?: string;
  phone?: string;
  address?: string;
  publishAddress: boolean;
}

export interface LegalCopy {
  clientSupplied: boolean;
  privacy: string;
  mentions: string;
}

export interface InquiryConfig {
  recipient: string;
  delivery: InquiryDelivery;
  endpoint?: string;
}

export interface SiteConfig {
  mode: SiteMode;
  indexing: IndexingPolicy;
  showFictionLabels: boolean;
  showAgencyCta: boolean;
  quoteFlow: QuoteFlow;
  taxLabel: string;
  priceExclusions: string;
  business: BusinessProfile;
  inquiry: InquiryConfig;
  legal: LegalCopy;
  navigation: NavigationItem[];
  services: Service[];
  projects: Project[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  stats: SampleStat[];
  certifications: CertificationSlot[];
  faqs: FaqItem[];
  packages: PackageOffer[];
  zones: {
    city: string;
    arrondissements: string[];
    communes: string[];
    note: string;
  };
}
