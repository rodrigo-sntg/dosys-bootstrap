'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ItemEstoqueSchema = new Schema({
		nome:String,
		descricao:String,
		status:Boolean,
		qtdEstoque:Number,
		volumeEstoque:Number,
		qtdCritica:Number,
		custoTotalEstoque:Number,
		custoUnitario:Number,
		historicoPrecosCompra: [{type:Schema.Types.ObjectId, ref:"Entrada"}],
		medida:{type:Schema.Types.ObjectId, ref:"Medida"},
		subCategoria:{type:Schema.Types.ObjectId, ref:"SubCategoria"}
	})

module.exports.ItemEstoque = mongoose.model("ItemEstoque", ItemEstoqueSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/