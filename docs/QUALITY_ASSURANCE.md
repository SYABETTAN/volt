# Assurance qualité

Les mesures de laboratoire ci-dessous sont complétées après exécution locale. Elles ne sont pas des données de terrain (CrUX). Objectifs visés : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 en conditions réelles ; Lighthouse mobile proche de 95 / 100 / 100 / 95. Un écart est noté ici plutôt que masqué.

## Contrôles automatiques

- `pnpm typecheck`
- `pnpm lint`
- `pnpm format:check`
- `pnpm test` — configuration, sanitation, mailto, contraste, noindex
- `pnpm test:e2e` — navigation, menu mobile, personnalisation, offres, devis simulé, lightbox clavier, débordement, axe-core
- `pnpm lighthouse` — mobile, une passe, via `@lhci/cli`

Le flux `.github/workflows/quality.yml` rejoue typecheck, lint, format, tests unitaires, build et Playwright. Il n’a pas le droit d’écrire dans le dépôt.

## Contrôles manuels encore utiles

- Zoom du texte à 200 % sur la page réelle
- VoiceOver ou TalkBack sur le dialogue et le menu
- Un vrai appareil iOS et Android, au-delà de WebKit et Chromium headless
- Le comportement de l’application Mail au clic sur `mailto`, qui dépend de la machine

## Résultats mesurés le 15 novembre 2026

Mesures de laboratoire, sur la machine de développement, contre `astro preview` en local. Ce ne sont pas des données de terrain CrUX. L’INP réel n’est pas mesuré ici : le laboratoire donne un Total Blocking Time de 0 ms et un Max Potential FID de 20 ms.

Lighthouse 12.6.1, une passe, mobile émulé (412×823, facteur 1,75), méthode `simulate`, Chrome headless. URL : `http://127.0.0.1:4323/`. Les drapeaux `HttpsUpgrades` et `HttpsFirstBalancedModeAutoEnable` sont désactivés uniquement pour laisser Chrome ouvrir le serveur HTTP local. Ils ne s’appliquent pas à une publication HTTPS.

| Catégorie        | Score |
| ---------------- | ----- |
| Performance      | 99    |
| Accessibilité    | 100   |
| Bonnes pratiques | 100   |
| SEO              | 66    |

Métriques de la même passe : FCP 1,4 s, LCP 1,9 s, Speed Index 1,4 s, TBT 0 ms, CLS 0,035.

Le SEO est à 66 parce que l’audit `is-crawlable` échoue. C’est le `noindex` exigé pour l’entreprise fictive. Les autres audits SEO automatiques de cette passe sont au vert. Retirer le `noindex` pour gonfler le score serait contraire au cadrage. En mode client indexable, cet audit n’a plus de raison d’échouer.

Lighthouse signale aussi des ressources qui bloquent le rendu (environ 410 ms estimées) et des images un peu larges (environ 44 à 79 Kio estimés). Le score de performance reste à 99.

`pnpm check` : typecheck sans erreur (un indice sur la signature dépréciée de `tseslint.config`), lint propre, Prettier propre, 11 tests unitaires passés, build statique réussi.

`pnpm test:e2e` : 36 tests passés, 9 ignorés volontairement, 0 échec. Projets Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5) et Mobile Safari (iPhone 13). Le menu mobile ne s’exécute que sur les projets mobiles. Le débordement horizontal et axe-core ne s’exécutent que sur Chromium et Mobile Chrome. axe-core n’a relevé aucune violation sur ces deux projets.
