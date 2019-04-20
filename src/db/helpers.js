
const { connectToMongo } = require('./index.js');

let db;

connectToMongo((err, connection) => {
  if (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  } else {
    db = connection;
  }
});

const getUsers = (userId, callback) => {
  let options = {};
  if (userId !== undefined) { options.id = userId; }
  db.collection('users').find(options)
    .toArray((err, result) => callback(err, result));
};

const createUser = (user, callback) => {
  db.collection('users').insertOne(
    user,
    // result.ops[0] is the inserted document
    (err, result) =>  callback(err, result.ops[0])
  );
};

const updateUser = (user, callback) => {
  delete user._id; // Can't set _id (MongoDB throws error)
  db.collection('users').updateOne(
    { id: user.id },
    { $set: user },
    (err, result) => callback(err, result)
  );
};

const getGames = (gameId, callback) => {
  let options = {};
  if (gameId !== undefined) { options.id = gameId; }
  db.collection('games').find(options)
    .toArray((err, result) => callback(err, result));
};

const createGame = (game, callback) => {
  db.collection('games').insertOne(
    game,
    // result.ops[0] is the inserted document
    (err, result) => callback(err, result.ops[0])
  );
};

const updateGame = (game, callback) => {
  delete game._id; // Can't set _id (MongoDB throws error)
  db.collection('games').updateOne(
    { id: game.id },
    { $set: game },
    { upsert: true },
    (err, result) => callback(err, result)
  );
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  getGames,
  createGame,
  updateGame
};
