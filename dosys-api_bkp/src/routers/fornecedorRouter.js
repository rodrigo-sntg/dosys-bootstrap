'use strict';

const Router = require("koa-router");
const fornecedorService = require("../services/fornecedorService");

let fornecedorRouter = new Router();

fornecedorRouter.get("/", function* (next){
	this.body = yield fornecedorService.getAll();

});

fornecedorRouter.get("/cnpj/:cnpj", function* (next){
	this.body = yield fornecedorService.getByCnpj(this.params.cnpj);
});

fornecedorRouter.get("/id/:id", function* (next){
	this.body = yield fornecedorService.getById(this.params.id);
});

fornecedorRouter.post("/", function* (next){
	try{

		this.body = yield fornecedorService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

fornecedorRouter.put("/", function* (next){
	this.body = yield fornecedorService.update(this.request.query);
});

fornecedorRouter.delete("/id/:id", function* (next){
	this.body = yield fornecedorService.delete(this.params.id);
});

module.exports = fornecedorRouter;