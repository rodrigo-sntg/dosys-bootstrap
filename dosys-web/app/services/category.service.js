function CategoryService($http){
	this.http = $http;
}

CategoryService.prototype.insert = function(category){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/category',
		params:category
	})
}

CategoryService.prototype.update = function(category){
	return this.http({
		method:'PUT',
		url:'http://localhost:9000/api/category',
		params:category
	})
}

CategoryService.prototype.delete = function(id){
	return this.http({
		method:'DELETE',
		url:'http://localhost:9000/api/category/id/' + id
	})
}

CategoryService.prototype.getAll = function(){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/category'
	})
}

CategoryService.prototype.getParents = function(){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/category/parents'
	})
}



CategoryService.prototype.getById = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/category/id/'+ id,
		params:id
	})
}

CategoryService.prototype.getByParent = function(id){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/category/parent/'+ id,
		params:id
	})
}

angular.module("app").service("categoryService", CategoryService);