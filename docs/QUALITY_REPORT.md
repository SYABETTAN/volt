# Contrôle du 16 novembre 2026, soir

## Tests

`pnpm check` : types, lint, format, 14 tests unitaires, build. Réussi avant la dernière retouche visuelle. Après cette retouche : build et `pnpm test:e2e`.

`pnpm test:e2e` : 53 réussis, 17 ignorés, 0 échec. Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari. Les ignorés sont les parcours réservés à un seul navigateur ou au mobile.

axe-core sur la page d’accueil : 0 violation, Chromium et Mobile Chrome. Ce n’est pas un audit WCAG complet. VoiceOver, zoom 200 % et téléphones physiques ne sont pas rejoués. Le parcours clavier vérifié : ouverture et fermeture par Échap de l’aperçu, lightbox des projets.

## Performance de laboratoire

Lighthouse 12.6.1, une passe, mobile émulé, preview `http://127.0.0.1:4323/`, 16 novembre 2026 à 17:03 UTC. Ce ne sont pas des données de terrain.

|                  | Matin | Soir  |
| ---------------- | ----- | ----- |
| Performance      | 99    | 99    |
| Accessibilité    | 100   | 100   |
| Bonnes pratiques | 100   | 100   |
| SEO              | 69    | 69    |
| LCP              | 1,8 s | 1,8 s |
| CLS              | 0,035 | 0,036 |
| TBT              | 0 ms  | 0 ms  |

Le SEO reste à 69 à cause du `noindex`. L’écart de CLS est celui d’une passe unique.

## Sécurité constatée dans le code

Pas de nouveau script tiers. Pas de cookie. Les événements `volt:commerce` restent dans la page. Le test « n’inscrit pas l’e-mail dans les événements » a réussi. Le `mailto` refuse les balises. Le pot de miel bloque la préparation.

## Revue par personas

Ce n’est pas un test utilisateur. C’est une lecture du rendu local.

Persona A, artisan sans site. La mention fictive et le bandeau « Vous êtes électricien ? » sont dans le premier écran, y compris à 320 px. Le prix 1 290 € et le bouton de choix sont dans le dialogue, avant la longue liste. Les quatre étapes disent qu’il n’a pas à choisir l’hébergement. Il doit quand même fournir des faits et des photos : la FAQ le dit. Hésitation possible : le dialogue est long, et l’envoi dépend de sa messagerie.

Persona B, société qui a déjà un site. Le diagnostic est un second bouton, pas un score inventé. Il peut coller son adresse. Hésitation possible : rien ne lui montre encore un défaut précis de son site actuel. C’est volontaire.

Persona C, deux minutes. Il voit la qualité de VOLT, le prix principal et un seul bouton de demande. Les autres formules sont repliées. Hésitation possible : pas de rendez-vous réservé dans la page, et pas de preuve client de l’offre. Les deux manques sont assumés.

## Tableau

| Élément                   | Ancien état                             | Nouvel état                                        | Justification                                 | Test                     | Statut |
| ------------------------- | --------------------------------------- | -------------------------------------------------- | --------------------------------------------- | ------------------------ | ------ |
| Bandeau                   | « Et si ce site devenait le vôtre ? »   | « Visualiser mon futur site »                      | Le premier geste est l’aperçu                 | Visible au premier écran | Fait   |
| Aperçu                    | Nom et couleur                          | Suite « Je veux mon site », retirée au retour VOLT | Relie la projection à la demande              | e2e personnalisation     | Fait   |
| Offre                     | Trois cartes égales                     | Acquisition locale dominante                       | Un choix principal                            | e2e offres               | Fait   |
| Diagnostic                | Absent                                  | Demande sans score                                 | Deuxième conversation honnête                 | e2e diagnostic           | Fait   |
| Formulaire                | Nom fusionné, message obligatoire, case | Champs séparés, message facultatif, notice         | Moins d’effort, pas de faux envoi             | e2e et Vitest            | Fait   |
| Délais                    | Absents                                 | Visés, non contractuels                            | Réduire l’attente perçue sans mentir          | Texte dans le dialogue   | Fait   |
| Garantie                  | Absente                                 | 30 jours, conformité seulement                     | Périmètre écrit le 16 novembre                | Texte dans le dialogue   | Fait   |
| Hero commercial en double | Lien sous les boutons                   | Retiré                                             | Il poussait la photo hors de l’écran à 320 px | Capture `home-320.png`   | Fait   |
