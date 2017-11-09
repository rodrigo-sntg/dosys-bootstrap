'use strict';

const Router = require("koa-router");
const unidadeMedidaService = require("../services/unidadeMedidaService");

let unidadeMedidaRouter = new Router();

unidadeMedidaRouter.get("/", function* (next){
	this.body = yield unidadeMedidaService.getAll();

});

unidadeMedidaRouter.get("/id/:id", function* (next){
	this.body = yield unidadeMedidaService.getById(this.params.id);
});

unidadeMedidaRouter.post("/", function* (next){
	try{

		this.body = yield unidadeMedidaService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

unidadeMedidaRouter.put("/", function* (next){
	this.body = yield unidadeMedidaService.update(this.request.query);
});

unidadeMedidaRouter.delete("/id/:id", function* (next){
	this.body = yield unidadeMedidaService.delete(this.params.id);
});

module.exports = unidadeMedidaRouter;