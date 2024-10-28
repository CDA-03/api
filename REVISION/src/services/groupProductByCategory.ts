import { Product } from "../types/TypeProduct";

export function groupProductByCategory(products: Product[]): Record<string, Product[]> {
    return products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || []
        acc[product.category].push(product)

        return acc;
    }, {} as Record<string, Product[]>);
}
 