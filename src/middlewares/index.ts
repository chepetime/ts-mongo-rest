import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const cookie = process.env.EXPRESS_COOKIE ?? "X-AUTH";
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const sessionToken = req.cookies[cookie] as string;

		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res.sendStatus(403);
		}

		merge(req, { identity: existingUser });

		next();
		return;
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const isOwner = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const { id } = req.params;
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		const currentUserId = get(req, "identity._id") as unknown as string;

		if (!currentUserId) {
			return res.sendStatus(400);
		}

		if (currentUserId.toString() !== id) {
			return res.sendStatus(403);
		}

		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
