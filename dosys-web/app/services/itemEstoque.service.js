function ItemEstoqueService($http){
	this.http = $http;
}

ItemEstoqueService.prototype.insert = function(itemEstoque){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/itemEstoque',
		params:itemEstoque
	})
}

ItemEstoqueService.prototype.update = function(itemEstoque){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/itemEstoque',
		params:itemEstoque
	})
}

ItemEstoqueService.prototype.inserirEntrada = function(itemEstoque){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/itemEstoque/entrada/',
		params:itemEstoque
	})
}

ItemEstoqueService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/itemEstoque/id/' + id
	})
}

ItemEstoqueService.prototype.getAll = function(itemEstoque){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/itemEstoque'
	})
}

ItemEstoqueService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/itemEstoque/id/'+ id,
		params:id
	})
}


angular.module("app").service("itemEstoqueService", ItemEstoqueService);