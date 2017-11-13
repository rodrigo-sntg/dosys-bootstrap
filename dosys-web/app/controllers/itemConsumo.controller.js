class ItemConsumoController{
	constructor(itemConsumoService, unidadeMedidaService, itemEstoqueService, $stateParams, categoryService){
		this.itemConsumoService = itemConsumoService;
		this.itemEstoqueService = itemEstoqueService;
		this.categoryService = categoryService;
		this.getAll ();
		this.unidadeMedidaService = unidadeMedidaService;
		this.serverErrors = undefined;
		this.$stateParams = $stateParams;
		let that = this;


		this.itemEstoqueService.getAll().then(function (response){
			that.itensEstoque = response.data;
			that.itensEstoque.push({"_id":"", "nome":"Selecione"});
		});

		this.unidadeMedidaService.getAll().then(function (response){
			that.unidadeMedidas = response.data;
			that.unidadeMedidas.push({"_id":"", "unidade":"Selecione"});
		});

		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
			console.log(this.itemConsumo)
		}else{
			this.itemConsumo = {};
			this.itemConsumo.listaItemEstoqueConsumo = new Array();
		}



		this.categoryService.getParents().then(function (response){
			that.parents = response.data;
			that.parents.forEach(function(obj,index,lista){
				that.categoryService.getByParent(obj._id).then(function (response){
					obj.subCategorias = response.data;
				}).catch(function(erro){
					console.log(erro.data);
				});
			});
		});


		this.data;

	}


	atualizaSubCategories(){
		var that = this;

		this.categoryService.getByParent(this.itemConsumo.categoria._id).then(function (response){
					that.subCategorias = response.data;

					console.log(that.subCategorias)
				}).catch(function(erro){
					console.log(erro);
				});


	}

	insert (){
		var that = this;
		console.log(this.itemConsumo)
		this.itemConsumoService.insert(this.itemConsumo).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro.message);
			that.serverErrors = erro.data;
		});
	};

	update (){
		var that = this;
		console.log(this.itemConsumo)
		this.itemConsumoService.update(this.itemConsumo).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (id){
		var that = this;
		this.itemConsumoService.delete(id).then(function (response){
			that.itemConsumo = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.itemConsumoService.getAll().then(function (response){
			that.itemConsumoService.getAll().then(function (response){
				console.log(response.data);
				that.itemConsumos = response.data;	
			});
		});
	};

	getAllCategorias (){
		var that = this;
		this.itemConsumoService.getAll(this.itemConsumo).then(function (response){
			that.itemConsumoService.getAll().then(function (response){
				console.log(response.data);
				that.categorias = response.data;	
			});
		});
	};

	getAllMedidas (){
		var that = this;
		this.itemConsumoService.getAll(this.itemConsumo).then(function (response){
			that.itemConsumoService.getAll().then(function (response){
				console.log(response.data);
				that.medidas = response.data;	
			});
		});
	};
	getAllItensEstoque (){
		var that = this;
		this.itemConsumoService.getAll(this.itemConsumo).then(function (response){
			that.itemConsumoService.getAll().then(function (response){
				console.log(response.data);
				that.itensEstoque = response.data;

			});
		});
	};

	getById (id){
		var that = this;
		this.itemConsumoService.getById(id).then(function (response){
				try{
					response.data.categoria = JSON.parse(response.data.categoria);
					response.data.subCategoria = JSON.parse(response.data.subCategoria); 
				}catch(Error){}
				that.itemConsumo = response.data;
				if(that.itemConsumo.subCategoria){
					// that.itemConsumo.subCategoria = that.itemConsumo.subCategoria._id; 
					console.log(that.itemConsumo.subCategoria)
					that.atualizaSubCategories();
				}
				if(!that.itemConsumo.listaItemEstoqueConsumo){
					that.itemconsumo.listaItemEstoqueConsumo = new Array();
				}
				console.log(that.itemConsumo)
		}).catch(function(erro){
			console.log(erro);
		});

	};

	inserirItemNaLista(){
		var that = this;

		if(this.item == undefined || (this.item.itemEstoque == undefined || this.item.medida.unidadeMedida == undefined || this.item.medida.quantidade == 0)){
			console.log(this.item)
			return;
		}

		this.itemEstoqueService.getById(this.item.itemEstoque._id).then(function (response){
			that.item.itemEstoque = response.data;
		});

		this.unidadeMedidaService.getById(this.item.medida.unidadeMedida._id).then(function (response){
			that.item.medida.unidadeMedida = response.data;
		});
		console.log(this.item);


		this.preencheItemEstoque().done(function(){
        // função preencheItemEstoque foi executada, agora executa preencheUnidadeMedida
        
	        that.preencheUnidadeMedida().done(function(){
	            // função preencheUnidadeMedida foi executada, agora pode inserir na lista
	             
	            let quantidadeItem = that.item.medida.medidaPorUnidade * (Math.pow(10,that.item.medida.unidadeMedida.fator));
	            let quantidadeItemEstoque = that.item.itemEstoque.medida.medidaPorUnidade * (Math.pow(10,that.item.itemEstoque.medida.unidadeMedida.fator));
	            let porcentagemItem = quantidadeItem / quantidadeItemEstoque;
	            that.item.custo = that.item.itemEstoque.custoUnitario * porcentagemItem;


	            that.itemConsumo.listaItemEstoqueConsumo.push(that.item);
            	let custo = 0;

	            let lista = that.itemConsumo.listaItemEstoqueConsumo;
	            for(let i = 0 ; i < lista.length ; i++){
	            	custo += lista[i].custo;
	            }

	            that.itemConsumo.custoTotal = custo;

	            // item inserido na lista, agora podemos limpá-lo
					that.item = new Object;
        	});
    	});

	}


	preencheItemEstoque(){
		var dfrd1 = $.Deferred();
		var that = this;
		
		this.itemEstoqueService.getById(this.item.itemEstoque._id).then(function (response){
			that.item.itemEstoque = response.data;
			dfrd1.resolve();
		});

		return $.when(dfrd1).done(function(){
		}).promise();
	}

	preencheUnidadeMedida(){
		var dfrd1 = $.Deferred();		  
		var that = this;

		this.unidadeMedidaService.getById(this.item.medida.unidadeMedida._id).then(function (response){
			that.item.medida.unidadeMedida = response.data;
			dfrd1.resolve();
		});

		return $.when(dfrd1).done(function(){
		}).promise();
	}

	preencheItem(item){
		console.log(item);
		this.item = item;
	}

	removeItem(item){
		this.itemConsumo.listaItemEstoqueConsumo = this.itemConsumo.listaItemEstoqueConsumo.filter(i => item.itemEstoque._id != i.itemEstoque._id);

		let custo = 0;

	    let lista = this.itemConsumo.listaItemEstoqueConsumo;
	    for(let i = 0 ; i < lista.length ; i++){
	    	custo += lista[i].custo;
	    }

	    this.itemConsumo.custoTotal = custo;

	}

	verificarCusto(){
		let listaItens = this.itemConsumo.listaItemEstoqueConsumo;

		listaItens.forEach(e => {

			let medidaItem = e.medida.medidaPorUnidade * Math.pow(10,e.medida.unidadeMedida.fator);
			let medidaEstoque = e.itemEstoque.medida.medidaPorUnidade * Math.pow(10,e.itemEstoque.medida.unidadeMedida.fator);
			let porcentagem = medidaItem / medidaEstoque;
			console.log(porcentagem);

		})


	}

};



angular.module("app").controller("itemConsumoCtrl", ItemConsumoController);