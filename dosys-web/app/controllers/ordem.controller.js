
class OrdemController{
	constructor(ordemService, pacoteService, itemEstoqueService, fornecedorService,$stateParams){
		this.ordemService = ordemService;
		this.fornecedorService = fornecedorService;
		this.itemEstoqueService = itemEstoqueService;
		this.pacoteService = pacoteService;

		this.getFornecedores();
		this.getAll();
		let that = this;

		this.itemEstoqueService.getAll().then(function (response){
			that.itensEstoque = response.data;
			that.itensEstoque.push({"_id":"", "nome":"Selecione"});
		});

		this.pacoteService.getAll().then(function (response){
			that.pacotes = response.data;
			that.pacotes.push({"_id":"", "nome":"Selecione"});
		});



		this.serverErrors = undefined;
		this.$stateParams = $stateParams;
		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
		}



		this.data;
	}

	insert (){
		var that = this;
		if(this.ordem.fornecedor){
			this.ordem.fornecedor = this.ordem.fornecedor._id;
		}
		this.ordemService.insert(this.ordem).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		var that = this;
		if(this.ordem.dataEnvioPedido){
			this.ordem.dataEnvioPedido = new Date(this.ordem.dataEnvioPedido);
			console.log(this.ordem.dataEnvioPedido);
		}
		this.ordemService.update(this.ordem).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.ordemService.delete(this.ordem._id).then(function (response){
			that.ordem = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	deletePorId (id){
		var that = this;
		this.ordemService.delete(id).then(function (response){
			that.ordem = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.ordemService.getAll(this.ordem).then(function (response){
			that.ordemService.getAll().then(function (response){
				console.log(response.data);
				that.ordens = response.data;
				let ordens = response.data;
				let ordensRascunho = new Array();
				let ordensEnviadas = new Array();
				let ordensRecebidas = new Array();
				
				that.ordensRascunho = ordens.filter(o => o.status == 1);
				that.ordensEnviadas = ordens.filter(o => o.status == 2);
				that.ordensRecebidas = ordens.filter(o => o.status == 3);
			});
		});
	};

	getFornecedores (){
		var that = this;
		that.fornecedorService.getAll().then(function (response){
			that.fornecedores = response.data;	
		});
	};

	getById (id){
		var that = this;
		this.ordemService.getById(id).then(function (response){
				if(response.data.dataEnvioPedido)
					response.data.dataEnvioPedido = new Date(response.data.dataEnvioPedido);

				if(response.data.dataRecebimento)
					response.data.dataRecebimento = new Date(response.data.dataRecebimento);

				if(!response.data.itensCompra)
					response.data.itensCompra = new Array();

				that.ordem = response.data;
			
		}).catch(function(erro){
			console.log(erro);
		});
	};


	inserirItemNaLista(){
		var that = this;
		if(!that.ordem.itensCompra)
			that.ordem.itensCompra = new Array();

		if(this.item == undefined || (this.item.itemEstoque == undefined || ((this.item.pacote == undefined || this.item.quantidadePacotes == undefined) && this.item.quantidadeSolicitada == 0)) ){
			console.log(this.item)
			return;
		}


		this.preencheItemEstoque().done(function(){
        // função preencheItemEstoque foi executada, agora executa preencheUnidadeMedida
        
        if(that.item.pacote){
		        that.preenchePacote().done(function(){
		            // função preenchePacote foi executada, agora pode inserir na lista
		            that.item.quantidadeSolicitada = that.item.pacote.quantidade * that.item.quantidadePacotes;

		            that.item.precoTotal = that.item.pacote.quantidade * that.item.quantidadePacotes * that.item.precoUnitario;
		            if(that.ordem.precoTotal)
		            	that.ordem.precoTotal += that.item.precoTotal;
		            else
		            	that.ordem.precoTotal = that.item.precoTotal

		            that.ordem.itensCompra.push(that.item);
		            // item inserido na lista, agora podemos limpá-lo
					that.item = new Object;
	        	});
	        }else{
	        	that.item.precoTotal = that.item.precoUnitario * that.item.quantidadeSolicitada;
	        	that.ordem.itensCompra.push(that.item);
	        	if(that.ordem.precoTotal)
		            	that.ordem.precoTotal += that.item.precoTotal;
	            else
	            	that.ordem.precoTotal = that.item.precoTotal
	            // item inserido na lista, agora podemos limpá-lo
				that.item = new Object;
	        }
    	});

	}


	inserirItemRecebido(){
		var that = this;

		if(that.ordem.itensCompra instanceof Array){
			that.ordem.itensCompra.forEach(i => {
				if(i._id == that.itemRecebimento._id){
					i.recebido = true;
					i.dataRecebimento = new Date();
					i.rate = that.itemRecebimento.rate;
				}
			});
		}



	}

	removeItem(item){
		this.ordem.itensCompra = this.ordem.itensCompra.filter(i => item.itemEstoque._id != i.itemEstoque._id);
		let that = this;
		that.ordem.precoTotal = 0;
		this.ordem.itensCompra.forEach(i => that.ordem.precoTotal += i.precoTotal);
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

	preencheItem(item){
		console.log(item);
		this.item = item;
	}

	preencheItemRecebimento(item){
		console.log(item);
		this.itemRecebimento = item;
	}

	limpaItem(){
		this.item = new Object;
	}

	limparItemRecebimento(){
		this.itemRecebimento = new Object;
	}

	preenchePacote(){
		var dfrd1 = $.Deferred();		  
		var that = this;

		this.pacoteService.getById(this.item.pacote._id).then(function (response){
			that.item.pacote = response.data;
			dfrd1.resolve();
		});

		return $.when(dfrd1).done(function(){
		}).promise();
	}

};



angular.module("app").controller("ordemCtrl", OrdemController);