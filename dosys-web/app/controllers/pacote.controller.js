
class PacoteController{
	constructor(pacoteService, $stateParams){
		this.pacoteService = pacoteService;
		this.getAll();
		this.serverErrors = undefined;
		this.$stateParams = $stateParams;

		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
		}

		this.data;

	}

	insert (){
		var that = this;
		this.pacoteService.insert(this.pacote).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		var that = this;
		this.pacoteService.update(this.pacote).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.pacoteService.delete(this.pacote._id).then(function (response){
			that.pacote = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (id){
		var that = this;
		this.pacoteService.delete(id).then(function (response){
			that.pacote = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.pacoteService.getAll(this.pacote).then(function (response){
			that.pacoteService.getAll().then(function (response){
				console.log(response.data);
				that.pacotes = response.data;	
			});
		});
	};

	getById (id){
		var that = this;
		this.pacoteService.getById(id).then(function (response){
				that.pacote = response.data;
			
		}).catch(function(erro){
			console.log(erro);
		});
	};


};



angular.module("app").controller("pacoteCtrl", PacoteController);