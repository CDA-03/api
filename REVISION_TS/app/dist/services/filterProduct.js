"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProduct = filterProduct;
// fonction typée
function filterProduct(products, category) {
    return products.filter(p => p.category == category);
}
