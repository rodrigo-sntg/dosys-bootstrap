'use strict';

const 
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	
	ItemEstoqueSchema = new Schema({
		nome:String,
		descricao:String,
		status:Boolean,
		qtdEstoque:{type:Number, default:0},
		volumeEstoque:{type:Number, default:0},
		qtdCritica:{type:Number, default:0},
		custoTotalEstoque:{type:Number, default:0},
		custoUnitario:{type:Number, default:0},
		historicoPrecosCompra: [{type:Schema.Types.ObjectId, ref:"Entrada"}],
		medida:{type:Schema.Types.ObjectId, ref:"Medida"},
		subCategoria:{type:String, ref:"Category"},
		categoria:{type:String, ref:"Category"}
	})


// Getter
ItemEstoqueSchema.path('custoTotalEstoque').get(function(num) {
  return custoTotalEstoque.toFixed(2);
});

// Getter
ItemEstoqueSchema.path('custoUnitario').get(function(num) {
  return custoUnitario.toFixed(2);
});

module.exports.ItemEstoque = mongoose.model("ItemEstoque", ItemEstoqueSchema)

/* EXEMPLO DE COMO POPULAR UM ARRAY
	item.historicoPrecosCompra.push(newEntrada._id),
*/