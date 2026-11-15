# VOLT — Électricité Paris

Site de démonstration d’une entreprise d’électricité fictive, et modèle réutilisable pour un vrai client. La racine `/` ouvre directement la vitrine. Il n’y a pas de site d’agence.

VOLT n’est pas une entreprise immatriculée. Les chantiers, avis, chiffres et certifications sont des exemples de présentation.

## Prérequis

- Node.js 22.23.4 ou plus récent
- pnpm 11.8.0 (`packageManager` dans `package.json`)

```bash
pnpm install
pnpm dev
```

Le site local est servi sur `http://127.0.0.1:4321`.

## Scripts

| Script            | Rôle                                              |
| ----------------- | ------------------------------------------------- |
| `pnpm dev`        | Développement                                     |
| `pnpm build`      | Génération statique dans `dist/`                  |
| `pnpm preview`    | Prévisualisation du build                         |
| `pnpm typecheck`  | `astro check`                                     |
| `pnpm lint`       | ESLint                                            |
| `pnpm format`     | Prettier                                          |
| `pnpm test`       | Tests unitaires Vitest                            |
| `pnpm test:e2e`   | Playwright (Chromium, Firefox, WebKit, mobile)    |
| `pnpm lighthouse` | Audit Lighthouse sur le build                     |
| `pnpm check`      | Typecheck, lint, format, tests unitaires et build |

Les tests de bout en bout attendent un `pnpm build` préalable : Playwright lance `astro preview`.

## Contenu fictif

La configuration publiée est dans `src/config/site.ts`. Elle impose le mode `demo` : pastilles de fiction, `noindex`, devis simulé et appel à la création de site. Le validateur refuse de transformer ce contenu en affirmations vérifiées avec un simple booléen.

## Réutiliser le modèle

Voir `docs/TEMPLATE_USAGE.md`. Le mode `client` ne se construit que si l’identité légale, les textes juridiques et l’absence de contenu fictif sont réellement renseignés.

## Contact

- Devis électricien : simulation, aucune donnée n’est envoyée.
- Demande de site : ouvre la messagerie de la personne vers `syabettan@gmail.com`. Ce n’est pas un envoi par le serveur. Voir `docs/CLIENT_CONVERSION.md`.

## Dépôt et déploiement

Dépôt privé prévu : `SYABETTAN/volt-electricien-demo`. Déploiement : `docs/VERCEL_DEPLOYMENT.md`. Le site fictif doit rester `noindex`. Ne le publiez pas sur un plan Vercel Hobby s’il sert à la prospection commerciale.

## Documentation

- `docs/ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CONTENT_GUIDELINES.md`
- `docs/TEMPLATE_USAGE.md`
- `docs/QUALITY_ASSURANCE.md`
- `docs/SECURITY.md`
- `docs/VERCEL_DEPLOYMENT.md`
- `docs/CLIENT_CONVERSION.md`
- `docs/ASSET_LICENSES.md`

Le code source est privé. Aucune licence open source n’est accordée.
