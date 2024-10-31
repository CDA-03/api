"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInStockProduct = isInStockProduct;
function isInStockProduct(stockItem, quantity) {
    return stockItem.stock >= quantity;
}
