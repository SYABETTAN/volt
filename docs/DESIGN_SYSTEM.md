# Système visuel

Direction : papier chaud, encre charbon, un seul accent électrique. La page doit évoquer un studio éditorial, pas une marque de mode et pas un thème d’artisan générique.

## Couleurs

Déclarées dans `src/styles/global.css` avec `@theme` Tailwind 4.

| Jeton                  | Valeur    | Usage                                     |
| ---------------------- | --------- | ----------------------------------------- |
| `--color-paper`        | `#f3f0e8` | Fond                                      |
| `--color-paper-raised` | `#faf8f3` | Cartes                                    |
| `--color-ink`          | `#1a1916` | Texte                                     |
| `--color-muted`        | `#4a453f` | Texte secondaire                          |
| `--color-charcoal`     | `#171614` | Barre, chiffres, pied de page             |
| `--color-line`         | `#ddd6c8` | Filets                                    |
| `--color-accent`       | `#e4f34a` | Bouton principal, filet, lien sur charbon |
| `--color-danger`       | `#8c2f2f` | Erreurs, jamais seules                    |

L’accent n’est pas utilisé comme texte sur le papier. Sur le charbon, il sert au lien de la barre et aux grands chiffres. Les cinq aperçus (`volt`, `cuivre`, `sauge`, `ardoise`, `terre`) sont testés à 4,5:1 avec l’encre et avec le charbon.

## Typographie

Polices auto-hébergées, SIL Open Font License, latin :

- Fraunces Variable pour les titres
- Outfit Variable pour l’interface et le texte

`font-display: swap`. Pas de feuille Google Fonts.

## Composition

- Conteneur `min(74rem, 100% - marge)`
- Hero en deux colonnes à partir de 62 rem
- Prestations en filets, pas en cartes à icônes
- Réalisations : une image haute à gauche, les suivantes en appui
- Chiffres sur fond charbon, avec leur mention fictive au-dessus
- Boutons à coins droits, hauteur minimale 44 px
- Focus visible : contour encre, ou accent sur fond sombre

## Mouvement

Transitions de 160 ms sur les boutons. Fondu court à l’ouverture d’un dialogue. `prefers-reduced-motion: reduce` supprime animations, transitions et défilement fluide.

## États

- Primaire : fond accent, texte encre, assombrissement léger au survol
- Fantôme : filet, inversion au survol
- Dialogue natif `<dialog>` : piège de focus du navigateur, fermeture Échap et clic sur le fond
- Erreurs de formulaire : texte, `aria-invalid`, `role="alert"` ou `role="status"`
