"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../controllers/users");
var middlewares_1 = require("../middlewares");
exports.default = (function (router) {
    router.get("/users", middlewares_1.isAuthenticated, users_1.getAllUsers);
    router.delete("/users/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.deleteUser);
    router.patch("/users/:id", middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.updateUser);
});
