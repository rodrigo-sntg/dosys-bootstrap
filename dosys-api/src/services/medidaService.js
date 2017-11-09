'use strict';

const 
	Medida = require("../models/medidaModel").Medida,
	UnidadeMedida = require("../models/unidadeMedidaModel").UnidadeMedida;


class MedidaService {
	
	* insert(medida){
		return Medida.create(medida);
	}

	* update(medida){
		return  Medida.update({_id:medida._id}, medida);
	}

	* delete(id){

		let item = yield Medida.findOne({'_id':id});
		console.log('passou aqui:' + item._id);
		return yield Medida.remove({'_id':id});
	}

	* getById(id){
		let medida = yield Medida.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate();
		return medida;
	}

	* getAll(){
		return yield Medida.find().populate();
	}
}

module.exports = new MedidaService();