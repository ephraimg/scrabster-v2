const mockData = require('./mock-data.js');

const getUsers = (userId, callback) => {
    // let options = {};
    // if (googleId !== undefined) { options.id = googleId; }
    // db.collection('users').find(options)
    //     .toArray((err, result) => {
    //         callback(err, result);
    //     });

    if (userId !== undefined) {
        const targetUser = mockData.mockUsers.find(user => user.id === userId);
        if (!targetUser) {
            callback(new Error('User not found'), null);
        } else {
            callback(null, targetUser);
        }
    } else {
        callback(null, mockData.mockUsers);
    }
};


const getGames = (gameId, callback) => {
    // let options = {};
    // if (gameId !== undefined) { options.id = gameId; }
    // db.collection('games').find(options)
    //     .toArray((err, result) => callback(err, result));

    if (gameId !== undefined) {
        const targetGame = mockData.mockGames.find(game => game.id === gameId);
        if (!targetGame) {
            callback(new Error('Game not found'), null);
        } else {
            callback(null, targetGame);
        }
    } else {
        callback(null, mockData.mockGames);
    }
};


module.exports = { getUsers, getGames };
