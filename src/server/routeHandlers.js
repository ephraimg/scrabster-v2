
require('dotenv').config();
var path = require('path');
var database = require('../db/helpers.js');

var root = path.join(__dirname, '../../dist/scrabster-v2');

module.exports = function(app) {

    app.get('/users', function (req, res) {
        database.getUsers(req.query.id, (err, users) => {
            if (err) { console.log('getUsers error: ', err); }
            else if (users) { res.send(users); }
        });
    });

    app.get('/games', function (req, res) {
        database.getGames(req.query.id, (err, games) => {
            if (err) { console.log('getGames error: ', err); }
            else if (games) { res.send(games); }
        });
    });

	app.get('*', function(req, res) {
		res.sendFile(path.join(root, '/index.html'));
	});

};

