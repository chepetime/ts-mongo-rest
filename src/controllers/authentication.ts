import express from "express";

import { createUser, getUserByEmail } from "./../db/users";
import { authentication, random } from "./../helpers";

interface RequestBody {
	email?: string;
	password?: string;
	username?: string;
}

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body as RequestBody;

		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await getUserByEmail(email).select(
			"+authentication.salt +authentication.password",
		);

		if (user === null) {
			return res.sendStatus(404);
		}

		if (!user.authentication?.salt) {
			return res.sendStatus(404);
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== expectedHash) {
			return res.sendStatus(403);
		}

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString(),
		);

		await user.save();

		const cookie = process.env.EXPRESS_COOKIE ?? "X-AUTH";
		const domain = process.env.EXPRESS_DOMAIN;

		res.cookie(cookie, user.authentication.sessionToken, {
			domain,
			path: "/",
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body as RequestBody;

		if (!email || !password || !username) {
			return res.sendStatus(400);
		}

		const existingUser = (await getUserByEmail(email)) ?? false;

		if (existingUser) {
			return res.sendStatus(400);
		}

		const salt = random();
		const user = await createUser({
			authentication: {
				password: authentication(salt, password),
				salt,
			},
			email,
			username,
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
