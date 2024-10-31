"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupProductByCategory = groupProductByCategory;
function groupProductByCategory(products) {
    return products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
    }, {});
}
