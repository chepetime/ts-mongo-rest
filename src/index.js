"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var dotenv = require("dotenv");
var express_1 = require("express");
var http_1 = require("http");
var mongoose_1 = require("mongoose");
var router_1 = require("./router");
dotenv.config();
var EXPRESS_PORT = process.env.EXPRESS_PORT;
var MONGO_URL = (_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : "";
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
var server = http_1.default.createServer(app);
server.listen(EXPRESS_PORT, function () {
    console.log("Server running oin https://localhost:".concat(EXPRESS_PORT, "/"));
});
mongoose_1.default.Promise = Promise;
void mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", function (error) {
    console.log(error);
});
app.use("/", (0, router_1.default)());
