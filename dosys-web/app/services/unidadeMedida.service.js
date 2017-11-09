function UnidadeMedidaService($http){
	this.http = $http;
}

UnidadeMedidaService.prototype.insert = function(ItemConsumo){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/unidadeMedida',
		params:ItemConsumo
	})
}

UnidadeMedidaService.prototype.update = function(ItemConsumo){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/unidadeMedida',
		params:ItemConsumo
	})
}

UnidadeMedidaService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/unidadeMedida/id/' + id
	})
}

UnidadeMedidaService.prototype.getAll = function(ItemConsumo){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/unidadeMedida'
	})
}

UnidadeMedidaService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/unidadeMedida/id/'+ id,
		params:id
	})
}


angular.module("app").service("unidadeMedidaService", UnidadeMedidaService);