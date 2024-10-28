import { OrderItem } from "../types/OrderItem";
import { Product } from "../types/TypeProduct";

// données typées
export const products: Product[] = [
    { name: "Laptop", price: 1000.99, category: "Electronics" },
    { name: "Shirt", price: 20.29, category: "Clothing" },
    { name: "Phone", price: 500.78, category: "Electronics" }
  ];
 

export const orders : OrderItem[] = [
    { product :  products[0] , quantity : 10},
    { product : products[0] , quantity : 8},
    { product : products[1] , quantity : 6},
    { product :  products[2] , quantity : 7},
]