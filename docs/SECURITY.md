# Sécurité et données

## Ce que le site ne fait pas

- Pas de cookie, pas de mesure d’audience, pas de script tiers
- Pas de stockage de la personnalisation
- Pas d’envoi serveur du devis électricien
- Pas de secret dans Git (voir `.env.example`)
- Pas de redirection ouverte : les URL saisies dans le formulaire ne sont pas visitées
- Pas de HTML injecté : le nom affiché passe par `textContent`

## En-têtes

`vercel.json` : `Content-Security-Policy` sans `unsafe-inline`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`, `X-Robots-Tag: noindex`.

Le HTML généré ne contient pas de balise `<style>` ni d’attribut `style`. Les variantes d’accent sont des classes.

## Formulaire de création de site

Validation partagée entre Vitest et le navigateur (`src/lib/inquiry.ts`) : longueurs, e-mail, téléphone optionnel, site optionnel, offre connue, consentement. Les retours ligne et les caractères de contrôle sont retirés du corps du `mailto` pour limiter l’injection d’en-têtes.

Un champ caché sert de pot de miel. S’il est rempli, aucun `mailto` n’est ouvert. Ce n’est pas une protection suffisante pour un futur endpoint : celui-ci devra limiter le débit et vérifier l’origine.

Le message d’état dit que la messagerie devrait s’ouvrir. Il ne dit jamais que le message a été envoyé par le site.

## Endpoint futur

Ne l’ajoutez pas avec une clé dans le dépôt. Il faut un expéditeur vérifié, des identifiants dans l’hébergeur, un accord de traitement et une durée de conservation écrite dans la page confidentialité du client. Sans cela, le repli `mailto` reste le comportement honnête.

## Dépendances

`pnpm install` vérifie la politique de chaîne d’approvisionnement du lockfile. Dependabot ouvre des mises à jour hebdomadaires. Le flux GitHub Actions n’a que `contents: read`.
