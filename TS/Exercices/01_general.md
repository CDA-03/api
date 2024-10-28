### Exercice 1 : Filtrer des produits par catégorie
Créez une interface `Product` avec les propriétés `name` (string), `price` (number), et `category` (string). Écrivez une fonction `filterByCategory` qui prend un tableau de produits et une catégorie, et retourne les produits correspondant à cette catégorie.

---

### Exercice 2 : Tri de produits
Créez une fonction `sortProductsByPrice` qui prend un tableau de produits et un booléen `ascending`. La fonction doit trier les produits par prix en fonction de l'ordre (ascendant ou descendant) spécifié.

---

### Exercice 3 : Calculer le total d'une commande
Créez une interface `OrderItem` avec `product` (de type `Product`) et `quantity` (number). Écrivez une fonction `calculateTotal` qui prend un tableau d'items et retourne le montant total de la commande.

---

### Exercice 4 : Gestion de stock
Créez une interface `StockItem` avec `product` et `stock` (nombre d'unités disponibles). Écrivez une fonction `isInStock` qui prend une `StockItem` et une quantité souhaitée et retourne `true` si la quantité est en stock, sinon `false`.


---

### Exercice 5 : Groupement de produits par catégorie
Écrivez une fonction `groupByCategory` qui prend un tableau de `Product` et retourne un objet où chaque clé est une catégorie et la valeur est un tableau de produits dans cette catégorie.


---

### Exercice 6 : Mise à jour du stock
Créez une fonction `updateStock` qui prend un tableau de `StockItem` et un objet `{ productName: string, quantity: number }` pour mettre à jour le stock en soustrayant la quantité indiquée.


### Exercice 7 : Filtrer et trier les produits
Écrivez une fonction `filterAndSortProducts` qui prend un tableau de `Product`, un prix minimum et un booléen `ascending`. La fonction doit filtrer les produits au-dessus du prix minimum et les trier en fonction du booléen `ascending`.

---

### Exercice 8 : Calcul de remise
Écrivez une fonction `applyDiscount` qui prend un tableau de `Product` et un pourcentage de remise. La fonction doit retourner un nouveau tableau où le prix de chaque produit est réduit du pourcentage indiqué.


### Exercice 9 : Vérifier les stocks
Créez une fonction `checkStock` qui prend un tableau de `OrderItem` et un tableau de `StockItem`. La fonction doit retourner `true` si tous les produits de la commande sont en stock avec les quantités demandées, sinon `false`.


---

### Exercice 10 : Fonction de conversion de devises
Créez une fonction `convertPrices` qui prend un tableau de `Product` et un taux de conversion (nombre), puis retourne un nouveau tableau de produits avec les prix convertis.
