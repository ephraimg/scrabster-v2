
require('dotenv').config();
var path = require('path');

var root = path.join(__dirname, '../../dist/scrabster-v2');

module.exports = function(app) {

	app.get('*', function(req, res) {
		res.sendFile(path.join(root, '/index.html'));
	});

};

