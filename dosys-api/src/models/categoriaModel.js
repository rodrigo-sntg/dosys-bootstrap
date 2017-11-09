'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	CategoriaSchema = new Schema({
		nome:String,
		subCategorias:[{type:Schema.Types.ObjectId, ref:"SubCategoria"}]
	})

module.exports.Categoria = mongoose.model("Categoria", CategoriaSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/