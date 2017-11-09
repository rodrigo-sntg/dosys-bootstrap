RoutesConfig = function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/login");

	$stateProvider.state({
		name:"login",
		url:"/login",
		controller:"loginCtrl as vm",
		templateUrl:"app/views/login.html"
	});

	$stateProvider.state({
		name:"home",
		url:"/home",
		templateUrl:"app/views/home.html"
	});

	$stateProvider.state({
		name:"cadastroCliente",
		url:"/cadastroCliente/:id",
		controller:"clienteCtrl as vm",
		templateUrl:"app/views/cadastroCliente.html"
	});

	$stateProvider.state({
		name:"listaCliente",
		url:"/listaCliente",
		controller:"clienteCtrl as vm",
		templateUrl:"app/views/listaCliente.html"
	});

	$stateProvider.state({
		name:"cadastroProduto",
		url:"/cadastroProduto/:id",
		controller:"itemConsumoCtrl as vm",
		templateUrl:"app/views/cadastroProduto.html"
	});

	$stateProvider.state({
		name:"listaProduto",
		url:"/listaProduto",
		controller:"itemConsumoCtrl as vm",
		templateUrl:"app/views/listaProduto.html"
	});

	$stateProvider.state({
		name:"cadastroEstoque",
		url:"/cadastroEstoque/:id",
		controller:"itemEstoqueCtrl as vm",
		templateUrl:"app/views/cadastroEstoque.html"
	});

	$stateProvider.state({
		name:"listaEstoque",
		url:"/listaEstoque",
		controller:"itemEstoqueCtrl as vm",
		templateUrl:"app/views/listaEstoque.html"
	});

	$stateProvider.state({
		name:"cadastroUnidadeMedida",
		url:"/cadastroUnidadeMedida/:id",
		controller:"unidadeMedidaCtrl as vm",
		templateUrl:"app/views/cadastroUnidadeMedida.html"
	});

	$stateProvider.state({
		name:"listaUnidadeMedida",
		url:"/listaUnidadeMedida",
		controller:"unidadeMedidaCtrl as vm",
		templateUrl:"app/views/listaUnidadeMedida.html"
	});

	$stateProvider.state({
		name:"cadastroCategoria",
		url:"/cadastroCategoria/:id",
		controller:"categoriaCtrl as vm",
		templateUrl:"app/views/cadastroCategoria.html"
	});

	$stateProvider.state({
		name:"listaCategoria",
		url:"/listaCategoria",
		controller:"categoriaCtrl as vm",
		templateUrl:"app/views/listaCategoria.html"
	});

	$stateProvider.state({
		name:"painelParametros",
		url:"/painelParametros",
		templateUrl:"app/views/painelParametros.html"
	});

	$stateProvider.state({
		name:"painelParametrosUnidades",
		url:"/painelParametrosUnidades",
		controller:"unidadeMedidaCtrl as vm",
		templateUrl:"app/views/painelParametrosUnidades.html"
	});

	$stateProvider.state({
		name:"painelParametrosCategorias",
		url:"/painelParametrosCategorias",
		controller:"categoriaCtrl as vm",
		templateUrl:"app/views/painelParametrosCategorias.html"
	});

	$stateProvider.state({
		name:"cadastroPacote",
		url:"/cadastroPacote/:id",
		controller:"pacoteCtrl as vm",
		templateUrl:"app/views/cadastroPacote.html"
	});

	$stateProvider.state({
		name:"painelParametrosPacotes",
		url:"/painelParametrosPacotes/:id",
		controller:"pacoteCtrl as vm",
		templateUrl:"app/views/painelParametrosPacotes.html"
	});

	$stateProvider.state({
		name:"cadastroCategory",
		url:"/cadastroCategory/:id",
		controller:"categoryCtrl as vm",
		templateUrl:"app/views/cadastroCategory.html"
	});

	$stateProvider.state({
		name:"painelParametrosCategories",
		url:"/painelParametrosCategories",
		controller:"categoryCtrl as vm",
		templateUrl:"app/views/painelParametrosCategories.html"
	});

	$stateProvider.state({
		name:"cadastroFornecedor",
		url:"/cadastroFornecedor/:id",
		controller:"fornecedorCtrl as vm",
		templateUrl:"app/views/cadastroFornecedor.html"
	});

	$stateProvider.state({
		name:"listaFornecedores",
		url:"/listaFornecedores",
		controller:"fornecedorCtrl as vm",
		templateUrl:"app/views/listaFornecedores.html"
	});

	$stateProvider.state({
		name:"comprasFornecedores",
		url:"/comprasFornecedores",
		controller:"ordemCtrl as vm",
		templateUrl:"app/views/comprasFornecedores.html"
	});

	$stateProvider.state({
		name:"cadastroOrdem",
		url:"/cadastroOrdem/:id",
		controller:"ordemCtrl as vm",
		templateUrl:"app/views/cadastroOrdem.html"
	});

	$stateProvider.state({
		name:"comanda",
		url:"/comanda/:id",
		controller:"comandaCtrl as vm",
		templateUrl:"app/views/comanda.html"
	});
	

}

angular.module("app").config(RoutesConfig);