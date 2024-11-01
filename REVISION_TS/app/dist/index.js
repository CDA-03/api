"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterProduct_1 = require("./services/filterProduct");
const sortProduct_1 = require("./services/sortProduct");
const calculTotalProduct_1 = require("./services/calculTotalProduct");
const isInStockProduct_1 = require("./services/isInStockProduct");
const groupProductByCategory_1 = require("./services/groupProductByCategory");
const fakeProducts_1 = require("./Data/fakeProducts");
console.log(process.env.PRECISION);
console.log((0, filterProduct_1.filterProduct)(fakeProducts_1.products, "Electronics"));
console.log((0, sortProduct_1.sortProduct)(fakeProducts_1.products));
console.log((0, sortProduct_1.sortProduct)(fakeProducts_1.products, false));
console.log((0, calculTotalProduct_1.calculTotalProduct)(fakeProducts_1.orders));
console.log((0, isInStockProduct_1.isInStockProduct)(fakeProducts_1.stockItem, 2));
console.log((0, isInStockProduct_1.isInStockProduct)(fakeProducts_1.stockItem, 20));
console.log((0, groupProductByCategory_1.groupProductByCategory)(fakeProducts_1.products));
