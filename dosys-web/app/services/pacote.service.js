function PacoteService($http){
	this.http = $http;
}

PacoteService.prototype.insert = function(pacote){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/pacote',
		params:pacote
	})
}

PacoteService.prototype.update = function(pacote){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/pacote',
		params:pacote
	})
}

PacoteService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/pacote/id/' + id
	})
}

PacoteService.prototype.getAll = function(pacote){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/pacote'
	})
}

PacoteService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/pacote/id/'+ id,
		params:id
	})
}


angular.module("app").service("pacoteService", PacoteService);