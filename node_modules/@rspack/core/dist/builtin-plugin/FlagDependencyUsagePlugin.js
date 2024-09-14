"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagDependencyUsagePlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
exports.FlagDependencyUsagePlugin = (0, base_1.create)(binding_1.BuiltinPluginName.FlagDependencyUsagePlugin, (global) => global, "compilation");
