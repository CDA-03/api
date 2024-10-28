import { StockItem } from "../types/StockItem";

export function isInStockProduct(stockItem : StockItem, quantity : number):boolean{

    return stockItem.stock >= quantity
}