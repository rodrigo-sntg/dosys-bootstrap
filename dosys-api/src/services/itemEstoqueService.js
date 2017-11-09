'use strict';

const 
	ItemEstoque = require("../models/itemEstoqueModel").ItemEstoque,
	Medida = require("../models/medidaModel").Medida,
	Category = require("../models/categoryModel").Category,
	Entrada = require("../models/entradaModel").Entrada,
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

		itemEstoque.subCategoria = JSON.parse(itemEstoque.subCategoria);

		let subCategory = yield Category.findOne({_id:itemEstoque.subCategoria._id}).populate('parent');

		itemEstoque.subCategoria = subCategory._id;
		itemEstoque.categoria = subCategory.parent._id;



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
		}).populate({
		    path: 'medida',
		    populate: { path: 'unidadeMedida'}
		});

		let subCategory = yield Category.findOne({_id:item.subCategoria}).populate('parent');
		if(subCategory){
			item.subCategoria = subCategory;
			item.categoria = subCategory.parent;
		}


		return item;
	}

	* getAll(){
		return yield ItemEstoque.find().populate({
		    path: 'medida',
		    populate: { path: 'unidadeMedida'}
		});
	}


	* inserirEntrada(itemEstoque){
		console.log(itemEstoque.historicoPrecosCompra)
		itemEstoque.qtdEstoque = 0;
		itemEstoque.custoTotalEstoque = 0;
		let historicoPrecosCompra = itemEstoque.historicoPrecosCompra;
		itemEstoque.historicoPrecosCompra = new Array();

		itemEstoque.medida = JSON.parse(itemEstoque.medida)
		if(itemEstoque.medida._id)
			itemEstoque.medida = itemEstoque.medida._id;

		itemEstoque.categoria = JSON.parse(itemEstoque.categoria)
		if(itemEstoque.categoria._id)
			itemEstoque.categoria = itemEstoque.categoria._id;

		itemEstoque.subCategoria = JSON.parse(itemEstoque.subCategoria)
		if(itemEstoque.subCategoria._id)
			itemEstoque.subCategoria = itemEstoque.subCategoria._id;

		if(historicoPrecosCompra instanceof Array)
			for(var i = 0; i < historicoPrecosCompra.length; i++){
				let o = JSON.parse(historicoPrecosCompra[i]);
				let teste = new Entrada(o);

				teste.save();
				itemEstoque.historicoPrecosCompra.push(teste._id.toString());

				itemEstoque.qtdEstoque += o.quantidade;
				itemEstoque.custoTotalEstoque += o.quantidade * o.precoUnitario;
				itemEstoque.custoUnitario = itemEstoque.custoTotalEstoque / itemEstoque.qtdEstoque;
			}
		else{
			let o = JSON.parse(historicoPrecosCompra);

			let teste = new Entrada(o);

			teste.save();
			itemEstoque.historicoPrecosCompra.push(teste._id.toString());

			itemEstoque.qtdEstoque += o.quantidade;
			itemEstoque.custoTotalEstoque += o.quantidade * o.precoUnitario;
			itemEstoque.custoUnitario = itemEstoque.custoTotalEstoque / itemEstoque.qtdEstoque;
		}


		let item = yield ItemEstoque.update({_id:itemEstoque._id}, itemEstoque);

		console.log(itemEstoque);

		
	}

}

module.exports = new ItemEstoqueService();