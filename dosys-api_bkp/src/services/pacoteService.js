'use strict';

const 
	Pacote = require("../models/pacoteModel").Pacote;

class PacoteService {
	
	* insert(pacote){
			return Pacote.create(pacote);
	}

	* update(pacote){
		return  Pacote.update({_id:pacote._id}, pacote);
	}

	* delete(id){

		let item = yield Pacote.findOne({'_id':id});
		return yield Pacote.remove({'_id':id});
	}

	* getById(id){
		let pacote = yield Pacote.findById(id, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		}).populate();
		return pacote;
	}

	* getAll(){
		return yield Pacote.find().populate();
	}
}

module.exports = new PacoteService();