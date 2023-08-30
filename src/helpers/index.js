"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = void 0;
var crypto_1 = require("crypto");
var SECRET = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "TS_NODE";
/**
 * Generates a random string of characters using the crypto module in Node.js.
 * @returns {string} A random string of characters.
 * @example
 * import { random } from "./random";
 *
 * const randomString = random();
 * console.log(randomString);
 */
var random = function () { return crypto_1.default.randomBytes(128).toString("base64"); };
exports.random = random;
/**
 * Generates a hash using the SHA256 algorithm.
 * @param salt - The salt used to generate the hash.
 * @param password - The password used to generate the hash.
 * @returns - The generated hash.
 */
var authentication = function (salt, password) {
    return crypto_1.default
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
};
exports.authentication = authentication;
