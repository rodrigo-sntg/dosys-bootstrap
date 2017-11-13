'use strict';

const 
	ItemConsumo = require("../models/itemConsumoModel").ItemConsumo,
	SubCategoria = require("../models/subCategoriaModel").SubCategoria,
	ItemEstoqueConsumo = require("../models/itemEstoqueConsumoModel").ItemEstoqueConsumo,
	Medida = require("../models/medidaModel").Medida,
	Category = require("../models/categoryModel").Category,
	ObjectId = require('mongoose').Types.ObjectId,
	ItemConsumoEstoque = require("../models/itemEstoqueModel").ItemConsumoEstoque;

class ItemConsumoService {
	
	* insert(itemConsumo){
			if(!itemConsumo.nome)
				throw new Error("Nome Obrigatório!");
			if(!itemConsumo.categoria || itemConsumo.categoria == "{\"_id\":null}")
				throw new Error("Categoria Obrigatória!");
			if(!itemConsumo.subCategoria || itemConsumo.subCategoria == "{\"_id\":null}")
				throw new Error("Subcategoria Obrigatória!");
			if(!itemConsumo.preco)
				throw new Error("É obrigatório ao menos 1 insumo!");
			if(!itemConsumo.listaItemEstoqueConsumo)
				throw new Error("É obrigatório ao menos 1 insumo!");

			console.log("entrou criação");
			let listaItem = itemConsumo.listaItemEstoqueConsumo;
			itemConsumo.listaItemEstoqueConsumo = new Array();
			itemConsumo.custoTotal = 0;

			if(listaItem != undefined)
			if(listaItem instanceof Array){
				for(var i = 0 ; i < listaItem.length;i++){
					let itemEstoqueConsumo = JSON.parse(listaItem[i]);
					if(itemEstoqueConsumo.medida.unidadeMedida._id)
					itemEstoqueConsumo.medida.unidadeMedida = itemEstoqueConsumo.medida.unidadeMedida._id;

					let medidaTeste = new Medida(itemEstoqueConsumo.medida);
					console.log(medidaTeste);
					medidaTeste.save();
					itemEstoqueConsumo.medida = medidaTeste._id.toString();
					
					itemEstoqueConsumo.itemEstoque = itemEstoqueConsumo.itemEstoque._id;
					let item = new ItemEstoqueConsumo(itemEstoqueConsumo);
					item.save();

					item.custo = Number(item.custo.toFixed(2));
					itemConsumo.custoTotal += item.custo;


					itemConsumo.listaItemEstoqueConsumo.push(item._id.toString());
				}
			}else{


				let itemEstoqueConsumo = JSON.parse(listaItem);
				if(itemEstoqueConsumo.medida.unidadeMedida._id)
					itemEstoqueConsumo.medida.unidadeMedida = itemEstoqueConsumo.medida.unidadeMedida._id;

				let medidaTeste = new Medida(itemEstoqueConsumo.medida);
				console.log(medidaTeste);
				medidaTeste.save();
				itemEstoqueConsumo.medida = medidaTeste._id.toString();
				
				itemEstoqueConsumo.itemEstoque = itemEstoqueConsumo.itemEstoque._id;
				let item = new ItemEstoqueConsumo(itemEstoqueConsumo);
				item.save();

				item.custo = Number(item.custo.toFixed(2));
				itemConsumo.custoTotal += item.custo;


				itemConsumo.listaItemEstoqueConsumo.push(item._id.toString());
			}
			

			return yield ItemConsumo.create(itemConsumo);
	}

	* update(itemConsumo){


		let listaItem = itemConsumo.listaItemEstoqueConsumo;
		itemConsumo.listaItemEstoqueConsumo = new Array();
		itemConsumo.custoTotal = 0;
		if(listaItem != undefined)
		if(listaItem instanceof Array){
			for(var i = 0 ; i < listaItem.length;i++){

				let itemEstoqueConsumo = JSON.parse(listaItem[i]);
				if(itemEstoqueConsumo._id){
					if(!itemEstoqueConsumo.custo){
						let quantidadeItem = itemEstoqueConsumo.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.medida.unidadeMedida.fator));
			            let quantidadeItemEstoque = itemEstoqueConsumo.itemEstoque.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.itemEstoque.medida.unidadeMedida.fator));
			            let porcentagemItem = quantidadeItem / quantidadeItemEstoque;
			            itemEstoqueConsumo.custo = itemEstoqueConsumo.itemEstoque.custoUnitario * porcentagemItem;

					}
					
