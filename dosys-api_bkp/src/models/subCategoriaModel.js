'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	SubCategoriaSchema = new Schema({
		nome:String,
		categoria:{type:Schema.Types.ObjectId, ref:"Categoria"}
	})

module.exports.SubCategoria = mongoose.model("SubCategoria", SubCategoriaSchema)