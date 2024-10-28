"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockItem = exports.orders = exports.products = void 0;
// données typées
exports.products = [
    { name: "Laptop", price: 1000.99, category: "Electronics" },
    { name: "Shirt", price: 20.29, category: "Clothing" },
    { name: "Phone", price: 500.78, category: "Electronics" }
];
exports.orders = [
    { product: exports.products[0], quantity: 10 },
    { product: exports.products[0], quantity: 8 },
    { product: exports.products[1], quantity: 6 },
    { product: exports.products[2], quantity: 7 },
];
exports.stockItem = {
    product: exports.products[0], stock: 10
};
