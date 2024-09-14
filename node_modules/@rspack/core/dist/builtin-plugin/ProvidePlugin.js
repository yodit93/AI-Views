"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvidePlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.ProvidePlugin = (0, base_1.create)(binding_1.BuiltinPluginName.ProvidePlugin, (provide) => {
    const entries = Object.entries(provide).map(([key, value]) => {
        if (typeof value === "string") {
            value = [value];
        }
        return [key, value];
    });
    return Object.fromEntries(entries);
});
