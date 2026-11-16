# Audit de conversion — 16 novembre 2026

Baseline visuelle : `docs/audit/after/`, production du matin, commit `708c387`. Nouvelles captures locales : `docs/conversion/`.

Le site d’électricien était déjà crédible. La couche commerciale existait, mais elle proposait trois offres au même niveau, un bouton « Je veux un site comme celui-ci » et un formulaire unique. Elle ne montrait ni le déroulement, ni une garantie bornée, ni un diagnostic distinct.

## KEEP

| Élément                                                         | Preuve                                  | Pourquoi                                                                 |
| --------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| Hero électricien, prestations, projets, zone, FAQ, devis simulé | Rendu production et tests de navigation | C’est la démonstration. La retirer affaiblirait la preuve.               |
| Mention « Site de démonstration — entreprise fictive »          | Visible dans le bandeau, test e2e       | Elle empêche de vendre une entreprise imaginaire.                        |
| Avis, chiffres et projets déjà étiquetés fictifs                | Composants existants                    | Ils montrent une mise en page. Ils ne servent pas de preuve commerciale. |
| `noindex`, absence de schéma LocalBusiness                      | HTML de production                      | La fiction ne doit pas être indexée comme un commerce.                   |
| `mailto` vers syabettan@gmail.com, sans succès fictif           | `src/lib/inquiry.ts`                    | Aucun prestataire d’envoi n’est configuré.                               |
| Jetons visuels, dialogues centrés                               | Correctif `e5ca2dc`                     | Le cadre premium tient.                                                  |

## IMPROVE

| ID    | Priorité | Constat                                                             | Modification                                                                        | Complexité | Réussite                                                                                 |
| ----- | -------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| CV-01 | P0       | Le premier geste commercial n’était pas « imaginer son site ».      | Bandeau « Vous êtes électricien ? / Visualiser mon futur site ».                    | Faible     | Le bouton est visible à 320 et 390 px.                                                   |
| CV-02 | P0       | Les trois offres avaient le même poids.                             | Acquisition locale seule en plein cadre. Les deux autres sont dans un bloc replié.  | Moyenne    | Le prix 1 290 € et le bouton de choix sont visibles sans ouvrir les autres formules.     |
| CV-03 | P1       | Après le changement de nom, aucune suite.                           | « Vous aimez ce résultat ? » puis « Je veux mon site ».                             | Faible     | Le bouton n’apparaît que si le nom n’est plus VOLT, et disparaît au retour.              |
| CV-04 | P1       | Le formulaire mélangeait nom et entreprise, et exigeait un message. | Nom, entreprise, e-mail, téléphone facultatif, site facultatif, message facultatif. | Moyenne    | Une présentation vide de message est valide. Un e-mail faux bloque sans dire « envoyé ». |

## FIX

| ID    | Priorité | Constat                                                                                   | Correction                                                               |
| ----- | -------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| CV-05 | P1       | La case cochée tenait lieu d’explication sur l’envoi.                                     | Notice visible : la messagerie s’ouvre, le site ne transmet rien.        |
| CV-06 | P2       | Le second lien du hero répétait le bandeau et poussait la photo hors de l’écran à 320 px. | Lien retiré du hero après capture. Le bandeau reste le geste commercial. |

## ADD

| ID    | Priorité | Ajout                                                               | Pourquoi                                                                                          | Réussite                                                          |
| ----- | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| CV-07 | P1       | Quatre étapes « Comment ça marche ».                                | Réduit l’effort perçu, sans promettre que le client n’a rien à fournir.                           | Les quatre titres sont dans le dialogue.                          |
| CV-08 | P1       | Délais visés 72 heures et 7 jours ouvrés, marqués non contractuels. | La capacité réelle n’est pas vérifiée. Le texte le dit.                                           | La phrase « à confirmer sur le devis » est visible.               |
| CV-09 | P1       | Garantie VOLT Sérénité, 30 jours, conformité seulement.             | Périmètre écrit dans la demande du 16 novembre. Pas de remboursement, pas de résultat commercial. | Les exclusions sont dans le même bloc que la promesse.            |
| CV-10 | P1       | Trois aides sans prix barré.                                        | Rédaction initiale, vérification des contacts, guide de traitement des demandes.                  | Aucun montant « offert » n’est affiché.                           |
| CV-11 | P1       | Diagnostic gratuit, sans score.                                     | Deuxième conversation, distincte de la présentation.                                              | Le message préparé dit qu’aucun score n’a été calculé.            |
| CV-12 | P2       | Événements `volt:commerce` locaux.                                  | Prépare une mesure sans cookie ni donnée personnelle.                                             | Le test vérifie qu’un e-mail saisi n’apparaît pas dans le détail. |

## REMOVE

| Élément                                              | Pourquoi                                                                                  |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Bouton de header « Visualiser » en double du bandeau | Le bandeau porte déjà le libellé complet.                                                 |
| Lien mailto séparé dans le bandeau de fin            | Il concurrençait « Je veux mon site ». L’adresse reste dans la notice et le pied de page. |
| Case à cocher comme condition d’envoi                | Elle n’était pas une base légale. L’acte est le bouton qui ouvre la messagerie.           |

## Non fait, volontairement

Pas de paiement, pas de CRM, pas de campagne d’e-mails, pas de score SEO automatique, pas de témoignage client de l’offre, pas de logo de maison de luxe, pas de délai présenté comme garanti.
