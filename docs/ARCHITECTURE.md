# Architecture

Site statique Astro 7. Le JavaScript client se limite à un module, `src/scripts/ui.ts`, chargé par `Base.astro` : menus, aperçu de marque, devis simulé, lightbox et préparation d’e-mail.

## Flux de données

`src/config/site.ts` assemble les données et appelle `assertValidDeployment`. Un build ou un `astro check` échoue si la configuration contredit son mode.

```text
src/data/*          contenu éditorial
src/config/site.ts  assemblage et mode
src/lib/deployment  règles demo / client
src/components/*    présentation
src/pages/*         routes
```

Les pages importent les composants. Les composants lisent `site`. Ils n’inventent pas de deuxième source de prix, d’avis ou de zone.

## Modes

`demo`

- Indexation `noindex`
- Pastilles de fiction visibles
- Devis électricien simulé, sans coordonnées
- Appel « Je veux un site comme celui-ci »
- Aucune donnée structurée d’entreprise
- Demande de création de site via `mailto`

`client`

- Pastilles retirées
- Appel commercial retiré
- Textes juridiques fournis par le client, d’au moins 200 caractères, sans espace réservé
- Raison sociale et e-mail d’entreprise
- Avis, chiffres, projets et certifications absents ou explicitement vérifiés
- Devis `mailto` ou endpoint HTTPS, jamais simulé
- `LocalBusiness` / `Electrician` uniquement si une adresse réelle est publiée et que le mode est indexable

Le validateur regarde chaque collection. Un avis encore `fictional: true` bloque le mode client, même si `mode` vaut `"client"`.

## Rendu

Sortie statique. Pas de React, pas de CMS, pas de base. Les images locales passent par `astro:assets` (WebP, `srcset`). L’image du héros utilise `priority`.

Les pages légales affichent le texte de démonstration, ou les paragraphes de `site.legal` uniquement lorsque `mode === "client"` et `clientSupplied` est vrai.

## En-têtes

`vercel.json` envoie `noindex`, une CSP sans `unsafe-inline` et les protections de cadrage. Le composant `Base` envoie la même politique robots. Un test unitaire vérifie que les deux restent alignés tant que le dépôt est en démonstration.

Pour un client indexable, il faut changer la configuration, retirer `X-Robots-Tag: noindex` de `vercel.json` et définir `PUBLIC_SITE_URL`. Le validateur ne réécrit pas `vercel.json` tout seul : le test d’en-têtes doit être adapté dans le même changement, afin qu’un oubli reste visible.

## Scripts client

Aucune donnée de personnalisation n’est écrite dans `localStorage`. Les noms passent par `textContent` après `sanitizeBrandName`. Les couleurs d’accent sont une liste fermée, appliquée avec `data-accent` sur `<html>`.
