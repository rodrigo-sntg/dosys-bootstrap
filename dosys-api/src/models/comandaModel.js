'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ComandaSchema = new Schema({
		dataEntrada:Date,
		status:Boolean,
		numeroComanda:Number,
		desconto:Number,
		valorTotal:Number,
		valorPago:Number,
		listaItemComanda:[{ type : Schema.Types.ObjectId, ref: 'ItemComanda' }],
		cliente:{type:Schema.Types.ObjectId, ref:"Cliente"},
		listaPagamento:[{ type : Schema.Types.ObjectId, ref: 'Pagamento' }],
	})

module.exports.Comanda = mongoose.model("Comanda", ComandaSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	user.friends.push(newFriend._id);
*/