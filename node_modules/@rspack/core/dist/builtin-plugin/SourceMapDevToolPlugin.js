"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapDevToolPlugin = void 0;
const binding_1 = require("@rspack/binding");
const ModuleFilenameHelpers_1 = require("../lib/ModuleFilenameHelpers");
const base_1 = require("./base");
exports.SourceMapDevToolPlugin = (0, base_1.create)(binding_1.BuiltinPluginName.SourceMapDevToolPlugin, (options) => {
    const { test, include, exclude, ...rest } = options;
    const rawOptions = rest;
    if (test || include || exclude) {
        rawOptions.test = text => (0, ModuleFilenameHelpers_1.matchObject)({ test, include, exclude }, text);
    }
    return rawOptions;
}, "compilation");
