'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	CategorySchema = new Schema({
		_id:{type:String},
		parent:{
			type:String,
			ref:'Category'
		}
	})



module.exports.Category = mongoose.model("Category", CategorySchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/