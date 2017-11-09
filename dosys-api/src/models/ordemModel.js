'use strict';

const 
	mongoose = require("mongoose"),
	Q = require("q"),
	Schema = mongoose.Schema,

	OrdemSchema = new Schema({
		numero:Number,
		dataEnvioPedido:Date,
		dataRecebimento:Date,
		comprador:String,
		prazoEntrega:Number,
		rate:{type:Schema.Types.ObjectId, ref:"Rate"},
		usuarioSolicitador:{type:Schema.Types.ObjectId, ref:"User"},
		fornecedor:{type:Schema.Types.ObjectId, ref:"Fornecedor"},
		status:Number,
		rascunho:Boolean,
		enviada:Boolean,
		recebido:Boolean,
		observacoes:String,
		itensCompra:[{type:Schema.Types.ObjectId, ref:"ItemCompraEstoque"}],
		precoTotal:Number
	});


OrdemSchema.statics.receberItens = function (cb) {
    itensCompra.forEach(item => item.receber());
};

OrdemSchema.statics.getNextSequence = function(name = "seq_order") {
	let db = mongoose.connection;
	let collection = db.collection('counters');
	let that = this;
	var dfrd1 = Q.defer();

	collection.findOne({'_id':'seq_ordem'}, function(err, result) {
	    if (err) {
	    	deferred.reject(new Error(err));
	    }

	    if (result) {
	        dfrd1.resolve(result);
	    } else {
	        // we don't
	    }
	});


   return dfrd1.promise;
}


module.exports.OrdemSchema = OrdemSchema;
module.exports.Ordem = mongoose.model("Ordem", OrdemSchema);