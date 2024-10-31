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

