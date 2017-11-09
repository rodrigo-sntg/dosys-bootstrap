'use strict';

const Router = require("koa-router");
const categoryService = require("../services/categoryService");

let categoryRouter = new Router();

categoryRouter.get("/", function* (next){
	this.body = yield categoryService.getAll();

});

categoryRouter.get("/parents", function* (next){
	this.body = yield categoryService.getParents();

});

categoryRouter.get("/sub", function* (next){
	this.body = yield categoryService.getAllSub();

});

categoryRouter.get("/id/:id", function* (next){
	this.body = yield categoryService.getById(this.params.id);
});

categoryRouter.get("/parent/:parent", function* (next){
	this.body = yield categoryService.getByParent(this.params.parent);
});

categoryRouter.post("/", function* (next){
	try{

		this.body = yield categoryService.insert(this.request.query);

	}catch(e){
		console.log('Error: ', e);
		this.status = e.status || 500;
		this.body = e.toString(); 
	}

});

categoryRouter.put("/", function* (next){
	this.body = yield categoryService.update(this.request.query);
});

categoryRouter.delete("/id/:id", function* (next){
	this.body = yield categoryService.delete(this.params.id);
});

module.exports = categoryRouter;