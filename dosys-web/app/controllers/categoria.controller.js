
class CategoriaController{
	constructor(categoriaService, $stateParams){
		this.subCategorias = [];
		this.categoriaService = categoriaService;
		this.getAll();
		this.serverErrors = undefined;
		this.$stateParams = $stateParams;
		console.log(this.$stateParams.id);
		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
		}

		this.data;

	}

	insert (){
		var that = this;
		that.categoria.subCategorias = that.subCategorias.map(val => val.nome);
		console.log(this.categoria.subCategorias);
		this.categoriaService.insert(this.categoria).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		var that = this;
		console.log(that.categoria);
		this.categoriaService.update(this.categoria).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (){
		var that = this;
		this.categoriaService.delete(this.categoria._id).then(function (response){
			that.categoria = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	delete (id){
		var that = this;
		this.categoriaService.delete(id).then(function (response){
			that.categoria = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.categoriaService.getAll().then(function (response){
			that.categoriaService.getAll().then(function (response){
				console.log(response.data);
				that.categorias = response.data;	
			});
		});
	};

	getById (){
		var that = this;
		this.categoriaService.getByCpf(this.categoria).then(function (response){
				that.categoria = response.data;
				that.subCategorias = categoria.subCategorias;
			
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getById (id){
		var that = this;
		this.categoriaService.getById(id).then(function (response){
				that.categoria = response.data;
				that.subCategorias = that.categoria.subCategorias;
		}).catch(function(erro){
			console.log(erro);
		});
	};


	addNewSubCategoria () {
		let that = this;
	    
	    let newItemNo = this.subCategorias.length+1;
	    this.subCategorias.push({newItemNo});
  	};
	    
	removeSubCategoria() {
		let that = this;
		let lastItem = this.subCategorias.length-1;
		this.subCategorias.splice(lastItem);
	};

};



angular.module("app").controller("categoriaCtrl", CategoriaController);