"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvalDevToolModulePlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.EvalDevToolModulePlugin = (0, base_1.create)(binding_1.BuiltinPluginName.EvalDevToolModulePlugin, (options) => options, "compilation");
