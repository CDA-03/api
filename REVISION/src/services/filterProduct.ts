import { Product } from "../types/TypeProduct";


// fonction typée
export function filter(products : Product[], category : string): Product[]{

    return products.filter(p => p.category == category)
}
