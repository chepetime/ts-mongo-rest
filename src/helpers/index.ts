import crypto from "crypto";

const SECRET = process.env.SECRET ?? "TS_NODE";

/**
 * Generates a random string of characters using the crypto module in Node.js.
 * @returns {string} A random string of characters.
 * @example
 * import { random } from "./random";
 *
 * const randomString = random();
 * console.log(randomString);
 */

export const random = (): string => crypto.randomBytes(128).toString("base64");

/**
 * Generates a hash using the SHA256 algorithm.
 * @param salt - The salt used to generate the hash.
 * @param password - The password used to generate the hash.
 * @returns - The generated hash.
 */
export const authentication = (salt: string, password: string): string => {
	return crypto
		.createHmac("sha256", [salt, password].join("/"))
		.update(SECRET)
		.digest("hex");
};
