"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnorePlugin = void 0;
const binding_1 = require("@rspack/binding");
const zod_1 = require("../../compiled/zod");
const validate_1 = require("../util/validate");
const base_1 = require("./base");
const IgnorePluginOptions = zod_1.z.union([
    zod_1.z.object({
        contextRegExp: zod_1.z.instanceof(RegExp).optional(),
        resourceRegExp: zod_1.z.instanceof(RegExp)
    }),
    zod_1.z.object({
        checkResource: zod_1.z.function(zod_1.z.tuple([zod_1.z.string(), zod_1.z.string()]), zod_1.z.boolean())
    })
]);
exports.IgnorePlugin = (0, base_1.create)(binding_1.BuiltinPluginName.IgnorePlugin, (options) => {
    (0, validate_1.validate)(options, IgnorePluginOptions);
    return options;
});
