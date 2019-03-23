// Import Node Modules
let express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
let server = express()

// Templates motor
server.set('view engine', 'ejs')

// MIDDLEWARE
server.use('/static', express.static('static'))
server.use(bodyParser.urlencoded({extended: false }))
server.use(bodyParser.json())
require('./routes')(server);

// Autorisation cross-domain
var allowCrossDomain = function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}
server.use(allowCrossDomain);







// START server
const port = 8080;
console.log('listening on ' + port)
server.listen(port)

//on close
process.stdin.resume();//so the program will not close instantly

function exitHandler(err, options) {
	console.log('close API, bye !')
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}