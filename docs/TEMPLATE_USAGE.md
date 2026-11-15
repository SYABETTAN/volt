# Réutiliser le modèle

1. Dupliquer le dépôt pour le client. Ne pas publier ses informations dans la démonstration VOLT.
2. Remplacer les textes de `src/data/` par des faits vérifiés.
3. Pour chaque avis : `fictional: false` et `verified: true`, avec une source que vous pouvez montrer. Sinon, laissez le tableau vide.
4. Pour chaque projet : `illustrative: false` et `rightsConfirmed: true`, uniquement si les droits de l’image sont acquis. Remplacez les fichiers de `src/assets/photos/`.
5. Pour chaque certification : `documented: true` et le libellé exact. Supprimez les emplacements vides.
6. Renseignez `business.legalName`, `business.email` et, seulement si elle doit être publique, `publishAddress` avec l’adresse réelle.
7. Collez les mentions et la politique fournies par le client dans `legal`, avec `clientSupplied: true`.
8. Passez `mode` à `"client"`, `showFictionLabels` à `false`, `showAgencyCta` à `false`, `quoteFlow` à `"mailto"` ou `"endpoint"`.
9. Lancez `pnpm typecheck`. Le validateur arrête le build si une pièce manque.
10. Si le site doit être indexé : `indexing: "index"`, retirez `noindex` de `vercel.json`, ajoutez `PUBLIC_SITE_URL`, et adaptez `tests/unit/headers.test.ts` dans le même commit.
11. Branchez le devis réel avant la mise en ligne. Un endpoint doit être en HTTPS, avec anti-spam et conservation documentée. Tant que ce n’est pas prêt, `quoteFlow: "mailto"` vers l’e-mail de l’entreprise, avec un libellé qui dit que la messagerie s’ouvre.

Le mode client ne réactive pas l’appel « Je veux un site comme celui-ci ». Ce bandeau appartient à la démonstration commerciale.

Les pages `mentions-legales` et `confidentialite` basculent sur les textes du client dès que le mode et `clientSupplied` sont cohérents. Elles ne conservent pas le texte VOLT en parallèle.
