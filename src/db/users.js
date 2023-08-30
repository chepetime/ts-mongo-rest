"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    authentication: {
        password: { required: true, select: false, type: String },
        salt: { select: false, type: String },
        sessionToken: { select: false, type: String },
    },
    email: { required: true, type: String },
    username: { required: true, type: String },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
/**
 * Retrieves all the users from the UserModel collection in the MongoDB database.
 * @returns A query object representing the search for all users in the database.
 * @example
 * const users = await getUsers();
 * console.log(users);
 */
var getUsers = function () { return exports.UserModel.find(); };
exports.getUsers = getUsers;
/**
 * Retrieves a user from the database based on their email address.
 * @param email - The email address of the user to be retrieved.
 * @returns A promise that resolves to the found user document or null if no matching document is found.
 * @example
 * const user = await getUserByEmail("example@example.com");
 * console.log(user);
 */
var getUserByEmail = function (email) { return exports.UserModel.findOne({ email: email }); };
exports.getUserByEmail = getUserByEmail;
/**
 * Retrieves a user from the database based on their session token.
 * @param sessionToken - The session token of the user.
 * @returns A promise that resolves to the user object if found, or null if no user is found.
 */
var getUserBySessionToken = function (sessionToken) {
    return exports.UserModel.findOne({ "authentication.sessionToken": sessionToken });
};
exports.getUserBySessionToken = getUserBySessionToken;
/**
 * Retrieves a user by their unique identifier.
 * @param id - The unique identifier of the user to be retrieved.
 * @returns A promise that resolves to the user object if found, or null if not found.
 * @example
 * const user = await getUserById("123456789");
 * console.log(user);
 */
var getUserById = function (id) { return exports.UserModel.findById(id); };
exports.getUserById = getUserById;
/**
 * Creates a new user instance using the provided values.
 * @param values - The values for creating a new user.
 * @returns The new user instance.
 * @example
 * const userValues = {
 *   name: "John Doe",
 *   email: "johndoe@example.com"
 *   password: "johndoerules"
 * };
 *
 * const newUser = createUser(userValues);
 * console.log(newUser);
 */
var createUser = function (values) {
    return new exports.UserModel(values).save().then(function (user) { return user.toObject(); });
};
exports.createUser = createUser;
/**
 * Deletes a user from the database based on their ID.
 * @param id - The ID of the user to be deleted.
 * @returns Deleted user instance.
 */
var deleteUserById = function (id) {
    return exports.UserModel.findOneAndDelete({ _id: id });
};
exports.deleteUserById = deleteUserById;
/**
 * Updates a user document in the MongoDB database using the Mongoose library.
 * @param id - The unique identifier of the user to be updated.
 * @param values - An object containing the new values for the user.
 * @returns The updated user document.
 */
var updateUserById = function (id, values) {
    return exports.UserModel.findByIdAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
