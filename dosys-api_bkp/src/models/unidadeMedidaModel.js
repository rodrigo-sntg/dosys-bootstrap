'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	UnidadeMedidaSchema = new Schema({
		unidade:String
	})

module.exports.UnidadeMedida = mongoose.model("UnidadeMedida", UnidadeMedidaSchema)
