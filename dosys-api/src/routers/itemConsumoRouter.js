'use strict';

const Router = require("koa-router");
const itemConsumoService = require("../services/itemConsumoService");

let itemConsumoRouter = new Router();

itemConsumoRouter.get("/", function* (next){
	this.body = yield itemConsumoService.getAll();

});

itemConsumoRouter.get("/id/:id", function* (next){
	this.body = yield itemConsumoService.getById(this.params.id);
});

itemConsumoRouter.post("/", function* (next){
	try{

		this.body = yield itemConsumoService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

itemConsumoRouter.put("/", function* (next){
	this.body = yield itemConsumoService.update(this.request.query);
});

itemConsumoRouter.delete("/id/:id", function* (next){
	this.body = yield itemConsumoService.delete(this.params.id);
});

module.exports = itemConsumoRouter;