					itemEstoqueConsumo.custo = Number(itemEstoqueConsumo.custo.toFixed(2));
					ItemEstoqueConsumo.update({_id:itemEstoqueConsumo._id}, itemEstoqueConsumo);
					itemConsumo.custoTotal += itemEstoqueConsumo.custo;
					itemConsumo.listaItemEstoqueConsumo.push(itemEstoqueConsumo._id);
				}else{

					if(!itemEstoqueConsumo.custo){
						let quantidadeItem = itemEstoqueConsumo.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.medida.unidadeMedida.fator));
			            let quantidadeItemEstoque = itemEstoqueConsumo.itemEstoque.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.itemEstoque.medida.unidadeMedida.fator));
			            let porcentagemItem = quantidadeItem / quantidadeItemEstoque;
			            itemEstoqueConsumo.custo = itemEstoqueConsumo.itemEstoque.custoUnitario * porcentagemItem;

					}
					if(itemEstoqueConsumo.medida.unidadeMedida._id)
						itemEstoqueConsumo.medida.unidadeMedida = itemEstoqueConsumo.medida.unidadeMedida._id;

					let medidaTeste = new Medida(itemEstoqueConsumo.medida);
					console.log(medidaTeste);
					medidaTeste.save();
					itemEstoqueConsumo.medida = medidaTeste._id.toString();
					
					itemEstoqueConsumo.itemEstoque = itemEstoqueConsumo.itemEstoque._id;
					let item = new ItemEstoqueConsumo(itemEstoqueConsumo);
					item.save();
					itemEstoqueConsumo.custo = Number(itemEstoqueConsumo.custo.toFixed(2));
					itemConsumo.custoTotal += itemEstoqueConsumo.custo;


					itemConsumo.listaItemEstoqueConsumo.push(item._id.toString());
				}
				
			}
		}else{

			let itemEstoqueConsumo = JSON.parse(listaItem);
			itemEstoqueConsumo.medida.unidadeMedida = itemEstoqueConsumo.medida.unidadeMedida._id;
			if(itemEstoqueConsumo._id){
				if(!itemEstoqueConsumo.custo){
					let quantidadeItem = itemEstoqueConsumo.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.medida.unidadeMedida.fator));
		            let quantidadeItemEstoque = itemEstoqueConsumo.itemEstoque.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.itemEstoque.medida.unidadeMedida.fator));
		            let porcentagemItem = quantidadeItem / quantidadeItemEstoque;
		            itemEstoqueConsumo.custo = itemEstoqueConsumo.itemEstoque.custoUnitario * porcentagemItem;

				}
				itemEstoqueConsumo.custo = Number(itemEstoqueConsumo.custo.toFixed(2));
				ItemEstoqueConsumo.update({_id:itemEstoqueConsumo._id}, itemEstoqueConsumo);
				itemConsumo.custoTotal += itemEstoqueConsumo.custo;
				itemConsumo.listaItemEstoqueConsumo.push(itemEstoqueConsumo._id);
			}else{
				if(!itemEstoqueConsumo.custo){
					let quantidadeItem = itemEstoqueConsumo.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.medida.unidadeMedida.fator));
		            let quantidadeItemEstoque = itemEstoqueConsumo.itemEstoque.medida.medidaPorUnidade * (Math.pow(10,itemEstoqueConsumo.itemEstoque.medida.unidadeMedida.fator));
		            let porcentagemItem = quantidadeItem / quantidadeItemEstoque;
		            itemEstoqueConsumo.custo = itemEstoqueConsumo.itemEstoque.custoUnitario * porcentagemItem;

				}

				if(itemEstoqueConsumo.medida.unidadeMedida._id)
					itemEstoqueConsumo.medida.unidadeMedida = itemEstoqueConsumo.medida.unidadeMedida._id;

				let medidaTeste = new Medida(itemEstoqueConsumo.medida);
				console.log(medidaTeste);
				medidaTeste.save();
				itemEstoqueConsumo.medida = medidaTeste._id.toString();

				itemEstoqueConsumo.custo = Number(itemEstoqueConsumo.custo.toFixed(2));
				itemConsumo.custoTotal += itemEstoqueConsumo.custo;
				
				itemEstoqueConsumo.itemEstoque = itemEstoqueConsumo.itemEstoque._id;
				let item = new ItemEstoqueConsumo(itemEstoqueConsumo);
				item.save();


				itemConsumo.listaItemEstoqueConsumo.push(item._id.toString());
			}

		}

		itemConsumo.custoTotal = Number(itemConsumo.custoTotal.toFixed(2));


		// console.log(itemConsumo._id)
		return yield ItemConsumo.update({_id:itemConsumo._id}, itemConsumo);
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
		}).populate({
		    path: 'listaItemEstoqueConsumo',
		    populate: { path: 'medida', model: 'Medida', populate: {path:'unidadeMedida'}}
		}).populate({
		    path: 'listaItemEstoqueConsumo',
		    populate: { path: 'itemEstoque', 
						populate: 
		    			{	path: 'medida',
		    				populate: { path: 'unidadeMedida' }
		    			}},
		});

		let subCategory = yield Category.findOne({_id:itemConsumo.subCategoria}).populate('parent');
		if(subCategory){
			itemConsumo.subCategoria = subCategory;
			itemConsumo.categoria = subCategory.parent;
		}
		console.log(itemConsumo)


		return itemConsumo;
	}

	* getAll(){
		return yield ItemConsumo.find().populate('subCategory').populate({
		    path: 'listaItemEstoqueConsumo',
		    populate: 	{ path: 'medida', model: 'Medida', 
		    				populate: {	path:'unidadeMedida'}
		    			}
		}).populate({
		    path: 'listaItemEstoqueConsumo',
		    populate: 
		    	{ 	path: 'itemEstoque',
		    		populate: 
		    			{	path: 'medida',
		    				populate: { path: 'unidadeMedida' }
		    			}
				}
		});
	}
}

module.exports = new ItemConsumoService();