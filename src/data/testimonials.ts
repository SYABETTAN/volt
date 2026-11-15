import type { Testimonial } from "../types/content";

export const testimonials: Testimonial[] = [
  {
    id: "exemple-claire",
    quote:
      "Le devis était lisible. Nous avons compris quelles pièces étaient concernées avant de donner notre accord.",
    author: "Claire M.",
    context: "Appartement",
    fictional: true,
    verified: false,
  },
  {
    id: "exemple-julien",
    quote:
      "Le tableau a été repris sans promesse excessive. On nous a surtout expliqué ce qui changeait dans l’installation.",
    author: "Julien R.",
    context: "Maison",
    fictional: true,
    verified: false,
  },
  {
    id: "exemple-amina",
    quote:
      "L’éclairage du séjour a été proposé avec deux options. Le choix est resté le nôtre, et le résultat est calme.",
    author: "Amina B.",
    context: "Rénovation",
    fictional: true,
    verified: false,
  },
];
