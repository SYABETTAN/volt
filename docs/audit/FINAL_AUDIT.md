# Audit final — 16 novembre 2026

Les captures d’avant correction sont dans `docs/audit/before/`. Les captures d’après déploiement seront ajoutées dans `docs/audit/after/` une fois la production revérifiée.

## Corrections

| ID     | Gravité | Problème                                                       | Correction                                                                                     | Vérification                                                                                                                     | Statut   |
| ------ | ------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| AUD-01 | P1      | Dialogues collés en haut à gauche, ouverture trop transparente | `margin: auto`, fond opaque, défilement du dialogue, animation `both`                          | Playwright : le dialogue des offres est visible, opacité > 0,95, `x` > 40 px sur un viewport de 1 280 px. Chromium, 16 novembre. | FIXED    |
| AUD-02 | P1      | Pas de canonique ni d’image Open Graph                         | En mode démo, origine `https://volt-paris-project.vercel.app` si `PUBLIC_SITE_URL` est absente | Test de bout en bout : `link[rel=canonical]` et `og:image` pointent vers cette origine. Le `noindex` reste.                      | FIXED    |
| AUD-03 | P2      | Le bouton le plus fort du héros est le devis fictif            | Lien texte « Je veux un site comme celui-ci » sous les deux boutons, distinct du jaune         | Le bouton ouvre le même dialogue que la barre. axe-core : 0 violation sur Chromium et Mobile Chrome.                             | FIXED    |
| AUD-04 | P2      | Offre principale au milieu sur mobile                          | `order: -1` sous 62 rem, ordre d’origine au-dessus                                             | Contrôle visuel à refaire sur la production. Le style sombre et l’étiquette « Offre principale » sont inchangés.                 | FIXED    |
| AUD-05 | P3      | Marges larges à 1 920 px                                       | Aucune. La mesure de lecture est volontaire.                                                   | Captures `home-1920-viewport.png`.                                                                                               | DEFERRED |

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

## Limites

- VoiceOver, zoom 200 % et vrais téléphones ne sont pas rejoués.
- Le formulaire de création de site ouvre toujours la messagerie. Aucun envoi serveur n’a été ajouté.
- Les photos restent des visuels d’illustration, déjà étiquetés.
