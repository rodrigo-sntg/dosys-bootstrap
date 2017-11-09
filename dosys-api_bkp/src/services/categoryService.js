'use strict';

const 
	Category = require("../models/categoryModel").Category;

class CategoryService {
	
	* insert(category){
			let dup = yield this.getById(category._id);
			if(dup){
				return yield Category.update({_id:category._id}, category);
			}
			else{
				return yield Category.create(category);
				
			}

	}

	* update(category){
		return  yield Category.update({_id:category._id}, category);

	}

	* delete(id){

		let item = yield Category.findOne({'_id':id});
		console.log('passou aqui:' + item._id);
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