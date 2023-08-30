"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_1 = require("./authentication");
var users_1 = require("./users");
var router = express_1.default.Router();
exports.default = (function () {
    (0, authentication_1.default)(router);
    (0, users_1.default)(router);
    return router;
});
