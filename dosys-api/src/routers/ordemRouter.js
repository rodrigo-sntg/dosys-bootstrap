'use strict';

const Router = require("koa-router");
const ordemService = require("../services/ordemService");
const fornecedoroService = require("../services/fornecedorService");


let ordemRouter = new Router();

ordemRouter.get("/", function* (next){
	this.body = yield ordemService.getAll();

});

ordemRouter.get("/id/:id", function* (next){
	this.body = yield ordemService.getById(this.params.id);
});

ordemRouter.post("/", function* (next){
	try{

		this.body = yield ordemService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

ordemRouter.put("/", function* (next){
	this.body = yield ordemService.update(this.request.query);
});

ordemRouter.delete("/id/:id", function* (next){
	this.body = yield ordemService.delete(this.params.id);
});

module.exports = ordemRouter;