"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePluginImport = void 0;
function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}
function resolvePluginImport(pluginImport) {
    if (!pluginImport) {
        return undefined;
    }
    return pluginImport.map(config => {
        const rawConfig = {
            ...config,
            style: {} // As babel-plugin-import style config is very flexible, we convert it to a more specific structure
        };
        if (typeof config.style === "boolean") {
            rawConfig.style.bool = config.style;
        }
        else if (typeof config.style === "string") {
            const isTpl = config.style.includes("{{");
            rawConfig.style[isTpl ? "custom" : "css"] = config.style;
        }
        else if (isObject(config.style)) {
            // for child compiler
            // see https://github.com/web-infra-dev/rspack/issues/4597
            rawConfig.style = config.style;
        }
        // This option will overrides the behavior of style
        if (config.styleLibraryDirectory) {
            rawConfig.style = { styleLibraryDirectory: config.styleLibraryDirectory };
        }
        return rawConfig;
    });
}
exports.resolvePluginImport = resolvePluginImport;
