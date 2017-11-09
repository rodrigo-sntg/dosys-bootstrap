'use strict';

const 
	SubCategoria = require("../models/subCategoriaModel").SubCategoria,
	Categoria = require("../models/categoriaModel").Categoria;

class CategoriaService {
	
	* insert(categoria){
			let novaCategoria = new Categoria(categoria);
			categoria._id = novaCategoria._id;
			console.log("entrou criação categoria")
			let subArr = [];
			let arr = categoria.subCategorias;
			for(var i = 0; i< categoria.subCategorias.length;i++){
				if(arr[i].length == 1){
					let sub = new SubCategoria();
					sub.nome = arr;
					sub.categoria = categoria._id;
					console.log(sub.nome)
					let obj = yield SubCategoria.create(sub);
					subArr.push(obj._id);
					break;
				}else{

					let sub = new SubCategoria(); 
					sub.nome = arr[i];
					sub.categoria = categoria._id;
					console.log(sub.nome)
					let obj = yield SubCategoria.create(sub);
					subArr.push(obj._id);
				}
			}



			categoria.subCategorias = subArr;


			
			return Categoria.create(categoria);

	}

	* update(categoria){
		// let item = yield Categoria.findOne({'_id':categoria._id}).populate('subCategorias');
		// for(var i=0; i < item.subCategorias.length; i++){
		// 	console.log('removendo subs' + item.subCategorias[i]._id)
		// 	yield SubCategoria.remove({'_id':item.subCategorias[i]._id});
		// }

		let subArr = [];
		if(categoria.subCategorias){

			let array = categoria.subCategorias;
			console.log(array)
			for(var i = 0; i< categoria.subCategorias.length;i++){
				if(array[i] && array[i].length > 1){
					console.log(array[i])
					let ob = JSON.parse(array[i]);
					if(ob){
						console.log(ob)
						let sub = new SubCategoria({nome:ob.nome});
						sub.categoria = categoria._id;
						sub.save(function (err) {
							if (err) {
								return err;
							}
						  	else {
						  		console.log("Post saved");
						  	}
						});
						subArr.push(sub._id);
					}
				}else if(array[i].length == 1){
					let ob = JSON.parse(array);
					if(ob){
						let sub = new SubCategoria({nome:ob.nome});
						sub.categoria = categoria._id;
						console.log(sub)
						console.log(" --- OBJETO --- ")
							sub.save(function (err) {
								if (err) {
									return err;
								}
							  	else {
							  		console.log("Post saved");
							  	}
							});
							subArr.push(sub._id);
							break;
					}
				}
			}
		}


		categoria.subCategorias = subArr;
		return  Categoria.update({_id:categoria._id}, categoria);

	}

	* delete(id){

		let item = yield Categoria.findOne({'_id':id});
		console.log('passou aqui:' + item._id);
		return yield Categoria.remove({'_id':id});
	}

	* getById(id){
		let categoria = yield Categoria.findOne({'_id':id}).populate("subCategorias");
		return categoria;
	}

	* getAll(){
		return yield Categoria.find().populate("subCategorias");
	}

	* getAllSub(){
		return yield SubCategoria.find();
	}
}

module.exports = new CategoriaService();