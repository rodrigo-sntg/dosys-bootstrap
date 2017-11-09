'use strict';

const 
	Category = require("../models/categoryModel").Category;

class CategoryService {
	
	* insert(category){
		console.log(category)
		let dup = yield this.getById(category._id);
		if(dup){
			return yield Category.update({_id:category._id}, category);
		}
		else{
			return yield Category.create(category);
		}
	}


	* update(category){
		let nova = yield Category.create(category);
		let antiga = yield this.getById(category.original)
		let filhos = yield this.getByParent(category.original);

		for(var i = 0; i<filhos.length;i++){
			filhos[i].parent = nova._id;
			let filho = yield Category.update({_id:filhos[i]._id}, filhos[i]);
		}

		let deleted = yield this.delete(category.original);

		return nova;
	}

	* delete(id){

		let item = yield Category.findOne({'_id':id});

		let filhos = yield this.getByParent(item);

		if(filhos.length > 0)
			for(var i = 0; i<filhos.length;i++){
				let result = yield Category.remove({'_id':filhos[i]._id});
			}

		return yield Category.remove({'_id':id});
	}

	* getById(id){
		let category = Category.findOne({_id:id}, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		});

		return category;
	}

	* getByParent(parent){
		let category = yield Category.find({parent:parent}, function(err, result){
			if (err) { /* handle err */ }
				console.log(err);
				return err;
		    if (result) {
		        return result;
		    } else {
		        return null;
		    }
		});

		return category;
	}

	* getAll(){
		return yield Category.find();
	}

	* getParents(){
		return yield Category.find({parent:undefined});
	}

	* getAllSub(){
		return yield SubCategory.find();
	}
}

module.exports = new CategoryService();