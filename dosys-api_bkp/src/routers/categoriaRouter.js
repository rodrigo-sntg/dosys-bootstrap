'use strict';

const Router = require("koa-router");
const categoriaService = require("../services/categoriaService");

let categoriaRouter = new Router();

categoriaRouter.get("/", function* (next){
	this.body = yield categoriaService.getAll();

});

categoriaRouter.get("/sub", function* (next){
	this.body = yield categoriaService.getAllSub();

});

categoriaRouter.get("/id/:id", function* (next){
	this.body = yield categoriaService.getById(this.params.id);
});

categoriaRouter.post("/", function* (next){
	try{

		this.body = yield categoriaService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

categoriaRouter.put("/", function* (next){
	this.body = yield categoriaService.update(this.request.query);
});

categoriaRouter.delete("/id/:id", function* (next){
	this.body = yield categoriaService.delete(this.params.id);
});

module.exports = categoriaRouter;