'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ItemConsumoSchema = new Schema({
		nome:String,
		descricao:String,
		precoVenda:Number,
		custoTotal:Number,
		percentualLucro:Number,
		favorito:Boolean,
		status:Boolean,
		cozinha:Boolean,
		listaItemEstoqueConsumo:[{type:Schema.Types.ObjectId, ref:"ItemEstoqueConsumo"}],
		subCategoria:{type:Schema.Types.ObjectId, ref:"Category"},
		categoria:{type:Schema.Types.ObjectId, ref:"Category"}
	})

module.exports.ItemConsumo = mongoose.model("ItemConsumo", ItemConsumoSchema)


/* EXEMPLO DE COMO POPULAR UM ARRAY
	user.friends.push(newFriend._id);
*/