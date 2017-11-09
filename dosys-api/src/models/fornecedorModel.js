'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	FornecedorSchema = new Schema({
		razaoSocial:String,
		nomeFantasia:String,
		status:Boolean,
		email:String,
		endereco: {
			type:Schema.Types.ObjectId,
			ref:"Endereco"
		},
		cnpj:{type:String, unique:true},
		telefone:String,
		vendedor:String,
		prazoPagamento:Number,
		fornecedoresAlternativos:[{
			type:Schema.Types.ObjectId,
			ref:"Fornecedor"
		}],
		rate:Number,
		custoMedioFrete:Number,
		observacoes:String,
		rates:[{
			type:Schema.Types.ObjectId,
			ref:"Rate"
		}]
	})



module.exports.Fornecedor = mongoose.model("Fornecedor", FornecedorSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/