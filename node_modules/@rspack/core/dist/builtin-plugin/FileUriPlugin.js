"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUriPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.FileUriPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.FileUriPlugin, () => { }, "compilation");
