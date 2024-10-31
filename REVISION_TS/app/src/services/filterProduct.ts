import { Product } from "../types/TypeProduct";


// fonction typée
export function filterProduct(products : Product[], category : string): Product[]{

    return products.filter(p => p.category == category)
}
