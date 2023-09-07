"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const postRouter_1 = require("./postRouter");
const routes = (0, express_1.Router)({
    mergeParams: true,
});
exports.appRouter = routes;
routes.use("/blog_post", postRouter_1.postRouter);
routes.use("/user", userRouter_1.userRouter);
///////////////////////////
