"use strict";
/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/tree/4b4ca3bb53f36a5b8fc6bc1bd976ed7af161bd80/lib/util
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.countIterable = exports.someInIterable = exports.last = void 0;
const last = (set) => {
    let last;
    for (const item of set)
        last = item;
    return last;
};
exports.last = last;
const someInIterable = (iterable, filter) => {
    for (const item of iterable) {
        if (filter(item))
            return true;
    }
    return false;
};
exports.someInIterable = someInIterable;
const countIterable = (iterable) => {
    let i = 0;
    // eslint-disable-next-line no-unused-vars
    for (const _ of iterable)
        i++;
    return i;
};
exports.countIterable = countIterable;
