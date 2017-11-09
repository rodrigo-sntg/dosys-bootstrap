const mount = require("koa-mount");

module.exports = function(server){
	const userRouter = require("./userRouter");
	const clienteRouter = require("./clienteRouter");
	const itemConsumoRouter = require("./itemConsumoRouter");
	const itemEstoqueRouter = require("./itemEstoqueRouter");
	const unidadeMedidaRouter = require("./unidadeMedidaRouter");
	const categoriaRouter = require("./categoriaRouter");
	const pacoteRouter = require("./pacoteRouter");
	const categoryRouter = require("./categoryRouter");
	const fornecedorRouter = require("./fornecedorRouter");
	
	server.use(mount('/api/users', userRouter.routes()));
	server.use(mount('/api/clientes', clienteRouter.routes()));
	server.use(mount('/api/itemConsumo', itemConsumoRouter.routes()));
	server.use(mount('/api/itemEstoque', itemEstoqueRouter.routes()));
	server.use(mount('/api/unidadeMedida', unidadeMedidaRouter.routes()));
	server.use(mount('/api/categoria', categoriaRouter.routes()));
	server.use(mount('/api/pacote', pacoteRouter.routes()));
	server.use(mount('/api/category', categoryRouter.routes()));
	server.use(mount('/api/fornecedor', fornecedorRouter.routes()));
};