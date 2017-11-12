
class ItemEstoqueController{
	constructor(itemEstoqueService, unidadeMedidaService, pacoteService, categoryService, $stateParams){
		this.itemEstoqueService = itemEstoqueService;
		this.unidadeMedidaService = unidadeMedidaService;
		this.pacoteService = pacoteService;
		this.categoryService = categoryService;
		this.getAll ();
		this.serverErrors = undefined;
		let that = this;

		this.pacoteService.getAll().then(function (response){
			that.pacotes = response.data;
		});

		this.unidadeMedidaService.getAll().then(function (response){
			that.unidadeMedidas = response.data;
		});

		this.categoryService.getParents().then(function (response){
			that.parents = response.data;
			that.parents.forEach(function(obj,index,lista){
				that.categoryService.getByParent(obj._id).then(function (response){
					obj.subCategorias = response.data;
				}).catch(function(erro){
					console.log(erro);
				});
			});
		});

		console.log(this.unidadeMedidas)

		this.$stateParams = $stateParams;

		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
		}

		console.log(this.$stateParams.cpf);
		this.data;

	}

	insert (){
		var that = this;
		console.log(this.itemEstoque)
		this.itemEstoqueService.insert(this.itemEstoque).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		var that = this;
		this.itemEstoqueService.update(this.itemEstoque).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (id){
		var that = this;
		this.itemEstoqueService.delete(id).then(function (response){
			that.itemEstoque = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		console.log("getall")
		this.itemEstoqueService.getAll(this.itemEstoque).then(function (response){
			that.itemEstoqueService.getAll().then(function (response){
				console.log(response.data);
				let lista = response.data;
				lista.forEach(e => {
					e.custoTotalEstoque = e.custoTotalEstoque.toFixed(2);
					e.custoUnitario = e.custoUnitario.toFixed(2);
				})
				that.itensEstoque = lista;	
			});
		});
	};



	getById (id){
		var that = this;
		this.itemEstoqueService.getById(id).then(function (response){

				let item = response.data;
				
				item.custoTotalEstoque = item.custoTotalEstoque.toFixed(2);
				item.custoUnitario = item.custoUnitario.toFixed(2);

				that.itemEstoque = item;
				if(that.itemEstoque.subCategoria){
					// that.itemConsumo.subCategoria = that.itemConsumo.subCategoria._id; 
					console.log(that.itemEstoque.subCategoria);
					that.atualizaSubCategories();
				}


			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	novo(){
		this.itemEstoque = "";
	};

	inserirEntrada (){
		var that = this;
		console.log(this.item)
		this.itemEstoque.historicoPrecosCompra.push(this.item);
		this.itemEstoqueService.inserirEntrada(this.itemEstoque).then(function (response){
			that.getById(that.itemEstoque._id);
		}).catch(function(erro){
			console.log(erro);
		});
	};

	atualizaSubCategories(){
		var that = this;

		this.categoryService.getByParent(this.itemEstoque.categoria._id).then(function (response){
					that.subCategorias = response.data;

					console.log(that.subCategorias)
				}).catch(function(erro){
					console.log(erro);
				});


	}

	getValorUnitario(){
		if(this.itemEstoque){
			if(this.itemEstoque.custoTotalEstoque != 0 && this.itemEstoque.qtdEstoque != 0)
				return this.itemEstoque.custoTotalEstoque / this.itemEstoque.qtdEstoque
			else
				return 0;
			
		}
	}

};



angular.module("app").controller("itemEstoqueCtrl", ItemEstoqueController);