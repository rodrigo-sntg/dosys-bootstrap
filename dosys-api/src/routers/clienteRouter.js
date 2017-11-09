'use strict';

const Router = require("koa-router");
const clienteService = require("../services/clienteService");

let clienteRouter = new Router();

clienteRouter.get("/", function* (next){
	this.body = yield clienteService.getAll();

});

clienteRouter.get("/cpf/:cpf", function* (next){
	this.body = yield clienteService.getByCpf(this.params.cpf);
});

clienteRouter.get("/id/:id", function* (next){
	this.body = yield clienteService.getById(this.params.id);
});

clienteRouter.post("/", function* (next){
	try{

		this.body = yield clienteService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

clienteRouter.put("/", function* (next){
	this.body = yield clienteService.update(this.request.query);
});

clienteRouter.delete("/id/:id", function* (next){
	this.body = yield clienteService.delete(this.params.id);
});

module.exports = clienteRouter;