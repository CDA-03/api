"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculTotalProduct = calculTotalProduct;
const precision = process.env.API_PRECISION || '100';
function calculTotalProduct(products) {
    return products.reduce((total, item) => Math.floor(item.product.price * item.quantity * parseInt(precision)) / parseInt(precision), 0);
}
