"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareRuntimePlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("../builtin-plugin/base");
const compilerSet = new WeakSet();
function isSingleton(compiler) {
    return compilerSet.has(compiler);
}
function setSingleton(compiler) {
    compilerSet.add(compiler);
}
class ShareRuntimePlugin extends base_1.RspackBuiltinPlugin {
    constructor(enhanced = false) {
        super();
        this.enhanced = enhanced;
        this.name = binding_1.BuiltinPluginName.ShareRuntimePlugin;
    }
    raw(compiler) {
        if (isSingleton(compiler))
            return;
        setSingleton(compiler);
        return (0, base_1.createBuiltinPlugin)(this.name, this.enhanced);
    }
}
exports.ShareRuntimePlugin = ShareRuntimePlugin;
