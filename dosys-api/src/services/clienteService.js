'use strict';

const 
	Cliente = require("../models/clienteModel").Cliente,
	Endereco = require("../models/enderecoModel").Endereco,
	DateHelper = require("../helpers/DateHelper");

class ClienteService {
	
	* insert(cliente){

		let clienteDuplicado = yield this.getByCpf(cliente.cpf);
		if(clienteDuplicado == null){
			cliente.endereco = JSON.parse(cliente.endereco);
			let end = yield Endereco.create(cliente.endereco);
			cliente.endereco = end._id;
			return Cliente.create(cliente);
		}else{
			throw new Error("cliente duplicado")
		}
	}

	* update(cliente){
		cliente.endereco = JSON.parse(cliente.endereco);
		console.log(cliente)
		let end;
		console.log("ID ENDERECO - " + cliente.endereco._id);
		if(cliente.endereco._id == undefined){
			let teste = new Endereco(cliente.endereco);
			end = yield Endereco.create(teste);
			cliente.endereco = end._id;
		} else{

			let teste = new Endereco(cliente.endereco);
			end = yield Endereco.update({_id: teste._id}, teste);
		}

		let cli = Cliente.update({_id:cliente._id}, cliente);
		cliente = cli;
		return cliente;
	}

	* delete(id){

		let cli = yield Cliente.findOne({'_id':id});
		console.log('passou aqui:' + cli._id);
		cli.status = false;
		yield Cliente.update({_id:cli._id}, cli);
		return yield Cliente.findOne({'_id':id}).populate('endereco');
	}

	* getByCpf(cpf){
		let cliente = yield Cliente.findOne({'cpf':cpf}, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
				result.dataNascimento = new Date(result.dataNascimento);
		    	
		        return result;
		    } else {
		        return null;
		    }
		}).populate('endereco');
		return cliente;
	}

	// * getById(id){
	// 	let cliente = yield Cliente.findOne({'_id':id}, function(err, result){
	// 		if (err) { /* handle err */ }
	// 			console.log(err);
	// 			return err;
	// 	    if (result) {
	// 			result.dataNascimento = new Date(result.dataNascimento);
		    	
	// 	        return result;
	// 	    } else {
	// 	        return null;
	// 	    }
	// 	}).populate('endereco');
	// 	return cliente;
	// }

	* getById(id){
		let cliente = yield Cliente.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		    	result.dataNascimento = new Date(result.dataNascimento);
		        return result;
		    } else {
		        return null;
		    }
		}).populate('endereco');
		return cliente;
	}

	* getAll(){
		/*return yield Cliente.find({nome:new RegExp('teste')},{'nome':-1}).populate('endereco', 'rua complemento');*/
		return yield Cliente.find().populate();
	}
}

module.exports = new ClienteService();