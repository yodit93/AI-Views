"use strict";
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib/node/NodeTemplatePlugin.js
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
const builtin_plugin_1 = require("../builtin-plugin");
class NodeTemplatePlugin {
    constructor(_options = {}) {
        this._options = _options;
    }
    apply(compiler) {
        const chunkLoading = this._options.asyncChunkLoading
            ? "async-node"
            : "require";
        compiler.options.output.chunkLoading = chunkLoading;
        new builtin_plugin_1.CommonJsChunkFormatPlugin().apply(compiler);
        new builtin_plugin_1.EnableChunkLoadingPlugin(chunkLoading).apply(compiler);
    }
}
exports.default = NodeTemplatePlugin;
