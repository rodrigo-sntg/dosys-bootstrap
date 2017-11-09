'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	EntradaSchema = new Schema({
		data:{type:Date},
		precoCompra:{type:Number}
	})

module.exports.Entrada = mongoose.model("Entrada", EntradaSchema)