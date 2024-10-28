import { OrderItem } from "../types/OrderItem";

const precision: string = process.env.API_PRECISION || '100'

export function calculTotalProduct(products: OrderItem[]): number {

    return products.reduce(
        (total, item) => Math.floor(item.product.price * item.quantity * parseInt(precision)) / parseInt(precision), 0
    )
}
