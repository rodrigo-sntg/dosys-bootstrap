
class CategoryController{
	constructor(categoryService, $stateParams){
		this.categoryService = categoryService;
		this.getAll();
		this.serverErrors = undefined;
		this.edicao = false;
		this.$stateParams = $stateParams;
		if(this.$stateParams.id){
			this.getById(this.$stateParams.id);
			this.edicao = true;
			console.log(this.edicao)
		}

		console.log("CATEGORIA")

		this.getParents();

		this.preencheLista();

		this.data;

	}

	insert (){
		console.log("inserção")
		var that = this;
		this.categoryService.insert(this.category).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};

	update (){
		console.log("edicao")
		var that = this;
		console.log("antiga")
		this.category.original = this.antiga;
		console.log(this.category)
		this.categoryService.update(this.category).then(function (response){
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
			this.serverErrors = erro;
		});
	};




	delete (id){
		var that = this;
		this.categoryService.delete(id).then(function (response){
			that.category = response.data;
			that.getAll();
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getAll (){
		var that = this;
		this.categoryService.getAll().then(function (response){
			that.categoryService.getAll().then(function (response){
				that.categories = response.data;	
			});
		});
	};

	getParents (){
		var that = this;
		this.categoryService.getParents().then(function (response){
			that.categoryService.getParents().then(function (response){
				that.parents = response.data;	
			});
		});
	};

	preencheLista (){
		var that = this;
		that.categoryService.getParents().then(function (response){
			let parents = response.data;

			parents.forEach(function(obj,index,lista){
				that.categoryService.getByParent(obj._id).then(function (response){
					obj.subCategorias = response.data;
				}).catch(function(erro){
					console.log(erro);
				});

			});
			that.lista = parents;
		});
	};

	getById (id){
		var that = this;
		this.categoryService.getById(id).then(function (response){
				that.category = response.data;
				that.antiga = that.category._id;
				console.log(that.antiga)
		}).catch(function(erro){
			console.log(erro);
		});
	};

	getByParent (id){
		var that = this;
		return this.categoryService.getByParent(id).then(function (response){
				return response.data;
		}).catch(function(erro){
			console.log(erro);
		});
	};


	clone(obj) {
	    var copy;

	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	}



};



angular.module("app").controller("categoryCtrl", CategoryController);