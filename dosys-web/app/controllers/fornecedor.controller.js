
class FornecedorController{
	constructor(fornecedorService, $stateParams){
		this.fornecedorService = fornecedorService;
		this.getAll ();
		this.serverErrors = undefined;
		this.$stateParams = $stateParams;
		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
		}

		this.data;
	}

	insert (){
		this.limparMascaras;
		var that = this;
		this.fornecedorService.insert(this.fornecedor).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		var that = this;
		this.fornecedorService.update(this.fornecedor).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.fornecedorService.delete(this.fornecedor._id).then(function (response){
			that.fornecedor = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.fornecedorService.getAll(this.fornecedor).then(function (response){
			that.fornecedorService.getAll().then(function (response){
				console.log(response.data);
				that.fornecedores = response.data;	
			});
		});
	};

	getById (id){
		var that = this;
		this.fornecedorService.getById(id).then(function (response){
				that.fornecedor = response.data;
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getByCnpj (){
		var that = this;
		this.fornecedorService.getByCnpj(this.fornecedor).then(function (response){
				that.fornecedor = response.data;
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	limparMascaras(){
		this.fornecedor.cnpj = this.fornecedor.cnpj.replace(/\D/g,"");
		this.fornecedor.telefone = this.fornecedor.telefone.replace(/\D/g,"")
	}
};



angular.module("app").controller("fornecedorCtrl", FornecedorController);