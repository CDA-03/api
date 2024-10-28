import { filter } from "./services/filterProduct"
import { products } from "./Data/fakeProducts";
import { sortProduct } from "./services/sortProduct";

console.log(filter(products, "Electronics"));

console.log( sortProduct(products) )
console.log( sortProduct(products, false) )