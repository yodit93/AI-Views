"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequiredVersion = void 0;
const VERSION_PATTERN_REGEXP = /^([\d^=v<>~]|[*xX]$)/;
function isRequiredVersion(str) {
    return VERSION_PATTERN_REGEXP.test(str);
}
exports.isRequiredVersion = isRequiredVersion;
