import mongoose from "mongoose";

export interface User {
	_id?: string;
	email: string;
	password: string;
	username: string;
}

const UserSchema = new mongoose.Schema({
	authentication: {
		password: { required: true, select: false, type: String },
		salt: { select: false, type: String },
		sessionToken: { select: false, type: String },
	},
	email: { required: true, type: String },
	username: { required: true, type: String },
});

export const UserModel = mongoose.model("User", UserSchema);

/**
 * Retrieves all the users from the UserModel collection in the MongoDB database.
 * @returns A query object representing the search for all users in the database.
 * @example
 * const users = await getUsers();
 * console.log(users);
 */
export const getUsers = () => UserModel.find();

/**
 * Retrieves a user from the database based on their email address.
 * @param email - The email address of the user to be retrieved.
 * @returns A promise that resolves to the found user document or null if no matching document is found.
 * @example
 * const user = await getUserByEmail("example@example.com");
 * console.log(user);
 */
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

/**
 * Retrieves a user from the database based on their session token.
 * @param sessionToken - The session token of the user.
 * @returns A promise that resolves to the user object if found, or null if no user is found.
 */
export const getUserBySessionToken = (sessionToken: string) =>
	UserModel.findOne({ "authentication.sessionToken": sessionToken });

/**
 * Retrieves a user by their unique identifier.
 * @param id - The unique identifier of the user to be retrieved.
 * @returns A promise that resolves to the user object if found, or null if not found.
 * @example
 * const user = await getUserById("123456789");
 * console.log(user);
 */
export const getUserById = (id: string) => UserModel.findById(id);

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
export const createUser = (values: Record<string, unknown>) =>
	new UserModel(values).save().then((user) => user.toObject());

/**
 * Deletes a user from the database based on their ID.
 * @param id - The ID of the user to be deleted.
 * @returns Deleted user instance.
 */
export const deleteUserById = (id: string) =>
	UserModel.findOneAndDelete({ _id: id });

/**
 * Updates a user document in the MongoDB database using the Mongoose library.
 * @param id - The unique identifier of the user to be updated.
 * @param values - An object containing the new values for the user.
 * @returns The updated user document.
 */
export const updateUserById = (id: string, values: Record<string, unknown>) =>
	UserModel.findByIdAndUpdate(id, values);
