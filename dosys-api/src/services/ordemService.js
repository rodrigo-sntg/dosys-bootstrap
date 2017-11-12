'use strict';

const 
	Ordem = require("../models/ordemModel").Ordem,
	mongoose = require("mongoose"),
	ItemCompraEstoque = require("../models/itemCompraEstoqueModel").ItemCompraEstoque,
	ObjectId = require('mongoose').Types.ObjectId,
	ItemEstoque = require("../models/itemEstoqueModel").ItemEstoque,
	Rate = require("../models/rateModel").Rate;

class OrdemService {
	
	* insert(ordem){
		let that = this;
		if(ordem.rate){
			

			if(ordem.rate._id){				
				ordem.rate = JSON.parse(ordem.rate);
				let rate = yield Rate.create(ordem.rate);
				ordem.rate = rate._id;	
			}
		}
		if(ordem.fornecedor){
			if(ordem.fornecedor._id){				
				ordem.fornecedor = JSON.parse(ordem.fornecedor);
				ordem.fornecedor = ordem.fornecedor._id;
			}
		}

		if(ordem.pacote){
			if(ordem.pacote._id){				
				ordem.pacote = JSON.parse(ordem.pacote);
				ordem.pacote = ordem.pacote._id;
			}
		}

		let listaItem = ordem.itensCompra;
		ordem.itensCompra = new Array();

		if(listaItem)
		if(listaItem instanceof Array){
				for(var i = 0 ; i < listaItem.length;i++){
					let item = JSON.parse(listaItem[i]);

					item.itemEstoque = item.itemEstoque._id;
					let novoItem = new ItemCompraEstoque(item);
					novoItem.save();

					ordem.itensCompra.push(novoItem._id.toString());
				}
			}else{


				let item = JSON.parse(listaItem);
				
				item.itemEstoque = item.itemEstoque._id;
				let novoItem = new ItemCompraEstoque(item);

				novoItem.save();

				ordem.itensCompra.push(novoItem._id.toString());
			}


		return Ordem.getNextSequence().then(function(res){
			// ordem.status = 1;
			ordem.numero = res.seq;

			let db = mongoose.connection;
			let collection = db.collection('counters');
			let that = this;
			res.seq++;

			collection.update({_id:res._id}, res);


			return Ordem.create(ordem);
		});

	}

