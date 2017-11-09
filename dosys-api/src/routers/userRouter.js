'use strict';

const Router = require("koa-router");
const userService = require("../services/userService");

let userRouter = new Router();

userRouter.get("/", function* (next){
	this.body = yield userService.getAll();

});

userRouter.post("/", function* (next){
	this.body = yield userService.inserir(this.request.query);

});

module.exports = userRouter;