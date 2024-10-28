"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortProduct = sortProduct;
function sortProduct(products, ascending = true) {
    const sens = ascending ? 1 : -1;
    return products.sort((a, b) => sens * (a.price - b.price));
}
