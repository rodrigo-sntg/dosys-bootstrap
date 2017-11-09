'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	PagamentoSchema = new Schema({
		formaPagamento:String,
		bandeiraCartao:String,
		valorPago:Number,
		troco:Number
	})

module.exports.Pagamento = mongoose.model("Pagamento", PagamentoSchema)