'use strict';

const User = require("../models/userModel").User;

class UserService {
	
	* inserir(usuario){
		return User.create(usuario);
	}

	* getAll(){
		return yield User.find();
	}
}

module.exports = new UserService();