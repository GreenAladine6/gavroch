Améliore le site de pâtisserie existant sans changer son identité visuelle principale. L’objectif est de rendre la page Accueil beaucoup plus riche, attractive et dynamique, tout en permettant à l’administrateur de gérer facilement tout le contenu depuis le Dashboard.

1. Améliorer la page Accueil
La page d’accueil doit donner immédiatement envie de découvrir et commander les produits de la pâtisserie.

Ajouter les sections suivantes :

Hero section élégante avec une grande image de pâtisserie, un titre accrocheur, un court texte et des boutons comme « Découvrir nos pâtisseries » et « Voir les promotions ».
Pâtisseries populaires : afficher les produits marqués comme « populaires » depuis le Dashboard.
Chaque produit populaire doit afficher :
image
nom
courte description
prix
badge « Populaire »
éventuellement une promotion
bouton pour voir les détails
Promotions du moment : afficher clairement les produits actuellement en promotion.
Ajouter un badge visuel « Promo », avec l’ancien prix barré et le nouveau prix.
Nos spécialités : présenter différentes catégories de produits comme gâteaux, viennoiseries, tartes, pâtisseries, boissons, etc.
Nos locaux / boutiques : afficher les différents locaux de la pâtisserie avec photo, nom, adresse, horaires et bouton « Voir le local ».
Ajouter une section « Pourquoi nous choisir ? » avec quelques avantages : produits frais, fabrication artisanale, qualité, livraison, etc.
Ajouter un appel à l’action final pour encourager l’utilisateur à découvrir les produits ou contacter la pâtisserie.
La page doit rester moderne, élégante, premium et cohérente avec le design actuel.

2. Système de produits populaires
Ne pas coder les produits populaires en dur.

Dans le Dashboard, l’administrateur doit pouvoir :

ajouter un produit
modifier un produit
supprimer un produit
modifier son nom, image, description et prix
choisir sa catégorie
activer/désactiver le statut « Populaire »
activer/désactiver une promotion
définir le prix promotionnel
choisir si le produit apparaît sur la page d’accueil
Lorsqu’un administrateur marque un produit comme Populaire, il doit automatiquement apparaître dans la section « Pâtisseries populaires » de l’Accueil.

Lorsqu’il désactive « Populaire », le produit doit disparaître automatiquement de cette section.

3. Gestion des promotions
Créer dans le Dashboard une gestion simple des promotions.

L’administrateur doit pouvoir :

activer une promotion sur un produit
définir le prix avant promotion
définir le prix après promotion
définir éventuellement une date de début et de fin
activer ou désactiver la promotion
Les promotions actives doivent automatiquement apparaître dans la section « Promotions du moment » de l’Accueil.

4. Gestion des locaux / boutiques
Ajouter une fonctionnalité complète permettant à l’administrateur de gérer les locaux depuis le Dashboard.

L’administrateur doit pouvoir :

ajouter un nouveau local
modifier un local existant
supprimer un local
modifier le nom du local
ajouter/modifier sa photo
ajouter l’adresse
ajouter les horaires d’ouverture
ajouter le numéro de téléphone
ajouter une description
ajouter éventuellement les coordonnées GPS / localisation Google Maps
activer ou désactiver l’affichage du local sur le site
Les locaux actifs doivent automatiquement apparaître sur la page d’accueil dans la section « Nos locaux ».

Prévoir également une page dédiée permettant de consulter tous les locaux.

5. Dashboard
Améliorer le Dashboard afin qu’il devienne le véritable système de gestion du site.

Créer des sections claires :

Dashboard / Statistiques
Produits
Catégories
Promotions
Produits populaires
Locaux / Boutiques
Contenu de l’Accueil
Dans le Dashboard, l’administrateur doit pouvoir gérer le contenu sans avoir besoin de modifier le code.

6. Contenu dynamique
Important : éviter autant que possible les données hardcodées.

Le site doit fonctionner avec une structure de données permettant de connecter facilement le frontend au backend plus tard.

Prévoir des états :

loading
empty state lorsqu’il n’y a aucun produit populaire
empty state lorsqu’il n’y a aucune promotion
empty state lorsqu’il n’y a aucun local
error state
Si le backend n’est pas encore connecté, créer une architecture propre avec des données mockées facilement remplaçables par une API ou une base de données.

7. Design UX/UI
Conserver le style actuel du site mais améliorer fortement la hiérarchie visuelle.

Utiliser :

cartes produits élégantes
badges « Populaire » et « Promo »
belles images
espaces blancs suffisants
animations légères au hover
boutons avec des CTA clairs
responsive design complet mobile / tablette / desktop
L’Accueil doit paraître comme un vrai site professionnel de pâtisserie et non comme une simple landing page.

8. Priorité
La priorité est :

enrichir l’Accueil avec les produits populaires et les promotions ;
rendre ces contenus entièrement contrôlables depuis le Dashboard ;
ajouter la gestion complète des locaux ;
faire en sorte que toute modification effectuée dans le Dashboard soit automatiquement reflétée sur le site public ;
conserver le design existant et l’améliorer plutôt que de repartir de zéro.
Ne supprime pas les fonctionnalités existantes. Améliore l’architecture actuelle et réutilise les composants existants lorsque cela est pertinent.