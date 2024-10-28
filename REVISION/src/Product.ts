// définit le type 
export interface Product{
    name: string;
    price: number;
    category: string;
}

// fonction typée
export function filter(products : Product[], category : string): Product[]{

    return products.filter(p => p.category == category)
}

// données typées
export const products: Product[] = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shirt", price: 20, category: "Clothing" },
    { name: "Phone", price: 500, category: "Electronics" }
  ];
 