'use strict';

const Router = require("koa-router");
const comandaService = require("../services/comandaService");

let comandaRouter = new Router();

comandaRouter.get("/", function* (next){
	this.body = yield comandaService.getAll();

});

comandaRouter.get("/id/:id", function* (next){
	this.body = yield comandaService.getById(this.params.id);
});

comandaRouter.post("/", function* (next){
	try{

		this.body = yield comandaService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

comandaRouter.put("/", function* (next){
	this.body = yield comandaService.update(this.request.query);
});

comandaRouter.delete("/id/:id", function* (next){
	this.body = yield comandaService.delete(this.params.id);
});

module.exports = comandaRouter;