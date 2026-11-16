# Audit initial — 16 novembre 2026

Site inspecté : https://volt-paris-project.vercel.app  
Commit alors en production : `90e37c37820f27196896b2f2cf1bba0c1d21c623`  
Branche : `main`, arbre de travail propre, remote `https://github.com/SYABETTAN/volt.git`.  
Projet Vercel existant : `volt` (`prj_SQrfreXXyuw0gTIrL4JEtMix65mP`), équipe Hobby.

Les captures sont dans `docs/audit/before/`. Elles viennent de Playwright Chromium sur l’URL de production, pas d’une maquette.

## Ce qui tient

- La page d’accueil est la vitrine VOLT, en français, sans site d’agence séparé.
- La mention « Site de démonstration — entreprise fictive. » est dans la barre du premier écran, à 320, 390, 768, 1024, 1440 et 1920 px.
- `meta robots` et `X-Robots-Tag` valent `noindex, nofollow, noarchive`.
- Aucun défilement horizontal mesuré à 320, 375, 390, 768, 1024, 1440 et 1920 px.
- Les avis, projets, chiffres et certifications portent déjà leurs étiquettes de fiction.
- Le devis électricien est une simulation. La demande de site prépare un `mailto` vers syabettan@gmail.com et le dit.
- La personnalisation et les trois offres existent. Acquisition locale est marquée « Offre principale ».
- Lighthouse mobile du 15 novembre, en local : performance 99, accessibilité 100, bonnes pratiques 100, SEO 66 à cause du `noindex`. Ce ne sont pas des données de terrain.

## Problèmes vérifiés

### AUD-01 — P1 — Dialogues

Catégorie : interaction, accessibilité.  
Composant : `dialog` dans `src/styles/global.css`, menus et fenêtres d’offres.  
URL : `/`.

Reproduction : ouvrir Menu, Visualiser, ou « Et si ce site devenait le vôtre ? ».

Observé : le dialogue est `position: fixed` avec `margin: 0` et `left: 0`. Mesure sur la production, viewport 390×844, menu ouvert : `top: 0`, `left: 0`, `margin: 0`, fond du dialogue transparent. Le panneau crème couvre seulement le haut de la page. Tailwind, dans sa couche de base, annule la marge automatique du dialogue natif. L’animation d’ouverture part de `opacity: 0` ; une mesure immédiate a donné `0.10`, d’où le texte du menu mêlé au titre de la page sur `menu-390.png`, `offers-390.png` et `offers-1440.png`.

Attendu : un panneau opaque, centré, lisible dès l’ouverture, avec défilement interne s’il est haut.

Impact : le menu mobile et le parcours d’offres, qui est le passage commercial, sont plus difficiles à lire.

### AUD-02 — P1 — Métadonnées de partage

Catégorie : SEO technique, partage.  
Composant : `src/components/Base.astro`, variable `PUBLIC_SITE_URL`.

Observé dans le DOM de production : `link[rel=canonical]` absent, `og:image` absent, `og:url` absent. Le titre et le `noindex` sont présents. `Astro.site` reste vide tant que `PUBLIC_SITE_URL` n’est pas définie au build.

Attendu : une URL canonique HTTPS et une image Open Graph pour le lien envoyé par e-mail, sans lever le `noindex`.

Impact : un aperçu de lien sans image dans la messagerie.

### AUD-03 — P2 — Hiérarchie du premier écran

Catégorie : conversion. Opinion appuyée sur les captures, pas sur un taux de clic.

Observé : à 320 et 390 px, la question commerciale est un lien jaune dans la barre noire. Le bouton le plus visible du héros est « Simuler un devis », qui est le parcours fictif. Les quatre informations demandées sont présentes, mais l’action réelle est plus discrète que la simulation.

Attendu : une action commerciale distincte du devis, dans le premier écran, sans devenir le bouton jaune principal.

### AUD-04 — P2 — Offre principale sur mobile

Catégorie : conversion.  
Observé : dans le code, les offres s’empilent dans l’ordre Essentiel, Acquisition locale, Croissance. L’offre mise en avant est au milieu de la liste.

Attendu : sur un écran étroit, Acquisition locale apparaît en premier. Sur un grand écran, elle reste au centre.

## Non retenus comme défauts

- Les marges latérales à 1920 px viennent de la mesure de lecture (`max` environ 74 rem). Ce n’est pas un débordement.
- Le score SEO 66 du laboratoire vient du `noindex` voulu. Il ne faut pas l’enlever.
- Les textes de prestations sont déjà concrets et prudents. Ils ne sont pas réécrits pour le style.
- Les tests de capture pixel par pixel entre macOS et Ubuntu seraient fragiles. Le contrôle ajouté vérifie la géométrie du dialogue.
