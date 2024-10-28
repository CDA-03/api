import { filterProduct } from "./services/filterProduct"
import { sortProduct } from "./services/sortProduct"
import { calculTotalProduct } from "./services/calculTotalProduct"

import 'dotenv/config'

console.log(process.env.PRECISION)

import { products, orders } from "./Data/fakeProducts"

console.log(filterProduct(products, "Electronics"));

console.log( sortProduct(products) )
console.log( sortProduct(products, false) )


console.log( calculTotalProduct(orders) )