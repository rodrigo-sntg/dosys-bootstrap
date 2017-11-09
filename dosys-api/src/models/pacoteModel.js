'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	PacoteSchema = new Schema({
		nome:String,
		quantidade:Number
	})

module.exports.Pacote = mongoose.model("Pacote", PacoteSchema)
