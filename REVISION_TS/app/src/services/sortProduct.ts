import { Product } from "../types/TypeProduct";

export function sortProduct(products : Product[], ascending : boolean = true): Product[]{
    const sens : number = ascending ? 1 : - 1 
    
    return products.sort((a,b) => sens * (a.price - b.price) )
}