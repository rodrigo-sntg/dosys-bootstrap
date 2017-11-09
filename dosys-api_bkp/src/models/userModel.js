'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	login:String,
	senha:String
});

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model("User", UserSchema);