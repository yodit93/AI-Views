/**
 * Get scheme if specifier is an absolute URL specifier
 * e.g. Absolute specifiers like 'file:///user/webpack/index.js'
 * https://tools.ietf.org/html/rfc3986#section-3.1
 */
export declare function getScheme(specifier: string): string | undefined;
