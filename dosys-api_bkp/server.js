
const koa = require("koa");
const bodyParser = require("koa-body");
const cors = require("koa-cors");
const corsError = require("koa-cors-error");

var port = 9000;
var server = module.exports = koa();

server.use(cors({
	origin:'*',
	methods:'GET, POST, PUT, PATCH, DELETE'
}));

server.use(bodyParser());
server.listen(port);

require("./src/routers/index")(server);

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dosys', function(erro, db){
	if(erro){
		console.log("erro ao iniciar banco de dados");
		return;
	}
	console.log("MongoDb Online http://localhost:", port);

});