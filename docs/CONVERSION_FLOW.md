# Parcours de conversion

Deux conversations, un seul mécanisme : un `mailto` préparé dans le navigateur.

## Parcours principal — présentation

1. Le visiteur voit VOLT et la mention d’entreprise fictive.
2. « Visualiser mon futur site » ouvre l’aperçu.
3. Le nom et la couleur changent tout de suite. « Revenir à VOLT » annule.
4. Si le nom n’est plus VOLT, « Je veux mon site » apparaît.
5. Le même bouton existe en bas de page, dans le menu et dans le pied de page, pour qui ne passe pas par l’aperçu.
6. Le dialogue montre VOLT Acquisition locale, les deux autres formules repliées, les étapes, les délais visés, la garantie et les trois aides.
7. « Préparer la demande de présentation » ouvre la messagerie. Le statut dit que rien n’est transmis tant que la messagerie n’envoie pas.

Le devis jaune « Simuler un devis » reste le geste de la démonstration électricien. Il ne collecte aucune coordonnée.

## Parcours secondaire — diagnostic

« Diagnostic gratuit » ouvre un dialogue séparé. La personne indique si elle a déjà un site. S’il y a un site, l’adresse est obligatoire. Le texte dit qu’aucun score n’est calculé et qu’aucun audit automatique n’a eu lieu. Les trois points sont le sujet de l’échange à venir, pas un résultat déjà produit.

## Événements

Émis sur `window` sous le nom `volt:commerce`, sans cookie et sans envoi :

`demo_viewed`, `personalization_started`, `personalization_completed`, `commercial_offer_opened`, `package_selected`, `diagnostic_requested`, `presentation_requested`, `contact_submit_success`, `contact_submit_error`.

Le détail ne garde pas d’e-mail, d’URL, de longue suite de chiffres, de nom ou de message. Rien n’est encore transmis à un outil de mesure. Brancher un outil plus tard devra passer par une information dans la page confidentialité.

## Mode client

`showAgencyCta` et le mode démo commandent l’affichage. Un site client validé n’affiche ni le bandeau, ni les dialogues, ni les événements commerciaux de cette démonstration.
