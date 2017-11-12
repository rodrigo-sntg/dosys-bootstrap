'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	FornecedorSchema = new Schema({
		razaoSocial:String,
		nomeFantasia:String,
		email:String,
		cnpj:{type:String, unique:true},
		telefone:String,
		vendedor:String,
		observacoes:String,
		status:Boolean,
		prazoPagamento:Number,
		rate:Number,
		custoMedioFrete:Number,
		endereco: {
			type:Schema.Types.ObjectId,
			ref:"Endereco"
		},
		fornecedoresAlternativos:[{
			type:Schema.Types.ObjectId,
			ref:"Fornecedor"
		}],
		rates:[{
			type:Schema.Types.ObjectId,
			ref:"Rate"
		}]
	})



module.exports.Fornecedor = mongoose.model("Fornecedor", FornecedorSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/