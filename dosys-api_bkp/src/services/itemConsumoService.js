'use strict';

const 
	ItemConsumo = require("../models/itemConsumoModel").ItemConsumo,
	SubCategoria = require("../models/subCategoriaModel").SubCategoria,
	Category = require("../models/categoryModel").Category,
	ObjectId = require('mongoose').Types.ObjectId,
	ItemConsumoEstoque = require("../models/itemEstoqueModel").ItemConsumoEstoque;

class ItemConsumoService {
	
	* insert(itemConsumo){
			console.log("entrou criação");
			console.log(itemConsumo)
			return ItemConsumo.create(itemConsumo);
	}

	* update(itemConsumo){
		console.log("entrou update");

		itemConsumo.categoria = JSON.parse(itemConsumo.categoria);
		itemConsumo.subCategoria = JSON.parse(itemConsumo.subCategoria);
		
		// let category = yield Category.find({parent:itemConsumo.categoria._id});
		let id = new ObjectId(itemConsumo.categoria._id)
		console.log(id);
		// let subCategory = yield Category.find({parent:itemConsumo.subCategoria});
		// console.log(itemConsumo.subCategoria._id);
		// itemConsumo.categoria = category;
		// itemConsumo.subCategoria = subCategory;


		

		// console.log(itemConsumo)
		return  ItemConsumo.update({_id:itemConsumo._id}, itemConsumo);
	}

	* delete(id){

		// let item = yield ItemConsumo.findOne({'_id':id});
		// console.log('passou aqui:' + cli._id);
		// item.status = false;
		// yield ItemConsumo.update({_id:cli._id}, item);
		// return yield ItemConsumo.findOne({'_id':id}).populate('subCategoria');


		let item = yield ItemConsumo.findOne({'_id':id});
		return yield ItemConsumo.remove({'_id':id});
	}

	* getById(id){
		let itemConsumo = yield ItemConsumo.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		});
		return itemConsumo;
	}

	* getAll(){
		return yield ItemConsumo.find().populate();
	}
}

module.exports = new ItemConsumoService();