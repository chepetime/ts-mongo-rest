import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";

import router from "./router";

dotenv.config();

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const MONGO_URL = process.env.MONGODB_URL ?? "";

const app = express();

app.use(
	cors({
		credentials: true,
	}),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(EXPRESS_PORT, () => {
	console.log(`Server running oin https://localhost:${EXPRESS_PORT}/`);
});

mongoose.Promise = Promise;
void mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
	console.log(error);
});

app.use("/", router());
