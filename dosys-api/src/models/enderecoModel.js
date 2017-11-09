'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	EnderecoSchema = new Schema({
		rua:String,
		cep:String,
		cidade:String,
		numero:String,
		complemento:String,
		uf:String
	})

module.exports.Endereco = mongoose.model("Endereco", EnderecoSchema)