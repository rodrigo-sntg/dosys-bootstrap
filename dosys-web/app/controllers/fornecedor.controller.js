
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

	
	validarCNPJ(cnpj) {

		cnpj = cnpj.replace(/[^\d]+/g,'');

		if(cnpj == '') return false;
		
		if (cnpj.length != 14)
			return false;

		// Elimina CNPJs invalidos conhecidos
		if (cnpj == "00000000000000" || 
			cnpj == "11111111111111" || 
			cnpj == "22222222222222" || 
			cnpj == "33333333333333" || 
			cnpj == "44444444444444" || 
			cnpj == "55555555555555" || 
			cnpj == "66666666666666" || 
			cnpj == "77777777777777" || 
			cnpj == "88888888888888" || 
			cnpj == "99999999999999")
			return false;
			
		// Valida DVs
		let tamanho = cnpj.length - 2
		let numeros = cnpj.substring(0,tamanho);
		let digitos = cnpj.substring(tamanho);
		let soma = 0;
		let pos = tamanho - 7;
		for (let i = tamanho; i >= 1; i--) {
		  soma += numeros.charAt(tamanho - i) * pos--;
		  if (pos < 2)
				pos = 9;
		}
		let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
			return false;
			
		tamanho = tamanho + 1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (let i = tamanho; i >= 1; i--) {
		  soma += numeros.charAt(tamanho - i) * pos--;
		  if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1)){
			console.log(false)
			return false;
		}
			  
		console.log(true);
		return true;
	   
	}

	limparMascaras(){
		this.fornecedor.cnpj = this.fornecedor.cnpj.replace(/\D/g,"");
		this.fornecedor.telefone = this.fornecedor.telefone.replace(/\D/g,"")
	}
};



angular.module("app").controller("fornecedorCtrl", FornecedorController);