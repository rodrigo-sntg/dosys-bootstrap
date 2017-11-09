function OrdemService($http){
	this.http = $http;
}

OrdemService.prototype.insert = function(ordem){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/ordem',
		params:ordem
	})
}

OrdemService.prototype.update = function(ordem){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/ordem',
		params:ordem
	})
}

OrdemService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/ordem/id/' + id
	})
}

OrdemService.prototype.getAll = function(ordem){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/ordem'
	})
}

OrdemService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/ordem/id/'+ id,
		params:id
	})
}

angular.module("app").service("ordemService", OrdemService);