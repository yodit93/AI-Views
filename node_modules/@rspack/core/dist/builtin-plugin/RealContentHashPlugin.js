"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealContentHashPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.RealContentHashPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.RealContentHashPlugin, () => { }, "compilation");
