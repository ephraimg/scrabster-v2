
require('dotenv').config();
var path = require('path');
var database = require('../db/helpers.js');
var emailHelpers = require('./emailHelpers');

var root = path.join(__dirname, '../../dist/scrabster-v2');

module.exports = function(app) {

    app.get('/users', function (req, res) {
      database.getUsers(req.query.id, (err, users) => {
        if (err) { console.log('getUsers error: ', err); }
        else if (users) { res.send(users); }
      });
    });

    app.post('/users', function (req, res) {
      database.createUser(req.body, (err, user) => {
        if (err) { console.log('post users error: ', err); }
        else if (user) { res.send(user); }
      });
    });

  app.put('/users', function (req, res) {
    database.updateUser(req.body, (err, result) => {
      if (err) { console.log('put users error: ', err); }
      if (result) { res.send(result); }
    });
  });

  app.get('/games', function (req, res) {
    database.getGames(req.query.id, (err, games) => {
      if (err) { console.log('get games error: ', err); }
      else if (games) { res.send(games); }
    });
  });

  app.post('/games', function (req, res) {
    database.createGame(req.body, (err, result) => {
      if (err) { console.log('post games error: ', err); }
      if (result) { res.send(result); }
    });
  });

  app.put('/games', function (req, res) {
    database.updateGame(req.body, (err, result) => {
      if (err) { console.log('put games error: ', err); }
      if (result) { res.send(result); }
    });
  });

	app.get('*', function(req, res) {
		res.sendFile(path.join(root, '/index.html'));
  });
  
  app.post('/email', function(req, res) {
    var mailer = emailHelpers.mailer;
    var mailerConfig = emailHelpers.makeMailerConfig(req.body);
    mailer.sendMail(mailerConfig, function (err, data) {
      if (err) { return console.log(err); }
      res.sendStatus(201);
    });
  })

};

