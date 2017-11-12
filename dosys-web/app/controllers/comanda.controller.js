
class ComandaController{
	constructor(comandaService, $stateParams){
		this.comandaService = comandaService;
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
		this.comandaService.insert(this.comanda).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		this.limparMascaras();
		var that = this;
		this.comandaService.update(this.comanda).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.comandaService.delete(this.comanda._id).then(function (response){
			that.comanda = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.comandaService.getAll(this.comanda).then(function (response){
			that.comandaService.getAll().then(function (response){
				console.log(response.data);
				that.comandas = response.data;	
			});
		});
	};

	getById (id){
		var that = this;
		this.comandaService.getById(id).then(function (response){
				that.comanda = response.data;
				that.comanda.dataNascimento = new Date(that.comanda.dataNascimento);
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getByCpf (){
		var that = this;
		this.comandaService.getByCpf(this.comanda).then(function (response){
				that.comanda = response.data;
				that.comanda.dataNascimento = new Date(that.comanda.dataNascimento);
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	limparMascaras(){
		this.comanda.cpf = this.comanda.cpf.replace(/\D/g,"");
		this.comanda.telefone = this.comanda.telefone.replace(/\D/g,"")
		this.comanda.rg = this.comanda.rg.replace(/\D/g,"")
	}
};



angular.module("app").controller("comandaCtrl", ComandaController);