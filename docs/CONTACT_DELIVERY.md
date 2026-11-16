# Remise des demandes

Destinataire : syabettan@gmail.com, dans `src/config/site.ts`.

## Deux files

| File                       | Nature                                 | Données                                                                                                 | Transmission                                    |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Devis VOLT                 | Simulation de l’électricien fictif     | Prestation, lieu, horizon. Aucun nom, téléphone ou e-mail.                                              | Rien ne part. Le texte final le dit.            |
| Présentation ou diagnostic | Demande réelle sur la création de site | Nom, entreprise, e-mail, téléphone facultatif, site facultatif, message facultatif, offre ou situation. | `mailto` ouvert dans la messagerie du visiteur. |

Le site ne possède pas de prestataire d’e-mail. Il ne peut donc pas confirmer un envoi. Le statut dit : « Votre application de messagerie devrait s’ouvrir. Tant que le message ne part pas de votre messagerie, la demande n’est pas transmise. »

Si la messagerie ne s’ouvre pas, la phrase donne l’adresse. Le pied de page la propose aussi en lien direct.

## Ce qui est refusé

Un e-mail mal formé, un nom ou une entreprise trop courts, des balises, un téléphone incomplet, un site illisible, une offre inconnue pour une présentation, un diagnostic « j’ai déjà un site » sans adresse. Le pot de miel rempli bloque la préparation. Le message d’erreur ne dit pas « envoyé ».

## Données

Rien n’est enregistré par le site. La page confidentialité le dit, ainsi que le fait que les événements de parcours restent dans le navigateur.

Un envoi depuis le serveur demanderait un expéditeur vérifié, des identifiants hors du dépôt, une information sur la conservation et une limite de fréquence. Ces pièces ne sont pas en place.
