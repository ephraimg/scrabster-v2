const mockData = require('./mock-data.js');

const getUsers = (googleId, callback) => {
    // let options = {};
    // if (googleId !== undefined) { options.id = googleId; }
    // db.collection('users').find(options)
    //     .toArray((err, result) => {
    //         callback(err, result);
    //     });
    callback(null, mockData.mockUsers);
};


const getGames = (gameId, callback) => {
    // let options = {};
    // if (gameId !== undefined) { options.id = gameId; }
    // db.collection('games').find(options)
    //     .toArray((err, result) => callback(err, result));
    callback(null, mockData.mockGames);
};


module.exports = { getUsers, getGames };
