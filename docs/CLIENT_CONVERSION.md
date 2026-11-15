# Création de site — parcours prospect

Le bandeau et le bouton « Je veux un site comme celui-ci » n’appartiennent pas à VOLT. Ils ouvrent un dialogue qui rappelle que l’électricien est fictif, montre trois offres, puis prépare un e-mail.

## Offres

Source unique : `src/data/packages.ts`.

| Offre              | Création | Mensuel      | Rôle                                                                                     |
| ------------------ | -------- | ------------ | ---------------------------------------------------------------------------------------- |
| Essentiel          | 790 €    | 49 € / mois  | Jusqu’à 3 pages, contact, SEO technique de base, maintenance de base                     |
| Acquisition locale | 1 290 €  | 99 € / mois  | Offre principale. Jusqu’à 6 pages, prestations, projets, devis, SEO local initial, suivi |
| Croissance         | 1 990 €  | 199 € / mois | Jusqu’à 10 pages, contenus, conversion, reporting, accompagnement                        |

`taxLabel` et `priceExclusions` sont dans le même fichier. Aucun classement, trafic ou volume de demandes n’est garanti. Le domaine, la publicité, les services tiers et le sur-mesure sont à part.

## Destinataire

`site.inquiry.recipient` : `syabettan@gmail.com`.

Le bouton « Préparer l’e-mail » construit un lien `mailto:` dans le navigateur. Si rien ne s’ouvre, la personne écrit directement à cette adresse. Le pied de page et le bandeau proposent aussi le lien nu, utilisable sans JavaScript.

## Ce qui reste à configurer pour un envoi direct

Un prestataire d’e-mail transactionnel, un expéditeur vérifié, les identifiants hors Git, une mention d’information, une durée de conservation et une limitation de débit. Tant que ces éléments n’existent pas, le site ne simule pas un succès d’envoi.
