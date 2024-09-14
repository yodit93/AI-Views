"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNill = void 0;
function assertNotNill(value) {
    if (value == null) {
        throw Error(`${value} should not be undefined or null`);
    }
}
exports.assertNotNill = assertNotNill;
