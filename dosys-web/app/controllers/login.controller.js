
LoginController = function(loginService){
	this.loginService = loginService;
	this.users = loginService.listar().then(function (response){
		console.log(response.data);
	});
	var vm = this;
};

LoginController.prototype.entrar = function(){
	var that = this;
	this.loginService.login(this.usuario).then(function (response){
		that.loginService.listar().then(function (response){
			console.log(response.data);
		});
	});

};

angular.module("app").controller("loginCtrl", LoginController);