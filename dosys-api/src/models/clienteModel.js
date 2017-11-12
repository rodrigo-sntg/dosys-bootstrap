'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ClienteSchema = new Schema({
		nome:{type:String},
		email:{type:String},
		dataNascimento:Date,
		cpf:{type:String, unique:true},
		status:Boolean,
		rg:{type:String, unique:true},
		telefone:String,
		endereco: {
			type:Schema.Types.ObjectId,
			ref:"Endereco"
		}
	})

module.exports.Cliente = mongoose.model("Cliente", ClienteSchema)