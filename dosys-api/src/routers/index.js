const mount = require("koa-mount");

module.exports = function(server){
	const userRouter = require("./userRouter"),
		clienteRouter = require("./clienteRouter"),
		itemConsumoRouter = require("./itemConsumoRouter"),
		itemEstoqueRouter = require("./itemEstoqueRouter"),
		unidadeMedidaRouter = require("./unidadeMedidaRouter"),
		categoriaRouter = require("./categoriaRouter"),
		pacoteRouter = require("./pacoteRouter"),
		categoryRouter = require("./categoryRouter"),
		fornecedorRouter = require("./fornecedorRouter"),
		ordemRouter = require("./ordemRouter"),
		comandaRouter = require("./comandaRouter");
	
	server.use(mount('/api/users', userRouter.routes()));
	server.use(mount('/api/clientes', clienteRouter.routes()));
	server.use(mount('/api/itemConsumo', itemConsumoRouter.routes()));
	server.use(mount('/api/itemEstoque', itemEstoqueRouter.routes()));
	server.use(mount('/api/unidadeMedida', unidadeMedidaRouter.routes()));
	server.use(mount('/api/categoria', categoriaRouter.routes()));
	server.use(mount('/api/pacote', pacoteRouter.routes()));
	server.use(mount('/api/category', categoryRouter.routes()));
	server.use(mount('/api/fornecedor', fornecedorRouter.routes()));
	server.use(mount('/api/ordem', ordemRouter.routes()));
	server.use(mount('/api/comanda', comandaRouter.routes()));
};