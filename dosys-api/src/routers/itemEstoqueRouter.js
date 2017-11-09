'use strict';

const Router = require("koa-router");
const itemEstoqueService = require("../services/itemEstoqueService");

let itemEstoqueRouter = new Router();

itemEstoqueRouter.get("/", function* (next){
	this.body = yield itemEstoqueService.getAll();

});

itemEstoqueRouter.get("/id/:id", function* (next){
	this.body = yield itemEstoqueService.getById(this.params.id);
});

itemEstoqueRouter.post("/", function* (next){
	try{

		this.body = yield itemEstoqueService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

itemEstoqueRouter.post("/entrada/", function* (next){
	try{

		this.body = yield itemEstoqueService.inserirEntrada(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

itemEstoqueRouter.put("/", function* (next){
	this.body = yield itemEstoqueService.update(this.request.query);
});

itemEstoqueRouter.delete("/id/:id", function* (next){
	this.body = yield itemEstoqueService.delete(this.params.id);
});

module.exports = itemEstoqueRouter;