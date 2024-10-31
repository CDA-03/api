import { filterProduct } from "./services/filterProduct"
import { sortProduct } from "./services/sortProduct"
import { calculTotalProduct } from "./services/calculTotalProduct"
import { isInStockProduct } from "./services/isInStockProduct"
import { groupProductByCategory  } from "./services/groupProductByCategory"
import { products, orders, stockItem } from "./Data/fakeProducts"


console.log(process.env.PRECISION)

console.log(filterProduct(products, "Electronics"));

console.log( sortProduct(products) )
console.log( sortProduct(products, false) )

console.log( calculTotalProduct(orders) )

console.log( isInStockProduct(stockItem, 2))
console.log( isInStockProduct(stockItem, 20))

console.log( groupProductByCategory(products))
