'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@module-federation/runtime');
var retryPlugin = require('@module-federation/runtime/retry-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var retryPlugin__default = /*#__PURE__*/_interopDefaultLegacy(retryPlugin);



Object.defineProperty(exports, 'RetryPlugin', {
	enumerable: true,
	get: function () { return retryPlugin__default["default"]; }
});
Object.keys(runtime).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return runtime[k]; }
	});
});
