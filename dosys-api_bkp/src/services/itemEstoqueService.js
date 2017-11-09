'use strict';

const 
	ItemEstoque = require("../models/itemEstoqueModel").ItemEstoque,
	Medida = require("../models/medidaModel").Medida,
	Categoria = require("../models/categoriaModel").Categoria;

class ItemEstoqueService {
	
	* insert(itemEstoque){
			itemEstoque.medida = JSON.parse(itemEstoque.medida);
			let medidaObj = new Medida(itemEstoque.medida);
			let medida = yield Medida.create(medidaObj);
			itemEstoque.medida = medida._id;

			return ItemEstoque.create(itemEstoque);
	}

	* update(itemEstoque){

		itemEstoque.medida = JSON.parse(itemEstoque.medida);
		let medida;
		if(itemEstoque.medida._id == undefined){
			let teste = new Medida(itemEstoque.medida);
			medida = yield Medida.create(teste);
			itemEstoque.medida = medida._id;
		} else{

			let teste = new Medida(itemEstoque.medida);
			medida = yield Medida.update({_id: teste._id}, teste);
		}

		let item = ItemEstoque.update({_id:itemEstoque._id}, itemEstoque);
		itemEstoque = item;
		return itemEstoque;
	}

	* delete(id){
		let item = yield ItemEstoque.findOne({'_id':id});
		console.log('deletado:' + item._id);
		return yield ItemEstoque.remove({'_id':id});
	}

	* getById(id){
		let item = yield ItemEstoque.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate('medida');
		return item;
	}

	* getAll(){
		return yield ItemEstoque.find().populate("medida");
	}
}

module.exports = new ItemEstoqueService();