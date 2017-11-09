'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	EnderecoSchema = new Schema({
		rua:String,
		cep:Date,
		cidade:String,
		numero:String,
		complemento:String,
		uf:String
	})

module.exports.Endereco = mongoose.model("Endereco", EnderecoSchema)