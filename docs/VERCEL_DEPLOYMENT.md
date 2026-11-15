# Déploiement Vercel

Le projet est un site statique Astro. Réglage attendu : framework Astro, commande `pnpm build`, dossier `dist`.

## Avant de publier

1. Le dépôt GitHub `SYABETTAN/volt-electricien-demo` doit être la source.
2. Le compte Vercel doit être un plan Pro ou Enterprise. Le plan Hobby est réservé à un usage personnel non commercial. Cette démonstration sert à la prospection : ne pas la publier sur Hobby.
3. Ne pas acheter de domaine ni d’option payante sans accord explicite.
4. Ne pas coller de secret dans le dépôt. `PUBLIC_SITE_URL` peut être ajouté dans Vercel après la première URL réelle, puis le site reconstruit pour les liens canoniques.

## Après une URL réelle

1. Renseigner `PUBLIC_SITE_URL=https://…` dans l’environnement Production et Preview.
2. Relancer un déploiement.
3. Vérifier HTTPS, la mention « entreprise fictive », la balise `noindex`, le dialogue des offres et le `mailto`.
4. Les previews GitHub suivent les branches si le projet Vercel est relié au dépôt. Éviter un second pipeline qui déploierait le même commit autrement.

## Revenir en arrière

Dans le tableau Vercel du projet : Deployments, choisir le déploiement précédent sain, Promote to Production. Le commit Git correspondant reste la référence. Ne pas forcer l’historique pour « annuler » un déploiement.

## Alertes de dépense

Sur un plan Pro, activer une alerte de budget dans les réglages de facturation de l’équipe, au seuil que vous jugez acceptable. Ce dépôt ne peut pas créer cette alerte à votre place.

## Si l’authentification ou le plan bloque

Ne pas basculer vers un autre hébergeur en silence. Noter l’étape exacte : connexion CLI, équipe, plan, ou droit de créer un projet.

## Constat du 15 novembre 2026

La CLI Vercel 54.6.1 est connectée au compte `syabettan-8423`. La seule équipe accessible est « Samuel Abettan's projects » (`team_m6s5ebPCh7y7ubDmVfpfN6NV`, rôle OWNER). Son plan facturé est `hobby` (`planIteration: legacy`, statut `active`, `createdDirectToHobby: true`). Aucun projet nommé `volt-electricien-demo` n’existe sur cette équipe.

Aucun déploiement n’a été lancé. Publier cette démonstration commerciale sur Hobby irait contre les conditions d’usage. Pour continuer : passer cette équipe en Pro, ou donner accès à une équipe Pro ou Enterprise déjà payée, puis importer le dépôt GitHub avec la commande `pnpm build` et le dossier `dist`. Ne pas acheter le plan depuis cet outillage sans un accord explicite.
