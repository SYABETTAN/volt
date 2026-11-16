# Création de site — parcours prospect

Le bandeau « Visualiser mon futur site » et le bouton « Je veux mon site » n’appartiennent pas à VOLT. Le premier ouvre l’aperçu du nom. Le second ouvre l’offre, puis prépare un e-mail. Le détail commercial est dans `docs/COMMERCIAL_OFFER.md` et `docs/CONVERSION_FLOW.md`.

## Offres

Source unique : `src/data/packages.ts`.

| Offre                   | Création | Mensuel      | Rôle                                                                          |
| ----------------------- | -------- | ------------ | ----------------------------------------------------------------------------- |
| Essentiel               | 790 €    | 49 € / mois  | Jusqu’à 3 pages, contact, mise en ligne, maintenance technique de base        |
| VOLT Acquisition locale | 1 290 €  | 99 € / mois  | Offre principale. Jusqu’à 6 pages, devis, appel, SEO technique initial, suivi |
| Croissance              | 1 990 €  | 199 € / mois | Jusqu’à 10 pages, périmètre Acquisition, ajustements et point mensuel         |

`taxLabel` et `priceExclusions` sont dans le même fichier. Aucun classement, trafic ou volume de demandes n’est garanti. Le domaine, la publicité, les services tiers et le sur-mesure sont à part.

## Destinataire

`site.inquiry.recipient` : `syabettan@gmail.com`.

Les boutons « Préparer la demande de présentation » et « Préparer la demande de diagnostic » construisent un lien `mailto:` dans le navigateur. Si rien ne s’ouvre, la personne écrit directement à cette adresse. Le pied de page garde le lien nu, utilisable sans JavaScript.

## Ce qui reste à configurer pour un envoi direct

Un prestataire d’e-mail transactionnel, un expéditeur vérifié, les identifiants hors Git, une mention d’information, une durée de conservation et une limitation de débit. Tant que ces éléments n’existent pas, le site ne simule pas un succès d’envoi.
