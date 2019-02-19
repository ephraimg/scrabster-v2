
require('dotenv').config();
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var app = express();
var root = path.join(__dirname, '../../dist/scrabster-v2');

app.use(express.static(root));
app.use(bodyParser.json());

require('./routeHandlers')(app)

app.listen(process.env.PORT, function() {
	console.log('Server running on port ' + process.env.PORT)	
});
