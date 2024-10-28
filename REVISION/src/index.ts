import { filterProduct } from "./services/filterProduct"
import { sortProduct } from "./services/sortProduct"
import { calculTotalProduct } from "./services/calculTotalProduct"
import { isInStockProduct } from "./services/isInStockProduct"

console.log(process.env.PRECISION)

import { products, orders, stockItem } from "./Data/fakeProducts"

console.log(filterProduct(products, "Electronics"));

console.log( sortProduct(products) )
console.log( sortProduct(products, false) )

console.log( calculTotalProduct(orders) )

console.log( isInStockProduct(stockItem, 2))
console.log( isInStockProduct(stockItem, 20))