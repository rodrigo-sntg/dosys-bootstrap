'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	RateSchema = new Schema({
		entrada: {
			type:Schema.Types.ObjectId,
			ref:"Entrada"
		},
		rate:Number
	})



module.exports.Rate = mongoose.model("Rate", RateSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/