
class ClienteController{
	constructor(clienteService, $stateParams){
		this.clienteService = clienteService;
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
		this.clienteService.insert(this.cliente).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		this.limparMascaras();
		var that = this;
		this.clienteService.update(this.cliente).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.clienteService.delete(this.cliente._id).then(function (response){
			that.cliente = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.clienteService.getAll(this.cliente).then(function (response){
			that.clienteService.getAll().then(function (response){
				console.log(response.data);
				that.clientes = response.data;	
			});
		});
	};

	getById (id){
		var that = this;
		this.clienteService.getById(id).then(function (response){
				that.cliente = response.data;
				that.cliente.dataNascimento = new Date(that.cliente.dataNascimento);
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getByCpf (){
		var that = this;
		this.clienteService.getByCpf(this.cliente).then(function (response){
				that.cliente = response.data;
				that.cliente.dataNascimento = new Date(that.cliente.dataNascimento);
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	limparMascaras(){
		this.cliente.cpf = this.cliente.cpf.replace(/\D/g,"");
		this.cliente.telefone = this.cliente.telefone.replace(/\D/g,"")
		this.cliente.rg = this.cliente.rg.replace(/\D/g,"")
	}
};



angular.module("app").controller("clienteCtrl", ClienteController);