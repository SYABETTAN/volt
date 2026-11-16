# Déploiement Vercel

Le projet est un site statique Astro. Réglage attendu : framework Astro, commande `pnpm build`, dossier `dist`.

## Avant de publier

1. Le dépôt GitHub public `SYABETTAN/volt` est la source.
2. L’hébergement retenu pour l’instant est l’équipe Hobby « Samuel Abettan's projects », projet nommé `volt`. Le plan Hobby reste limité à un usage personnel non commercial dans les conditions Vercel ; ce choix est explicite et temporaire.
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

## Publication du 15 novembre 2026

Équipe « Samuel Abettan's projects » (`team_m6s5ebPCh7y7ubDmVfpfN6NV`), plan Hobby, projet `volt` (`prj_SQrfreXXyuw0gTIrL4JEtMix65mP`). Déploiement de production `dpl_3Ld35BwRtVF3gNLm7KpQ3B1nS25j`, commit `7a6327d31728654b4d2aac0bd4cbe626c1669287`.

URL à envoyer : https://volt-paris-project.vercel.app

Vérifié : HTTPS, réponse 200 sans authentification, mention « Site de démonstration — entreprise fictive. », en-tête `X-Robots-Tag: noindex, nofollow, noarchive`. L’authentification Vercel ne s’applique qu’aux previews. `volt.vercel.app` et `volt-paris.vercel.app` sont déjà pris par d’autres sites.

## Publication du 16 novembre 2026

Déploiement de production `dpl_5ygfYffhmApEnh93YBKatHdw2FNC`, commit `e5ca2dc57db6d5b04f00e878bea104d91f396599`, alias `volt-paris-project.vercel.app`. Canonique et image Open Graph présents. Dialogues centrés et opaques. Aucune erreur console ni requête en échec relevée sur la page d’accueil. `PUBLIC_SITE_URL` n’est pas définie dans Vercel : l’origine de la démo est écrite dans le code.
