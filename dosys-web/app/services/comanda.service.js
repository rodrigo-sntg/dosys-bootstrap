function ComandaService($http){
	this.http = $http;
}

ComandaService.prototype.insert = function(comanda){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/comanda',
		params:comanda
	})
}

ComandaService.prototype.update = function(comanda){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/comanda',
		params:comanda
	})
}

ComandaService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/comanda/id/' + id
	})
}

ComandaService.prototype.getAll = function(comanda){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/comanda'
	})
}

ComandaService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/comanda/id/'+ id,
		params:id
	})
}

angular.module("app").service("comandaService", ComandaService);