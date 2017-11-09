'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	MedidaSchema = new Schema({
		unidadeMedida:{type:Schema.Types.ObjectId, ref:"UnidadeMedida"},
		medidaPorUnidade:Number
	})

module.exports.Medida = mongoose.model("Medida", MedidaSchema)
