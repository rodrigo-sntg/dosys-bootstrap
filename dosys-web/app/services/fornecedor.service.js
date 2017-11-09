function FornecedorService($http){
	this.http = $http;
}

FornecedorService.prototype.insert = function(fornecedor){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/fornecedor',
		params:fornecedor
	})
}

FornecedorService.prototype.update = function(fornecedor){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/fornecedor',
		params:fornecedor
	})
}

FornecedorService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/fornecedor/id/' + id
	})
}

FornecedorService.prototype.getAll = function(fornecedor){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/fornecedor'
	})
}

FornecedorService.prototype.getByCnpj = function(fornecedor){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/fornecedor/cnpj/'+ fornecedor.cnpj,
		params:fornecedor
	})
}

FornecedorService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/fornecedor/id/'+ id,
		params:id
	})
}

angular.module("app").service("fornecedorService", FornecedorService);