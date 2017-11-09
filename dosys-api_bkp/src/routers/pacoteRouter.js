'use strict';

const Router = require("koa-router");
const pacoteService = require("../services/pacoteService");

let pacoteRouter = new Router();

pacoteRouter.get("/", function* (next){
	this.body = yield pacoteService.getAll();

});

pacoteRouter.get("/id/:id", function* (next){
	this.body = yield pacoteService.getById(this.params.id);
});

pacoteRouter.post("/", function* (next){
	try{

		this.body = yield pacoteService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

pacoteRouter.put("/", function* (next){
	this.body = yield pacoteService.update(this.request.query);
});

pacoteRouter.delete("/id/:id", function* (next){
	this.body = yield pacoteService.delete(this.params.id);
});

module.exports = pacoteRouter;