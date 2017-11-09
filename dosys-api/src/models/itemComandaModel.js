'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ItemComandaSchema = new Schema({
		dataEntrada:Date,
		item:{type:Schema.Types.ObjectId, ref:"ItemConsumo"}
	})

module.exports.ItemComanda = mongoose.model("ItemComanda", ItemComandaSchema)