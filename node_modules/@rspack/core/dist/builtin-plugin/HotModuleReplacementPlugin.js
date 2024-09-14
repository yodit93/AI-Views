"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotModuleReplacementPlugin = void 0;
const binding_1 = require("@rspack/binding");
const base_1 = require("./base");
class HotModuleReplacementPlugin extends base_1.RspackBuiltinPlugin {
    constructor() {
        super(...arguments);
        this.name = binding_1.BuiltinPluginName.HotModuleReplacementPlugin;
    }
    raw(compiler) {
        if (compiler.options.output.strictModuleErrorHandling === undefined) {
            compiler.options.output.strictModuleErrorHandling = true;
        }
        return (0, base_1.createBuiltinPlugin)(this.name, undefined);
    }
}
exports.HotModuleReplacementPlugin = HotModuleReplacementPlugin;
