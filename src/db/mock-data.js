
const ULbonuses = {};
for (let i = 0; i < 8; i++) { ULbonuses[i] = {}; }
[0, 7].forEach(n => {
    [0, 7].forEach(m => ULbonuses[n][m] = 'tws');
});
[1, 5].forEach(n => {
    [1, 5].forEach(m => ULbonuses[n][m] = 'tls');
});
[1, 2, 3, 4, 7].forEach(n => {
    ULbonuses[n][n] = 'dws';
});
[[0, 3], [2, 6], [3, 7], [6, 6]].forEach(nm => {
    ULbonuses[nm[0]][nm[1]] = 'dls';
    ULbonuses[nm[1]][nm[0]] = 'dls';
})
const allBonuses = Object.assign({}, ULbonuses);
for (let i = 8; i < 15; i++) { allBonuses[i] = {}; }
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        allBonuses[i][14 - j] = ULbonuses[i][j];
        allBonuses[14 - i][j] = ULbonuses[i][j];
        allBonuses[14 - i][14 - j] = ULbonuses[i][j];
    }
}
allBonuses[7][7] = 'star';


const mockUser1 = {
    id: 'mock1',
    name: 'Alice Smith',
    email: 'asmith@gmail.com',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

const mockUser2 = {
    id: 'mock2',
    name: 'Bob Smith',
    email: 'bsmith@gmail.com',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

const mockUser3 = {
    id: 'mock3',
    name: 'Carol Smith',
    email: 'csmith@gmail.com',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

const mockPlay1 = {
    playNumber: 0,
    player: mockUser1,
    startRack: [
        { "letter": "Q", "points": 10, "id": "tile-Q-0" },
        { "letter": "U", "points": 1, "id": "tile-U-0" },
        { "letter": "O", "points": 1, "id": "tile-O-0" },
        { "letter": "T", "points": 1, "id": "tile-T-0" },
        { "letter": "E", "points": 1, "id": "tile-E-0" },
        { "letter": "S", "points": 1, "id": "tile-S-0" },
        { "letter": "L", "points": 1, "id": "tile-L-0" }
    ],
    placements: [
        { row: 7, col: 3, bonus: 'dls', tile: { "letter": "Q", "points": 10, "id": "tile-Q-0" } },
        { row: 7, col: 4, bonus: null, tile: { "letter": "U", "points": 1, "id": "tile-U-0" } },
        { row: 7, col: 5, bonus: null, tile: { "letter": "O", "points": 1, "id": "tile-O-0" } },
        { row: 7, col: 6, bonus: null, tile: { "letter": "T", "points": 1, "id": "tile-T-0" } },
        { row: 7, col: 7, bonus: 'star', tile: { "letter": "E", "points": 1, "id": "tile-E-0" } },
    ],
    score: 48
}

const mockPlay2 = {
    playNumber: 1,
    player: mockUser2,
    startRack: [
        { "letter": "A", "points": 1, "id": "tile-A-0" },
        { "letter": "P", "points": 3, "id": "tile-P-0" },
        { "letter": "B", "points": 3, "id": "tile-B-0" },
        { "letter": "V", "points": 4, "id": "tile-V-1" },
        { "letter": "O", "points": 1, "id": "tile-O-1" },
        { "letter": "E", "points": 1, "id": "tile-E-1" },
        { "letter": "Y", "points": 4, "id": "tile-Y-0" },
    ],
    placements: [
        { row: 5, col: 6, bonus: null, tile: { "letter": "A", "points": 1, "id": "tile-A-0" } },
        { row: 6, col: 6, bonus: null, tile: { "letter": "P", "points": 3, "id": "tile-P-0" } }
    ],
    score: 8
}

const mockSquares = Array(15).fill(null).map((wholeRow, row) => {
    return Array(15).fill(null).map((sqInRow, col) => {
        return { row, col, bonus: allBonuses[row][col], tile: null };
    });
});
mockSquares[7][3].tile = { "letter": "Q", "points": 10, "id": "tile-Q-0" };
mockSquares[7][4].tile = { "letter": "U", "points": 1, "id": "tile-U-0" };
mockSquares[7][5].tile = { "letter": "O", "points": 1, "id": "tile-O-0" };
mockSquares[7][6].tile = { "letter": "T", "points": 1, "id": "tile-T-0" };
mockSquares[7][7].tile = { "letter": "E", "points": 1, "id": "tile-E-0" };
mockSquares[5][6].tile = { "letter": "A", "points": 1, "id": "tile-A-0" };
mockSquares[6][6].tile = { "letter": "P", "points": 3, "id": "tile-P-0" };

const mockBoard = {
    squares: mockSquares
};

const mockBag = [
    { "letter": "_", "points": 0, "id": "tile-_-0" },
    { "letter": "_", "points": 0, "id": "tile-_-1" },
    // { "letter":"A", "points":1, "id":"tile-A-0" },
    { "letter": "A", "points": 1, "id": "tile-A-1" },
    { "letter": "A", "points": 1, "id": "tile-A-2" },
    { "letter": "A", "points": 1, "id": "tile-A-3" },
    { "letter": "A", "points": 1, "id": "tile-A-4" },
    { "letter": "A", "points": 1, "id": "tile-A-5" },
    { "letter": "A", "points": 1, "id": "tile-A-6" },
    { "letter": "A", "points": 1, "id": "tile-A-7" },
    { "letter": "A", "points": 1, "id": "tile-A-8" },
    // { "letter":"B", "points":3, "id":"tile-B-0" },
    { "letter": "B", "points": 3, "id": "tile-B-1" },
    { "letter": "C", "points": 3, "id": "tile-C-0" },
    { "letter": "C", "points": 3, "id": "tile-C-1" },
    { "letter": "D", "points": 2, "id": "tile-D-0" },
    { "letter": "D", "points": 2, "id": "tile-D-1" },
    { "letter": "D", "points": 2, "id": "tile-D-2" },
    { "letter": "D", "points": 2, "id": "tile-D-3" },
    // { "letter":"E", "points":1, "id":"tile-E-0" },
    // { "letter":"E", "points":1, "id":"tile-E-1" },
    { "letter": "E", "points": 1, "id": "tile-E-2" },
    { "letter": "E", "points": 1, "id": "tile-E-3" },
    { "letter": "E", "points": 1, "id": "tile-E-4" },
    { "letter": "E", "points": 1, "id": "tile-E-5" },
    { "letter": "E", "points": 1, "id": "tile-E-6" },
    { "letter": "E", "points": 1, "id": "tile-E-7" },
    { "letter": "E", "points": 1, "id": "tile-E-8" },
    { "letter": "E", "points": 1, "id": "tile-E-9" },
    { "letter": "E", "points": 1, "id": "tile-E-10" },
    { "letter": "E", "points": 1, "id": "tile-E-11" },
    { "letter": "F", "points": 4, "id": "tile-F-0" },
    { "letter": "F", "points": 4, "id": "tile-F-1" },
    { "letter": "G", "points": 2, "id": "tile-G-0" },
    { "letter": "G", "points": 2, "id": "tile-G-1" },
    { "letter": "G", "points": 2, "id": "tile-G-2" },
    // { "letter":"H", "points":4, "id":"tile-H-0" },
    // { "letter":"H", "points":4, "id":"tile-H-1" },
    // { "letter":"I", "points":1, "id":"tile-I-0" },
    // { "letter":"I", "points":1, "id":"tile-I-1" },
    // { "letter":"I", "points":1, "id":"tile-I-2" },
    // { "letter":"I", "points":1, "id":"tile-I-3" },
    // { "letter":"I", "points":1, "id":"tile-I-4" },
    // { "letter":"I", "points":1, "id":"tile-I-5" },
    { "letter": "I", "points": 1, "id": "tile-I-6" },
    { "letter": "I", "points": 1, "id": "tile-I-7" },
    { "letter": "I", "points": 1, "id": "tile-I-8" },
    { "letter": "J", "points": 8, "id": "tile-J-0" },
    { "letter": "K", "points": 5, "id": "tile-K-0" },
    // { "letter":"L", "points":1, "id":"tile-L-0" },
    { "letter": "L", "points": 1, "id": "tile-L-1" },
    { "letter": "L", "points": 1, "id": "tile-L-2" },
    { "letter": "L", "points": 1, "id": "tile-L-3" },
    { "letter": "M", "points": 3, "id": "tile-M-0" },
    { "letter": "M", "points": 3, "id": "tile-M-1" },
    { "letter": "N", "points": 1, "id": "tile-N-0" },
    { "letter": "N", "points": 1, "id": "tile-N-1" },
    { "letter": "N", "points": 1, "id": "tile-N-2" },
    { "letter": "N", "points": 1, "id": "tile-N-3" },
    { "letter": "N", "points": 1, "id": "tile-N-4" },
    { "letter": "N", "points": 1, "id": "tile-N-5" },
    // { "letter":"O", "points":1, "id":"tile-O-0" },
    // { "letter":"O", "points":1, "id":"tile-O-1" },
    { "letter": "O", "points": 1, "id": "tile-O-2" },
    { "letter": "O", "points": 1, "id": "tile-O-3" },
    { "letter": "O", "points": 1, "id": "tile-O-4" },
    { "letter": "O", "points": 1, "id": "tile-O-5" },
    { "letter": "O", "points": 1, "id": "tile-O-6" },
    { "letter": "O", "points": 1, "id": "tile-O-7" },
    // { "letter":"P", "points":3, "id":"tile-P-0" },
    { "letter": "P", "points": 3, "id": "tile-P-1" },
    // { "letter":"Q", "points":10, "id":"tile-Q-0" },
    { "letter": "R", "points": 1, "id": "tile-R-0" },
    { "letter": "R", "points": 1, "id": "tile-R-1" },
    { "letter": "R", "points": 1, "id": "tile-R-2" },
    { "letter": "R", "points": 1, "id": "tile-R-3" },
    { "letter": "R", "points": 1, "id": "tile-R-4" },
    { "letter": "R", "points": 1, "id": "tile-R-5" },
    // { "letter":"S", "points":1, "id":"tile-S-0" },
    { "letter": "S", "points": 1, "id": "tile-S-1" },
    { "letter": "S", "points": 1, "id": "tile-S-2" },
    { "letter": "S", "points": 1, "id": "tile-S-3" },
    // { "letter":"T", "points":1, "id":"tile-T-0" },
    { "letter": "T", "points": 1, "id": "tile-T-1" },
    { "letter": "T", "points": 1, "id": "tile-T-2" },
    { "letter": "T", "points": 1, "id": "tile-T-3" },
    { "letter": "T", "points": 1, "id": "tile-T-4" },
    { "letter": "T", "points": 1, "id": "tile-T-5" },
    // { "letter":"U", "points":1, "id":"tile-U-0" },
    { "letter": "U", "points": 1, "id": "tile-U-1" },
    { "letter": "U", "points": 1, "id": "tile-U-2" },
    { "letter": "U", "points": 1, "id": "tile-U-3" },
    { "letter": "V", "points": 4, "id": "tile-V-0" },
    // { "letter":"V", "points":4, "id":"tile-V-1" },
    { "letter": "W", "points": 4, "id": "tile-W-0" },
    { "letter": "W", "points": 4, "id": "tile-W-1" },
    { "letter": "X", "points": 8, "id": "tile-X-0" },
    // { "letter":"Y", "points":4, "id":"tile-Y-0" },
    { "letter": "Y", "points": 4, "id": "tile-Y-1" },
    { "letter": "Z", "points": 10, "id": "tile-Z-0" }
];

const mockGame = {
    id: 'game1',
    players: [
        {
            user: mockUser1,
            rack: [
                { "letter": "E", "points": 1, "id": "tile-E-1" },
                { "letter": "Y", "points": 4, "id": "tile-Y-0" },
                { "letter": "H", "points": 4, "id": "tile-H-1" },
                { "letter": "I", "points": 1, "id": "tile-I-0" },
                { "letter": "I", "points": 1, "id": "tile-I-2" },
                { "letter": "I", "points": 1, "id": "tile-I-4" },
                { "letter": "I", "points": 1, "id": "tile-I-5" },
            ],
            score: 48
        },
        {
            user: mockUser2,
            rack: [
                { "letter": "B", "points": 3, "id": "tile-B-0" },
                { "letter": "V", "points": 4, "id": "tile-V-1" },
                { "letter": "O", "points": 1, "id": "tile-O-1" },
                { "letter": "E", "points": 1, "id": "tile-E-1" },
                { "letter": "Y", "points": 4, "id": "tile-Y-0" },
                { "letter": "I", "points": 1, "id": "tile-I-3" },
                { "letter": "I", "points": 1, "id": "tile-I-1" },
            ],
            score: 8
        },
    ],
    board: mockBoard,
    bag: mockBag,
    playHistory: [
        mockPlay1,
        mockPlay2
    ],
    tilesToExchange: [],
};

module.exports.mockGame = mockGame;
module.exports.mockGames = [mockGame];
module.exports.mockUser1 = mockUser1;
module.exports.mockUser2 = mockUser2;
module.exports.mockUser3 = mockUser3;
module.exports.mockUsers = [mockUser1, mockUser2, mockUser3];
