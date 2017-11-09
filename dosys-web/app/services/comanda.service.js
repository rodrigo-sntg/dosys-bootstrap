function ItemConsumoService($http){
	this.http = $http;
}

ItemConsumoService.prototype.insert = function(itemConsumo){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/itemConsumo',
		params:itemConsumo
	})
}

ItemConsumoService.prototype.update = function(itemConsumo){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/itemConsumo',
		params:itemConsumo
	})
}

ItemConsumoService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/itemConsumo/id/' + id
	})
}

ItemConsumoService.prototype.getAll = function(){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/itemConsumo'
	})
}

ItemConsumoService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/itemConsumo/id/'+ id,
		params:id
	})
}


angular.module("app").service("itemConsumoService", ItemConsumoService);