function LoginService($http){
	this.http = $http;
}

LoginService.prototype.login = function(usuario){
	return this.http({
		method:'POST',
		url:'http://localhost:9000/api/users',
		params:usuario
	})
}

LoginService.prototype.listar = function(usuario){
	return this.http({
		method:'GET',
		url:'http://localhost:9000/api/users'
	})
}

angular.module("app").service("loginService", LoginService);