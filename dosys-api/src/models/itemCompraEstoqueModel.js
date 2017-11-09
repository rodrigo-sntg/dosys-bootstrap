'use strict';

const 
	mongoose = require("mongoose"),
	ItemEstoque = require("../models/itemEstoqueModel").ItemEstoque,
	Schema = mongoose.Schema,

	ItemCompraEstoqueSchema = new Schema({
		quantidadeSolicitada:Number,
		quantidadeRecebida:Number,
		precoUnitario:Number,
		quantidadePacotes:Number,
		precoTotal:Number,
		dataRecebimento:Date,
		recebido:Boolean,
		dataSolicitação:Date,
		pacote:{type:Schema.Types.ObjectId, ref:"Pacote"},
		rate:{type:Schema.Types.ObjectId, ref:"Rate"},
		itemEstoque:{type:Schema.Types.ObjectId, ref:"ItemEstoque"},
		fornecedor:{type:Schema.Types.ObjectId, ref:"Fornecedor"}
	});


module.exports.ItemCompraEstoqueSchema = ItemCompraEstoqueSchema;
module.exports.ItemCompraEstoque = mongoose.model("ItemCompraEstoque", ItemCompraEstoqueSchema);