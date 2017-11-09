'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
EntradaSchema = new Schema({
	dataEntrada:{type:Date},
	quantidade:{type:Number},
	precoUnitario:Number,
	precoCompra:{type:Number}
});

EntradaSchema.pre('save', function(next) {
  	this.dataEntrada = Date.now();
  	next();
});


module.exports.Entrada = mongoose.model("Entrada", EntradaSchema)