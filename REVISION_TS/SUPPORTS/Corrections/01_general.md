### Exercice 1 : Filtrer des produits par catégorie
Créez une interface `Product` avec les propriétés `name` (string), `price` (number), et `category` (string). Écrivez une fonction `filterByCategory` qui prend un tableau de produits et une catégorie, et retourne les produits correspondant à cette catégorie.

**Correction :**
```typescript
interface Product {
  name: string;
  price: number;
  category: string;
}

function filterByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

const products: Product[] = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Shirt", price: 20, category: "Clothing" },
  { name: "Phone", price: 500, category: "Electronics" }
];

console.log(filterByCategory(products, "Electronics"));
```

---

### Exercice 2 : Tri de produits
Créez une fonction `sortProductsByPrice` qui prend un tableau de produits et un booléen `ascending`. La fonction doit trier les produits par prix en fonction de l'ordre (ascendant ou descendant) spécifié.

**Correction :**
```typescript
function sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
  return products.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
}

console.log(sortProductsByPrice(products, false)); // tri décroissant
```

---

### Exercice 3 : Calculer le total d'une commande
Créez une interface `OrderItem` avec `product` (de type `Product`) et `quantity` (number). Écrivez une fonction `calculateTotal` qui prend un tableau d'items et retourne le montant total de la commande.

**Correction :**
```typescript
interface OrderItem {
  product: Product;
  quantity: number;
}

function calculateTotal(orderItems: OrderItem[]): number {
  return orderItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

const order: OrderItem[] = [
  { product: { name: "Laptop", price: 1000, category: "Electronics" }, quantity: 1 },
  { product: { name: "Shirt", price: 20, category: "Clothing" }, quantity: 3 }
];

console.log(calculateTotal(order)); // 1060
```

---

### Exercice 4 : Gestion de stock
Créez une interface `StockItem` avec `product` et `stock` (nombre d'unités disponibles). Écrivez une fonction `isInStock` qui prend une `StockItem` et une quantité souhaitée et retourne `true` si la quantité est en stock, sinon `false`.

**Correction :**
```typescript
interface StockItem {
  product: Product;
  stock: number;
}

function isInStock(stockItem: StockItem, quantity: number): boolean {
  return stockItem.stock >= quantity;
}

const stockItem: StockItem = { product: { name: "Laptop", price: 1000, category: "Electronics" }, stock: 10 };
console.log(isInStock(stockItem, 5)); // true
```

---

### Exercice 5 : Groupement de produits par catégorie
Écrivez une fonction `groupByCategory` qui prend un tableau de `Product` et retourne un objet où chaque clé est une catégorie et la valeur est un tableau de produits dans cette catégorie.

**Correction :**
```typescript
function groupByCategory(products: Product[]): Record<string, Product[]> {
  return products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
}

console.log(groupByCategory(products));
```

---

### Exercice 6 : Mise à jour du stock
Créez une fonction `updateStock` qui prend un tableau de `StockItem` et un objet `{ productName: string, quantity: number }` pour mettre à jour le stock en soustrayant la quantité indiquée.

**Correction :**
```typescript
function updateStock(stockItems: StockItem[], update: { productName: string, quantity: number }): StockItem[] {
  return stockItems.map(item => 
    item.product.name === update.productName 
      ? { ...item, stock: item.stock - update.quantity }
      : item
  );
}

const stockItems: StockItem[] = [{ product: { name: "Laptop", price: 1000, category: "Electronics" }, stock: 10 }];
console.log(updateStock(stockItems, { productName: "Laptop", quantity: 2 }));
```

---

### Exercice 7 : Filtrer et trier les produits
Écrivez une fonction `filterAndSortProducts` qui prend un tableau de `Product`, un prix minimum et un booléen `ascending`. La fonction doit filtrer les produits au-dessus du prix minimum et les trier en fonction du booléen `ascending`.

**Correction :**
```typescript
function filterAndSortProducts(products: Product[], minPrice: number, ascending: boolean = true): Product[] {
  return products
    .filter(product => product.price >= minPrice)
    .sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
}

console.log(filterAndSortProducts(products, 100, false));
```

---

### Exercice 8 : Calcul de remise
Écrivez une fonction `applyDiscount` qui prend un tableau de `Product` et un pourcentage de remise. La fonction doit retourner un nouveau tableau où le prix de chaque produit est réduit du pourcentage indiqué.

**Correction :**
```typescript
function applyDiscount(products: Product[], discountPercent: number): Product[] {
  return products.map(product => ({
    ...product,
    price: product.price * (1 - discountPercent / 100)
  }));
}

console.log(applyDiscount(products, 10)); // réduction de 10%
```

---

### Exercice 9 : Vérifier les stocks
Créez une fonction `checkStock` qui prend un tableau de `OrderItem` et un tableau de `StockItem`. La fonction doit retourner `true` si tous les produits de la commande sont en stock avec les quantités demandées, sinon `false`.

**Correction :**
```typescript
function checkStock(orderItems: OrderItem[], stockItems: StockItem[]): boolean {
  return orderItems.every(orderItem => {
    const stockItem = stockItems.find(item => item.product.name === orderItem.product.name);
    return stockItem ? stockItem.stock >= orderItem.quantity : false;
  });
}

console.log(checkStock(order, stockItems));
```

---

### Exercice 10 : Fonction de conversion de devises
Créez une fonction `convertPrices` qui prend un tableau de `Product` et un taux de conversion (nombre), puis retourne un nouveau tableau de produits avec les prix convertis.

**Correction :**
```typescript
function convertPrices(products: Product[], conversionRate: number): Product[] {
  return products.map(product => ({
    ...product,
    price: product.price * conversionRate
  }));
}

console.log(convertPrices(products, 1.2)); // conversion avec un taux de 1.2
```
