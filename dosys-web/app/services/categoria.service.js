function CategoriaService($http){
	this.http = $http;
}

CategoriaService.prototype.insert = function(categoria){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/categoria',
		params:categoria
	})
}

CategoriaService.prototype.update = function(categoria){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/categoria',
		params:categoria
	})
}

CategoriaService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/categoria/id/' + id
	})
}

CategoriaService.prototype.getAll = function(){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/categoria'
	})
}

CategoriaService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/categoria/id/'+ id,
		params:id
	})
}


angular.module("app").service("categoriaService", CategoriaService);