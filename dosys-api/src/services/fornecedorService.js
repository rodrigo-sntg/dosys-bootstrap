'use strict';

const 
	Fornecedor = require("../models/fornecedorModel").Fornecedor,
	Endereco = require("../models/enderecoModel").Endereco,
	DateHelper = require("../helpers/DateHelper");

class FornecedorService {
	
	* insert(fornecedor){

		let fornecedorDuplicado = yield this.getByCnpj(fornecedor.cnpj);
		if(fornecedorDuplicado == null){
			fornecedor.endereco = JSON.parse(fornecedor.endereco);
			let end = yield Endereco.create(fornecedor.endereco);
			fornecedor.endereco = end._id;
			return Fornecedor.create(fornecedor);
		}else{
			throw new Error("fornecedor duplicado")
		}
	}

	* update(fornecedor){
		fornecedor.endereco = JSON.parse(fornecedor.endereco);
		console.log(fornecedor)
		let end;
		console.log("ID ENDERECO - " + fornecedor.endereco._id);
		if(fornecedor.endereco._id == undefined){
			let teste = new Endereco(fornecedor.endereco);
			end = yield Endereco.create(teste);
			fornecedor.endereco = end._id;
		} else{

			let teste = new Endereco(fornecedor.endereco);
			end = yield Endereco.update({_id: teste._id}, teste);
		}

		let cli = Fornecedor.update({_id:fornecedor._id}, fornecedor);
		fornecedor = cli;
		return fornecedor;
	}

	* delete(id){

		let cli = yield Fornecedor.findOne({'_id':id});
		console.log('passou aqui:' + cli._id);
		cli.status = false;
		yield Fornecedor.update({_id:cli._id}, cli);
		return yield Fornecedor.findOne({'_id':id}).populate('endereco');
	}

	* getByCnpj(cnpj){
		let fornecedor = yield Fornecedor.findOne({'cnpj':cnpj}, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate('endereco');
		return fornecedor;
	}

	// * getById(id){
	// 	let fornecedor = yield Fornecedor.findOne({'_id':id}, function(err, result){
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
	// 	return fornecedor;
	// }

	* getById(id){
		let fornecedor = yield Fornecedor.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate('endereco');
		return fornecedor;
	}

	* getAll(){
		/*return yield Fornecedor.find({nome:new RegExp('teste')},{'nome':-1}).populate('endereco', 'rua complemento');*/
		return yield Fornecedor.find().populate('endereco');
	}
}

module.exports = new FornecedorService();