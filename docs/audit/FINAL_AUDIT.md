# Audit final — 16 novembre 2026

Les captures d’avant correction sont dans `docs/audit/before/`. Les captures de la production corrigée sont dans `docs/audit/after/`.

## Corrections

| ID     | Gravité | Problème                                                       | Correction                                                                                     | Vérification                                                                                                                                                    | Statut   |
| ------ | ------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| AUD-01 | P1      | Dialogues collés en haut à gauche, ouverture trop transparente | `margin: auto`, fond opaque, défilement du dialogue, animation `both`                          | Production, Chromium : menu 390 px à x 20 / y 189, fond opaque. Offres 1 440 px à x 256, largeur 928. Captures `after/menu-390.png` et `after/offers-1440.png`. | FIXED    |
| AUD-02 | P1      | Pas de canonique ni d’image Open Graph                         | En mode démo, origine `https://volt-paris-project.vercel.app` si `PUBLIC_SITE_URL` est absente | HTML de production : canonique et `og:image` sur cette origine. `noindex` et `X-Robots-Tag` inchangés.                                                          | FIXED    |
| AUD-03 | P2      | Le bouton le plus fort du héros est le devis fictif            | Lien texte « Je veux un site comme celui-ci » sous les deux boutons, distinct du jaune         | Visible dès le premier écran à 320 et 390 px. Il ouvre le dialogue des offres. axe-core local : 0 violation.                                                    | FIXED    |
| AUD-04 | P2      | Offre principale au milieu sur mobile                          | `order: -1` sous 62 rem, ordre d’origine au-dessus                                             | Production 390 px : Acquisition locale en premier (y 311). À 1 440 px, les trois cartes restent alignées, Acquisition au centre.                                | FIXED    |
| AUD-05 | P3      | Marges larges à 1 920 px                                       | Aucune. La mesure de lecture est volontaire.                                                   | Captures `home-1920-viewport.png`.                                                                                                                              | DEFERRED |

## Mesures de laboratoire

Même méthode que le 15 novembre : Lighthouse 12.6.1, une passe, mobile émulé 412×823, méthode `simulate`, preview locale `http://127.0.0.1:4323/`. Ce ne sont pas des données de terrain. L’INP réel n’est pas mesuré. Le laboratoire donne un TBT de 0 ms et un Max Potential FID de 20 ms.

|                  | 15 novembre | 16 novembre |
| ---------------- | ----------- | ----------- |
| Performance      | 99          | 99          |
| Accessibilité    | 100         | 100         |
| Bonnes pratiques | 100         | 100         |
| SEO              | 66          | 69          |
| LCP              | 1,9 s       | 1,8 s       |
| CLS              | 0,035       | 0,035       |
| FCP              | 1,4 s       | 1,4 s       |
| Speed Index      | 1,4 s       | 1,4 s       |
| TBT              | 0 ms        | 0 ms        |

Le SEO reste sous 90 parce que `is-crawlable` échoue sur le `noindex`. Le passage de 66 à 69 correspond à l’ajout de l’URL canonique. Une seule passe de chaque côté : l’écart de 0,1 s sur le LCP est dans le bruit d’une mesure unique.

## Tests

`pnpm check` : typecheck sans erreur, lint propre, Prettier propre, 11 tests unitaires, build statique.

`pnpm test:e2e` : 37 réussis, 13 ignorés, 0 échec. Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari. Les ignorés sont le menu hors mobile, le débordement et axe hors Chromium, et le centrage du dialogue hors Chromium.

## Sécurité et référencement

Pas de nouveau script tiers, pas de cookie, pas de schéma LocalBusiness. Le `noindex` est conservé. L’origine canonique de la démo est publique et déjà utilisée comme adresse du site. Un client réel continue de passer par `PUBLIC_SITE_URL` : sans cette variable, le mode client ne reprend pas l’adresse de VOLT.

La variable d’environnement Vercel n’a pas pu être créée par l’API du connecteur (403). Le build de démo n’en dépend plus.

## Production

Déploiement `dpl_5ygfYffhmApEnh93YBKatHdw2FNC`, commit `e5ca2dc57db6d5b04f00e878bea104d91f396599`, alias https://volt-paris-project.vercel.app. HTTPS 200, sans mur d’authentification. Débordement horizontal mesuré à 0 de 320 à 1 920 px. Aucune erreur de console ni réponse HTTP en échec sur l’accueil. Le nom « Électricité Martin » remplace VOLT dans l’en-tête sans injection HTML. La simulation de devis affiche qu’aucune demande n’est envoyée.

## Limites

- VoiceOver, zoom 200 % et vrais téléphones ne sont pas rejoués.
- Le formulaire de création de site ouvre toujours la messagerie. Aucun envoi serveur n’a été ajouté.
- Les photos restent des visuels d’illustration, déjà étiquetés.