	* update(ordem){
		
		if(ordem.fornecedor){
			ordem.fornecedor = JSON.parse(ordem.fornecedor);
			ordem.fornecedor = ordem.fornecedor._id;
		}

		if(ordem.pacote){
			ordem.pacote = JSON.parse(ordem.pacote);
			ordem.pacote = ordem.pacote._id;
		}

		let listaItem = ordem.itensCompra;
		ordem.itensCompra = new Array();

		if(listaItem)
			if(listaItem instanceof Array){
				for(var i = 0 ; i < listaItem.length;i++){
					let item = JSON.parse(listaItem[i]);

					

					if(item.recebido){
						
						item.itemEstoque.qtdEstoque += item.quantidadeSolicitada;
						item.itemEstoque.custoTotalEstoque += item.precoTotal;
						item.itemEstoque.custoUnitario = item.itemEstoque.custoTotalEstoque / item.itemEstoque.qtdEstoque;


						let updateItemEstoque = yield ItemEstoque.update({_id:item.itemEstoque._id}, item.itemEstoque);
						item.itemEstoque = item.itemEstoque._id;

						if(ordem.rate.rate){
							ordem.rate.rate = (ordem.rate.rate + item.rate.rate)/2;
						}else{
							ordem.rate = {};
							ordem.rate.rate = item.rate.rate;
							
						}


						// let itemEstoque = new ItemEstoque(item.itemEstoque);
						// itemEstoque.save();
							
					}

					if(item.rate && item.rate._id){
						// rate = yield Rate.update({_id:ordem.rate._id}, ordem.rate);
						let rateObj = new Rate(item.rate);
						rateObj.save();
						item.rate = rateObj._id.toString();
					}
					else if(item.rate){
						let rateObj = new Rate(item.rate);
						rateObj.save();
						item.rate = rateObj._id.toString();
					}

					// if(ordem.rate){
					// 	ordem.rate = JSON.parse(ordem.rate);
					// 	let rate;
					// 	if(ordem.rate._id){
					// 		// rate = yield Rate.update({_id:ordem.rate._id}, ordem.rate);
					// 		let rateObj = new Rate(ordem.rate);
					// 		rateObj.save();
					// 		ordem.rate = rateObj._id.toString();
					// 	}
					// 	else{
					// 		let rateObj = new Rate(ordem.rate);
					// 		rateObj.save();
					// 		ordem.rate = rateObj._id.toString();
					// 	}
					// }
					

					// let novoItem = new ItemCompraEstoque(item);
					// novoItem.save();

					

					let updateItem = item;

					if(!item._id)
						updateItem = yield ItemCompraEstoque.create(item);
					else
						updateItem = yield ItemCompraEstoque.update({_id:item._id}, item);
					
					// item.itemEstoque = item.updateItemEstoque._id;

					// let id = new ObjectId(novoItem._id.toString())
					if(!updateItem._id)
						ordem.itensCompra.push(item._id);
					else{
						if(updateItem._id instanceof ObjectId)
							ordem.itensCompra.push(updateItem._id.toString());
						else
							ordem.itensCompra.push(updateItem._id);
					}
				}
			}else{


				let item = JSON.parse(listaItem);
				
				


				if(item.recebido){
						
						item.itemEstoque.qtdEstoque += item.quantidadeSolicitada;
						item.itemEstoque.custoTotalEstoque += item.precoTotal;
						item.itemEstoque.custoUnitario = item.itemEstoque.custoTotalEstoque / item.itemEstoque.qtdEstoque;


						let updateItemEstoque = yield ItemEstoque.update({_id:item.itemEstoque._id}, item.itemEstoque);
						item.itemEstoque = item.itemEstoque._id;

						ordem.rate = {};
						ordem.rate.rate = item.rate.rate;


						// let itemEstoque = new ItemEstoque(item.itemEstoque);
						// itemEstoque.save();
							
					}

					if(item.rate._id){
						// rate = yield Rate.update({_id:ordem.rate._id}, ordem.rate);
						let rateObj = new Rate(item.rate);
						rateObj.save();
						item.rate = rateObj._id.toString();
					}
					else{
						let rateObj = new Rate(item.rate);
						rateObj.save();
						item.rate = rateObj._id.toString();
					}

					// if(ordem.rate){
					// 	try{
					// 		ordem.rate = JSON.parse(ordem.rate);

					// 	}catch(error){
							
					// 	}
					// 	let rate;
					// 	if(ordem.rate._id){
					// 		// rate = yield Rate.update({_id:ordem.rate._id}, ordem.rate);
					// 		let rateObj = new Rate(ordem.rate);
					// 		rateObj.save();
					// 		ordem.rate = rateObj._id.toString();
					// 	}
					// 	else{
					// 		let rateObj = new Rate(ordem.rate);
					// 		rateObj.save();
					// 		ordem.rate = rateObj._id.toString();
					// 	}
					// }
					

					// let novoItem = new ItemCompraEstoque(item);
					// novoItem.save();

					

					let updateItem = item;

					if(!item._id)
						updateItem = yield ItemCompraEstoque.create(item);
					else
						updateItem = yield ItemCompraEstoque.update({_id:item._id}, item);
					
					// item.itemEstoque = item.updateItemEstoque._id;

					// let id = new ObjectId(novoItem._id.toString())
					if(!updateItem._id)
						ordem.itensCompra.push(item._id);
					else
						ordem.itensCompra.push(updateItem._id);
			}

		// let ordemSalva = new Ordem(ordem);
		// ordemSalva.save();


		if(ordem.rate){
			try{
				ordem.rate = JSON.parse(ordem.rate);

			}catch(error){
				
			}
			let rate;
			if(ordem.rate._id){
				// rate = yield Rate.update({_id:ordem.rate._id}, ordem.rate);
				let rateObj = new Rate(ordem.rate);
				rateObj.save();
				ordem.rate = rateObj._id.toString();
			}
			else{
				let rateObj = new Rate(ordem.rate);
				rateObj.save();
				ordem.rate = rateObj._id.toString();
			}
		}



		return yield Ordem.update({_id:ordem._id}, ordem);
	}

	* delete(id){
		// let ordem = yield Ordem.findOne({'_id':id});
		// ordem.status = false;
		// yield Ordem.update({_id:ordem._id}, ordem);
		// return yield Ordem.findOne({'_id':id}).populate('fornecedor').populate('rate');
		return yield Ordem.remove({'_id':id});
	}

	* getById(id){
		let ordem = yield Ordem.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate('fornecedor').populate('rate').populate({ path: 'itensCompra', populate: { path: 'itemEstoque'} }).populate({ path: 'itensCompra', populate: { path: 'rate'} });;
		return ordem;
	}

	* getAll(){
		/*return yield Ordem.find({nome:new RegExp('teste')},{'nome':-1}).populate('endereco', 'rua complemento');*/
		return yield Ordem.find().populate().populate('fornecedor').populate('rate').populate({ path: 'itensCompra', populate: { path: 'itemEstoque'} });
	}
}

module.exports = new OrdemService();