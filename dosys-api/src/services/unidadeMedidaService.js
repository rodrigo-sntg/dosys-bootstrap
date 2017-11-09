'use strict';

const 
	UnidadeMedida = require("../models/unidadeMedidaModel").UnidadeMedida;

class UnidadeMedidaService {
	
	* insert(unidadeMedida){
			console.log("entrou criação estoque");
			console.log(unidadeMedida)
			return UnidadeMedida.create(unidadeMedida);
	}

	* update(unidadeMedida){
		return  UnidadeMedida.update({_id:unidadeMedida._id}, unidadeMedida);
	}

	* delete(id){

		let item = yield UnidadeMedida.findOne({'_id':id});
		console.log('passou aqui:' + item._id);
		return yield UnidadeMedida.remove({'_id':id});
	}

	* getById(id){
		let unidadeMedida = yield UnidadeMedida.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate();
		return unidadeMedida;
	}

	* getAll(){
		return yield UnidadeMedida.find().populate();
	}
}

module.exports = new UnidadeMedidaService();