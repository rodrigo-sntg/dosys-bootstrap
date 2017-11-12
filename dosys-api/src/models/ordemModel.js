'use strict';

const 
	mongoose = require("mongoose"),
	Q = require("q"),
	Schema = mongoose.Schema,

	OrdemSchema = new Schema({
		comprador:String,
		observacoes:String,
		dataEnvioPedido:Date,
		dataRecebimento:Date,
		rascunho:Boolean,
		enviada:Boolean,
		recebido:Boolean,
		status:Number,
		numero:Number,
		prazoEntrega:Number,
		precoTotal:Number,
		rate:{type:Schema.Types.ObjectId, ref:"Rate"},
		usuarioSolicitador:{type:Schema.Types.ObjectId, ref:"User"},
		fornecedor:{type:Schema.Types.ObjectId, ref:"Fornecedor"},
		itensCompra:[{type:Schema.Types.ObjectId, ref:"ItemCompraEstoque"}]
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