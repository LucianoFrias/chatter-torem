"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res, next) => {
    return res.status(404).json({ message: "Ups, Torem's not this way..." });
};
exports.notFound = notFound;
