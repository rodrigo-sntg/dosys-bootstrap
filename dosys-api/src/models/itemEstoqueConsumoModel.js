'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ItemEstoqueConsumoSchema = new Schema({
		medida:{type:Schema.Types.ObjectId, ref:"Medida"},
		itemEstoque:{type:Schema.Types.ObjectId, ref:"ItemEstoque"},
		custo:Number
	})

module.exports.ItemEstoqueConsumo = mongoose.model("ItemEstoqueConsumo", ItemEstoqueConsumoSchema)