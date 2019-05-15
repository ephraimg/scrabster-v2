
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
    id: '113014011347326240001',
    name: 'Alice Smith',
    givenName: 'Alice',
    familyName: 'Smith',
    email: 'asmith@gmail.com',
    imageUrl: 'http://www.fakeurl.com/1',
    memberStatus: 'ACTIVE',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

const mockUser2 = {
    id: '113014011347326240002',
    name: 'Bob Smith',
    givenName: 'Bob',
    familyName: 'Smith',
    email: 'bsmith@gmail.com',
    imageUrl: 'http://www.fakeurl.com/2',
    memberStatus: 'ACTIVE',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

const mockUser3 = {
    id: '113014011347326240003',
    name: 'Carol Smith',
    givenName: 'Carol',
    familyName: 'Smith',
    email: 'csmith@gmail.com',
    imageUrl: 'http://www.fakeurl.com/3',
    memberStatus: 'ACTIVE',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};








/******************** mock game 1 *******************/

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

const mockSquares1 = Array(15).fill(null).map((wholeRow, row) => {
    return Array(15).fill(null).map((sqInRow, col) => {
        return { row, col, bonus: allBonuses[row][col], tile: null };
    });
});
mockSquares1[7][3].tile = { "letter": "Q", "points": 10, "id": "tile-Q-0" };
mockSquares1[7][4].tile = { "letter": "U", "points": 1, "id": "tile-U-0" };
mockSquares1[7][5].tile = { "letter": "O", "points": 1, "id": "tile-O-0" };
mockSquares1[7][6].tile = { "letter": "T", "points": 1, "id": "tile-T-0" };
mockSquares1[7][7].tile = { "letter": "E", "points": 1, "id": "tile-E-0" };
mockSquares1[5][6].tile = { "letter": "A", "points": 1, "id": "tile-A-0" };
mockSquares1[6][6].tile = { "letter": "P", "points": 3, "id": "tile-P-0" };

const mockBoard1 = mockSquares1;

const mockBag1 = [
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

const mockGame1 = {
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
    board: mockBoard1,
    bag: mockBag1,
    playHistory: [
        mockPlay1,
        mockPlay2
    ],
    tilesToExchange: [],
};









/******************** mock game 2 *******************/

const mockPlay3 = {
    playNumber: 0,
    player: mockUser1,
    startRack: [
        { "letter": "G", "points": 2, "id": "tile-G-2" },
        { "letter": "D", "points": 2, "id": "tile-D-1" },
        { "letter": "A", "points": 1, "id": "tile-A-1" },
        { "letter": "O", "points": 1, "id": "tile-O-0" },
        { "letter": "I", "points": 1, "id": "tile-I-3" },
        { "letter": "N", "points": 1, "id": "tile-N-5" },
        { "letter": "L", "points": 1, "id": "tile-L-2" },
    ],
    placements: [
        { row: 7, col: 7, bonus: 'star', tile: { "letter": "G", "points": 2, "id": "tile-G-2" } },
        { row: 8, col: 7, bonus: null, tile: { "letter": "O", "points": 1, "id": "tile-O-0" } },
    ],
    score: 6
}

const mockPlay4 = {
    playNumber: 1,
    player: mockUser2,
    startRack: [
        { "letter": "A", "points": 1, "id": "tile-A-7" },
        { "letter": "L", "points": 1, "id": "tile-L-3" },
        { "letter": "K", "points": 5, "id": "tile-K-0" },
        { "letter": "C", "points": 3, "id": "tile-C-1" },
        { "letter": "U", "points": 1, "id": "tile-U-3" },
        { "letter": "G", "points": 2, "id": "tile-G-0" },
        { "letter": "Y", "points": 4, "id": "tile-Y-1" },
    ],
    placements: [
        { row: 8, col: 6, bonus: 'dls', tile: { "letter": "Y", "points": 4, "id": "tile-Y-1" } },
    ],
    score: 9
}

const mockPlay5 = {
    playNumber: 2,
    player: mockUser3,
    startRack: [
        { "letter": "I", "points": 1, "id": "tile-I-7" },
        { "letter": "R", "points": 1, "id": "tile-R-1" },
        { "letter": "E", "points": 1, "id": "tile-E-4" },
        { "letter": "_", "points": 0, "id": "tile-_-0" },
        { "letter": "O", "points": 1, "id": "tile-O-5" },
        { "letter": "R", "points": 1, "id": "tile-R-5" },
        { "letter": "N", "points": 1, "id": "tile-N-3" },
    ],
    placements: [
        { row: 7, col: 8, bonus: null, tile: { "letter": "I", "points": 1, "id": "tile-I-7" } },
        { row: 7, col: 9, bonus: null, tile: { "letter": "N", "points": 1, "id": "tile-N-3" } },

    ],
    score: 4
}

const mockPlay6 = {
    playNumber: 3,
    player: mockUser1,
    startRack: [
        { "letter": "D", "points": 2, "id": "tile-D-1" },
        { "letter": "A", "points": 1, "id": "tile-A-1" },
        { "letter": "I", "points": 1, "id": "tile-I-3" },
        { "letter": "N", "points": 1, "id": "tile-N-5" },
        { "letter": "L", "points": 1, "id": "tile-L-2" },
        { "letter": "E", "points": 1, "id": "tile-E-9" },
        { "letter": "T", "points": 1, "id": "tile-T-0" },
    ],
    placements: [
        { row: 8, col: 8, bonus: 'dls', tile: { "letter": "N", "points": 1, "id": "tile-N-5" } },
        { row: 9, col: 8, bonus: null, tile: { "letter": "E", "points": 1, "id": "tile-E-9" } },
        { row: 10, col: 8, bonus: null, tile: { "letter": "T", "points": 1, "id": "tile-T-0" } },
    ],
    score: 11
}

const mockSquares2 = Array(15).fill(null).map((wholeRow, row) => {
    return Array(15).fill(null).map((sqInRow, col) => {
        return { row, col, bonus: allBonuses[row][col], tile: null };
    });
});
mockSquares2[7][7].tile = { "letter": "G", "points": 2, "id": "tile-G-2" };
mockSquares2[8][7].tile = { "letter": "O", "points": 1, "id": "tile-O-0" };
mockSquares2[8][6].tile = { "letter": "Y", "points": 4, "id": "tile-Y-1" };
mockSquares2[7][8].tile = { "letter": "I", "points": 1, "id": "tile-I-7" };
mockSquares2[7][9].tile = { "letter": "N", "points": 1, "id": "tile-N-3" };
mockSquares2[8][8].tile = { "letter": "N", "points": 1, "id": "tile-N-5" };
mockSquares2[9][8].tile = { "letter": "E", "points": 1, "id": "tile-E-9" };
mockSquares2[10][8].tile = { "letter": "T", "points": 1, "id": "tile-T-0" };

const mockBoard2 = mockSquares2;

const mockBag2 = [
    // { "letter": "_", "points": 0, "id": "tile-_-0" },
    { "letter": "_", "points": 0, "id": "tile-_-1" },
    { "letter":"A", "points":1, "id":"tile-A-0" },
    // { "letter": "A", "points": 1, "id": "tile-A-1" },
    { "letter": "A", "points": 1, "id": "tile-A-2" },
    { "letter": "A", "points": 1, "id": "tile-A-3" },
    { "letter": "A", "points": 1, "id": "tile-A-4" },
    { "letter": "A", "points": 1, "id": "tile-A-5" },
    { "letter": "A", "points": 1, "id": "tile-A-6" },
    // { "letter": "A", "points": 1, "id": "tile-A-7" },
    { "letter": "A", "points": 1, "id": "tile-A-8" },
    { "letter":"B", "points":3, "id":"tile-B-0" },
    { "letter": "B", "points": 3, "id": "tile-B-1" },
    { "letter": "C", "points": 3, "id": "tile-C-0" },
    // { "letter": "C", "points": 3, "id": "tile-C-1" },
    { "letter": "D", "points": 2, "id": "tile-D-0" },
    // { "letter": "D", "points": 2, "id": "tile-D-1" },
    { "letter": "D", "points": 2, "id": "tile-D-2" },
    { "letter": "D", "points": 2, "id": "tile-D-3" },
    { "letter":"E", "points":1, "id":"tile-E-0" },
    { "letter":"E", "points":1, "id":"tile-E-1" },
    { "letter": "E", "points": 1, "id": "tile-E-2" },
    { "letter": "E", "points": 1, "id": "tile-E-3" },
    // { "letter": "E", "points": 1, "id": "tile-E-4" },
    { "letter": "E", "points": 1, "id": "tile-E-5" },
    { "letter": "E", "points": 1, "id": "tile-E-6" },
    { "letter": "E", "points": 1, "id": "tile-E-7" },
    { "letter": "E", "points": 1, "id": "tile-E-8" },
    // { "letter": "E", "points": 1, "id": "tile-E-9" },
    { "letter": "E", "points": 1, "id": "tile-E-10" },
    { "letter": "E", "points": 1, "id": "tile-E-11" },
    { "letter": "F", "points": 4, "id": "tile-F-0" },
    { "letter": "F", "points": 4, "id": "tile-F-1" },
    // { "letter": "G", "points": 2, "id": "tile-G-0" },
    { "letter": "G", "points": 2, "id": "tile-G-1" },
    // { "letter": "G", "points": 2, "id": "tile-G-2" },
    { "letter":"H", "points":4, "id":"tile-H-0" },
    { "letter":"H", "points":4, "id":"tile-H-1" },
    { "letter":"I", "points":1, "id":"tile-I-0" },
    { "letter":"I", "points":1, "id":"tile-I-1" },
    { "letter":"I", "points":1, "id":"tile-I-2" },
    // { "letter":"I", "points":1, "id":"tile-I-3" },
    { "letter":"I", "points":1, "id":"tile-I-4" },
    { "letter":"I", "points":1, "id":"tile-I-5" },
    { "letter": "I", "points": 1, "id": "tile-I-6" },
    // { "letter": "I", "points": 1, "id": "tile-I-7" },
    { "letter": "I", "points": 1, "id": "tile-I-8" },
    { "letter": "J", "points": 8, "id": "tile-J-0" },
    // { "letter": "K", "points": 5, "id": "tile-K-0" },
    { "letter":"L", "points":1, "id":"tile-L-0" },
    { "letter": "L", "points": 1, "id": "tile-L-1" },
    // { "letter": "L", "points": 1, "id": "tile-L-2" },
    // { "letter": "L", "points": 1, "id": "tile-L-3" },
    { "letter": "M", "points": 3, "id": "tile-M-0" },
    { "letter": "M", "points": 3, "id": "tile-M-1" },
    { "letter": "N", "points": 1, "id": "tile-N-0" },
    { "letter": "N", "points": 1, "id": "tile-N-1" },
    { "letter": "N", "points": 1, "id": "tile-N-2" },
    // { "letter": "N", "points": 1, "id": "tile-N-3" },
    { "letter": "N", "points": 1, "id": "tile-N-4" },
    // { "letter": "N", "points": 1, "id": "tile-N-5" },
    // { "letter":"O", "points":1, "id":"tile-O-0" },
    { "letter":"O", "points":1, "id":"tile-O-1" },
    { "letter": "O", "points": 1, "id": "tile-O-2" },
    { "letter": "O", "points": 1, "id": "tile-O-3" },
    // { "letter": "O", "points": 1, "id": "tile-O-4" },
    // { "letter": "O", "points": 1, "id": "tile-O-5" },
    // { "letter": "O", "points": 1, "id": "tile-O-6" },
    { "letter": "O", "points": 1, "id": "tile-O-7" },
    // { "letter":"P", "points":3, "id":"tile-P-0" },
    { "letter": "P", "points": 3, "id": "tile-P-1" },
    { "letter":"Q", "points":10, "id":"tile-Q-0" },
    { "letter": "R", "points": 1, "id": "tile-R-0" },
    // { "letter": "R", "points": 1, "id": "tile-R-1" },
    { "letter": "R", "points": 1, "id": "tile-R-2" },
    { "letter": "R", "points": 1, "id": "tile-R-3" },
    { "letter": "R", "points": 1, "id": "tile-R-4" },
    // { "letter": "R", "points": 1, "id": "tile-R-5" },
    { "letter":"S", "points":1, "id":"tile-S-0" },
    { "letter": "S", "points": 1, "id": "tile-S-1" },
    { "letter": "S", "points": 1, "id": "tile-S-2" },
    { "letter": "S", "points": 1, "id": "tile-S-3" },
    // { "letter":"T", "points":1, "id":"tile-T-0" },
    { "letter": "T", "points": 1, "id": "tile-T-1" },
    { "letter": "T", "points": 1, "id": "tile-T-2" },
    // { "letter": "T", "points": 1, "id": "tile-T-3" },
    { "letter": "T", "points": 1, "id": "tile-T-4" },
    { "letter": "T", "points": 1, "id": "tile-T-5" },
    { "letter":"U", "points":1, "id":"tile-U-0" },
    { "letter": "U", "points": 1, "id": "tile-U-1" },
    { "letter": "U", "points": 1, "id": "tile-U-2" },
    // { "letter": "U", "points": 1, "id": "tile-U-3" },
    { "letter": "V", "points": 4, "id": "tile-V-0" },
    { "letter":"V", "points":4, "id":"tile-V-1" },
    { "letter": "W", "points": 4, "id": "tile-W-0" },
    // { "letter": "W", "points": 4, "id": "tile-W-1" },
    // { "letter": "X", "points": 8, "id": "tile-X-0" },
    { "letter":"Y", "points":4, "id":"tile-Y-0" },
    // { "letter": "Y", "points": 4, "id": "tile-Y-1" },
    { "letter": "Z", "points": 10, "id": "tile-Z-0" }
];

const mockGame2 = {
    id: 'game2',
    players: [
        {
            user: mockUser1,
            rack: [
                { "letter": "D", "points": 2, "id": "tile-D-1" },
                { "letter": "A", "points": 1, "id": "tile-A-1" },
                { "letter": "I", "points": 1, "id": "tile-I-3" },
                { "letter": "L", "points": 1, "id": "tile-L-2" },
                { "letter": "X", "points": 8, "id": "tile-X-0" },
                { "letter": "T", "points": 1, "id": "tile-T-3" },
                { "letter": "O", "points": 1, "id": "tile-O-4" },
            ],
            score: 17
        },
        {
            user: mockUser2,
            rack: [
                { "letter": "A", "points": 1, "id": "tile-A-7" },
                { "letter": "L", "points": 1, "id": "tile-L-3" },
                { "letter": "K", "points": 5, "id": "tile-K-0" },
                { "letter": "C", "points": 3, "id": "tile-C-1" },
                { "letter": "U", "points": 1, "id": "tile-U-3" },
                { "letter": "G", "points": 2, "id": "tile-G-0" },
                { "letter": "P", "points": 3, "id": "tile-P-0" },
            ],
            score: 9
        },
        {
            user: mockUser3,
            rack: [
                { "letter": "R", "points": 1, "id": "tile-R-1" },
                { "letter": "E", "points": 1, "id": "tile-E-4" },
                { "letter": "_", "points": 0, "id": "tile-_-0" },
                { "letter": "O", "points": 1, "id": "tile-O-5" },
                { "letter": "R", "points": 1, "id": "tile-R-5" },
                { "letter": "O", "points": 1, "id": "tile-O-6" },
                { "letter": "W", "points": 4, "id": "tile-W-1" },
            ],
            score: 4
        },
    ],
    board: mockBoard2,
    bag: mockBag2,
    playHistory: [
        mockPlay3,
        mockPlay4,
        mockPlay5,
        mockPlay6,
    ],
    tilesToExchange: [],
};

// Almost completed game (6 tiles left in bag)
const mockGame3 = {
  "_id": "5cdb920fac418d0ad45958a2",
  "id": "e1c84a00-76c7-11e9-9c36-b7da207f16e7",
  "board": [
    [
      {
        "row": 0,
        "col": 0,
        "bonus": "tws",
        "tile": null
      },
      {
        "row": 0,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 0,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 0,
        "col": 3,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 0,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 0,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 0,
        "col": 6,
        "bonus": "",
        "tile": null
      },
      {
        "row": 0,
        "col": 7,
        "bonus": "tws",
        "tile": {
          "letter": "D",
          "points": 2,
          "id": "tile-D-3"
        }
      },
      {
        "row": 0,
        "col": 8,
        "bonus": "",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-1"
        }
      },
      {
        "row": 0,
        "col": 9,
        "bonus": "",
        "tile": {
          "letter": "L",
          "points": 1,
          "id": "tile-L-1"
        }
      },
      {
        "row": 0,
        "col": 10,
        "bonus": "",
        "tile": {
          "letter": "N",
          "points": 1,
          "id": "tile-N-0"
        }
      },
      {
        "row": 0,
        "col": 11,
        "bonus": "dls",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-7"
        }
      },
      {
        "row": 0,
        "col": 12,
        "bonus": "",
        "tile": {
          "letter": "S",
          "points": 1,
          "id": "tile-S-1"
        }
      },
      {
        "row": 0,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-3"
        }
      },
      {
        "row": 0,
        "col": 14,
        "bonus": "tws",
        "tile": {
          "letter": "T",
          "points": 1,
          "id": "tile-T-0"
        }
      }
    ],
    [
      {
        "row": 1,
        "col": 0,
        "bonus": "",
        "tile": null
      },
      {
        "row": 1,
        "col": 1,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 1,
        "col": 2,
        "bonus": "",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-0"
        }
      },
      {
        "row": 1,
        "col": 3,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-2"
        }
      },
      {
        "row": 1,
        "col": 4,
        "bonus": "",
        "tile": {
          "letter": "T",
          "points": 1,
          "id": "tile-T-2"
        }
      },
      {
        "row": 1,
        "col": 5,
        "bonus": "tls",
        "tile": {
          "letter": "F",
          "points": 4,
          "id": "tile-F-0"
        }
      },
      {
        "row": 1,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-6"
        }
      },
      {
        "row": 1,
        "col": 7,
        "bonus": "",
        "tile": {
          "letter": "L",
          "points": 1,
          "id": "tile-L-0"
        }
      },
      {
        "row": 1,
        "col": 8,
        "bonus": "",
        "tile": {
          "letter": "D",
          "points": 2,
          "id": "tile-D-0"
        }
      },
      {
        "row": 1,
        "col": 9,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 1,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 1,
        "col": 11,
        "bonus": "",
        "tile": null
      },
      {
        "row": 1,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 1,
        "col": 13,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 1,
        "col": 14,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-8"
        }
      }
    ],
    [
      {
        "row": 2,
        "col": 0,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 2,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 2,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 6,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 2,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 8,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 2,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 11,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 12,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 2,
        "col": 13,
        "bonus": "",
        "tile": null
      },
      {
        "row": 2,
        "col": 14,
        "bonus": "",
        "tile": {
          "letter": "N",
          "points": 1,
          "id": "tile-N-5"
        }
      }
    ],
    [
      {
        "row": 3,
        "col": 0,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 3,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 3,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 3,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 6,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 7,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 3,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 11,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 3,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 13,
        "bonus": "",
        "tile": null
      },
      {
        "row": 3,
        "col": 14,
        "bonus": "dls",
        "tile": {
          "letter": "B",
          "points": 3,
          "id": "tile-B-0"
        }
      }
    ],
    [
      {
        "row": 4,
        "col": 0,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 4,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 4,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 6,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 10,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 4,
        "col": 11,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 13,
        "bonus": "",
        "tile": null
      },
      {
        "row": 4,
        "col": 14,
        "bonus": "",
        "tile": {
          "letter": "U",
          "points": 1,
          "id": "tile-U-2"
        }
      }
    ],
    [
      {
        "row": 5,
        "col": 0,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 1,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 5,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 5,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 5,
        "col": 6,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 9,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 5,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 11,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 5,
        "col": 13,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 5,
        "col": 14,
        "bonus": "",
        "tile": {
          "letter": "N",
          "points": 1,
          "id": "tile-N-2"
        }
      }
    ],
    [
      {
        "row": 6,
        "col": 0,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 2,
        "bonus": "dls",
        "tile": {
          "letter": "C",
          "points": 3,
          "id": "tile-C-1"
        }
      },
      {
        "row": 6,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 6,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 6,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 6,
        "col": 8,
        "bonus": "dls",
        "tile": {
          "letter": "J",
          "points": 8,
          "id": "tile-J-0"
        }
      },
      {
        "row": 6,
        "col": 9,
        "bonus": "",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-8"
        }
      },
      {
        "row": 6,
        "col": 10,
        "bonus": "",
        "tile": {
          "letter": "Y",
          "points": 4,
          "id": "tile-Y-0"
        }
      },
      {
        "row": 6,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-7"
        }
      },
      {
        "row": 6,
        "col": 12,
        "bonus": "dls",
        "tile": {
          "letter": "D",
          "points": 2,
          "id": "tile-D-1"
        }
      },
      {
        "row": 6,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "K",
          "points": 5,
          "id": "tile-K-0"
        }
      },
      {
        "row": 6,
        "col": 14,
        "bonus": "",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-5"
        }
      }
    ],
    [
      {
        "row": 7,
        "col": 0,
        "bonus": "tws",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-1"
        }
      },
      {
        "row": 7,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 7,
        "col": 2,
        "bonus": "",
        "tile": {
          "letter": "L",
          "points": 1,
          "id": "tile-L-3"
        }
      },
      {
        "row": 7,
        "col": 3,
        "bonus": "dls",
        "tile": {
          "letter": "S",
          "points": 1,
          "id": "tile-S-0"
        }
      },
      {
        "row": 7,
        "col": 4,
        "bonus": "",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-1"
        }
      },
      {
        "row": 7,
        "col": 5,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-6"
        }
      },
      {
        "row": 7,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "N",
          "points": 1,
          "id": "tile-N-4"
        }
      },
      {
        "row": 7,
        "col": 7,
        "bonus": "star",
        "tile": {
          "letter": "T",
          "points": 1,
          "id": "tile-T-3"
        }
      },
      {
        "row": 7,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 7,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 7,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 7,
        "col": 11,
        "bonus": "dls",
        "tile": {
          "letter": "D",
          "points": 2,
          "id": "tile-D-2"
        }
      },
      {
        "row": 7,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 7,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "U",
          "points": 1,
          "id": "tile-U-1"
        }
      },
      {
        "row": 7,
        "col": 14,
        "bonus": "tws",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-0"
        }
      }
    ],
    [
      {
        "row": 8,
        "col": 0,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-8"
        }
      },
      {
        "row": 8,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 2,
        "bonus": "dls",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-0"
        }
      },
      {
        "row": 8,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 6,
        "bonus": "dls",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-6"
        }
      },
      {
        "row": 8,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 8,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 8,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 8,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-0"
        }
      },
      {
        "row": 8,
        "col": 12,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 8,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "N",
          "points": 1,
          "id": "tile-N-1"
        }
      },
      {
        "row": 8,
        "col": 14,
        "bonus": "",
        "tile": null
      }
    ],
    [
      {
        "row": 9,
        "col": 0,
        "bonus": "",
        "tile": {
          "letter": "G",
          "points": 2,
          "id": "tile-G-0"
        }
      },
      {
        "row": 9,
        "col": 1,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 9,
        "col": 2,
        "bonus": "",
        "tile": {
          "letter": "Q",
          "points": 10,
          "id": "tile-Q-0"
        }
      },
      {
        "row": 9,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 5,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 9,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-2"
        }
      },
      {
        "row": 9,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 9,
        "bonus": "tls",
        "tile": null
      },
      {
        "row": 9,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-2"
        }
      },
      {
        "row": 9,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 9,
        "col": 13,
        "bonus": "tls",
        "tile": {
          "letter": "W",
          "points": 4,
          "id": "tile-W-0"
        }
      },
      {
        "row": 9,
        "col": 14,
        "bonus": "",
        "tile": null
      }
    ],
    [
      {
        "row": 10,
        "col": 0,
        "bonus": "",
        "tile": {
          "letter": "P",
          "points": 3,
          "id": "tile-P-0"
        }
      },
      {
        "row": 10,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 10,
        "col": 2,
        "bonus": "",
        "tile": {
          "letter": "Y",
          "points": 4,
          "id": "tile-Y-1"
        }
      },
      {
        "row": 10,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 10,
        "col": 4,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 10,
        "col": 5,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-11"
        }
      },
      {
        "row": 10,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "V",
          "points": 4,
          "id": "tile-V-0"
        }
      },
      {
        "row": 10,
        "col": 7,
        "bonus": "",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-2"
        }
      },
      {
        "row": 10,
        "col": 8,
        "bonus": "",
        "tile": {
          "letter": "L",
          "points": 1,
          "id": "tile-L-2"
        }
      },
      {
        "row": 10,
        "col": 9,
        "bonus": "",
        "tile": {
          "letter": "G",
          "points": 2,
          "id": "tile-G-2"
        }
      },
      {
        "row": 10,
        "col": 10,
        "bonus": "dws",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-4"
        }
      },
      {
        "row": 10,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "T",
          "points": 1,
          "id": "tile-T-5"
        }
      },
      {
        "row": 10,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 10,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-4"
        }
      },
      {
        "row": 10,
        "col": 14,
        "bonus": "",
        "tile": null
      }
    ],
    [
      {
        "row": 11,
        "col": 0,
        "bonus": "dls",
        "tile": {
          "letter": "G",
          "points": 2,
          "id": "tile-G-1"
        }
      },
      {
        "row": 11,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 3,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 11,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 6,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 7,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 11,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 11,
        "bonus": "dws",
        "tile": {
          "letter": "U",
          "points": 1,
          "id": "tile-U-0"
        }
      },
      {
        "row": 11,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 11,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "C",
          "points": 3,
          "id": "tile-C-0"
        }
      },
      {
        "row": 11,
        "col": 14,
        "bonus": "dls",
        "tile": null
      }
    ],
    [
      {
        "row": 12,
        "col": 0,
        "bonus": "",
        "tile": {
          "letter": "O",
          "points": 1,
          "id": "tile-O-3"
        }
      },
      {
        "row": 12,
        "col": 1,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 2,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 12,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 5,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 6,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 12,
        "col": 7,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 8,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 12,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 12,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-4"
        }
      },
      {
        "row": 12,
        "col": 12,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 12,
        "col": 13,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-6"
        }
      },
      {
        "row": 12,
        "col": 14,
        "bonus": "",
        "tile": null
      }
    ],
    [
      {
        "row": 13,
        "col": 0,
        "bonus": "",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-3"
        }
      },
      {
        "row": 13,
        "col": 1,
        "bonus": "dws",
        "tile": null
      },
      {
        "row": 13,
        "col": 2,
        "bonus": "",
        "tile": null
      },
      {
        "row": 13,
        "col": 3,
        "bonus": "",
        "tile": null
      },
      {
        "row": 13,
        "col": 4,
        "bonus": "",
        "tile": null
      },
      {
        "row": 13,
        "col": 5,
        "bonus": "tls",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-5"
        }
      },
      {
        "row": 13,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "F",
          "points": 4,
          "id": "tile-F-1"
        }
      },
      {
        "row": 13,
        "col": 7,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-0"
        }
      },
      {
        "row": 13,
        "col": 8,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-1"
        }
      },
      {
        "row": 13,
        "col": 9,
        "bonus": "tls",
        "tile": {
          "letter": "_",
          "points": 0,
          "id": "tile-_-1"
        }
      },
      {
        "row": 13,
        "col": 10,
        "bonus": "",
        "tile": {
          "letter": "E",
          "points": 1,
          "id": "tile-E-9"
        }
      },
      {
        "row": 13,
        "col": 11,
        "bonus": "",
        "tile": {
          "letter": "I",
          "points": 1,
          "id": "tile-I-5"
        }
      },
      {
        "row": 13,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 13,
        "col": 13,
        "bonus": "dws",
        "tile": {
          "letter": "T",
          "points": 1,
          "id": "tile-T-1"
        }
      },
      {
        "row": 13,
        "col": 14,
        "bonus": "",
        "tile": null
      }
    ],
    [
      {
        "row": 14,
        "col": 0,
        "bonus": "tws",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-4"
        }
      },
      {
        "row": 14,
        "col": 1,
        "bonus": "",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-3"
        }
      },
      {
        "row": 14,
        "col": 2,
        "bonus": "",
        "tile": {
          "letter": "V",
          "points": 4,
          "id": "tile-V-1"
        }
      },
      {
        "row": 14,
        "col": 3,
        "bonus": "dls",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-4"
        }
      },
      {
        "row": 14,
        "col": 4,
        "bonus": "",
        "tile": {
          "letter": "H",
          "points": 4,
          "id": "tile-H-0"
        }
      },
      {
        "row": 14,
        "col": 5,
        "bonus": "",
        "tile": {
          "letter": "A",
          "points": 1,
          "id": "tile-A-7"
        }
      },
      {
        "row": 14,
        "col": 6,
        "bonus": "",
        "tile": {
          "letter": "R",
          "points": 1,
          "id": "tile-R-2"
        }
      },
      {
        "row": 14,
        "col": 7,
        "bonus": "tws",
        "tile": null
      },
      {
        "row": 14,
        "col": 8,
        "bonus": "",
        "tile": null
      },
      {
        "row": 14,
        "col": 9,
        "bonus": "",
        "tile": null
      },
      {
        "row": 14,
        "col": 10,
        "bonus": "",
        "tile": null
      },
      {
        "row": 14,
        "col": 11,
        "bonus": "dls",
        "tile": null
      },
      {
        "row": 14,
        "col": 12,
        "bonus": "",
        "tile": null
      },
      {
        "row": 14,
        "col": 13,
        "bonus": "",
        "tile": null
      },
      {
        "row": 14,
        "col": 14,
        "bonus": "tws",
        "tile": null
      }
    ]
  ],
  "bag": [
    {
      "letter": "B",
      "points": 3,
      "id": "tile-B-1"
    },
    {
      "letter": "H",
      "points": 4,
      "id": "tile-H-1"
    },
    {
      "letter": "M",
      "points": 3,
      "id": "tile-M-0"
    },
    {
      "letter": "M",
      "points": 3,
      "id": "tile-M-1"
    },
    {
      "letter": "P",
      "points": 3,
      "id": "tile-P-1"
    },
    {
      "letter": "W",
      "points": 4,
      "id": "tile-W-1"
    }
  ],
  "players": [
    {
      "user": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "rack": [
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-10"
        },
        {
          "letter": "S",
          "points": 1,
          "id": "tile-S-3"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-5"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-7"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-4"
        },
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-3"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-5"
        }
      ],
      "score": 544
    },
    {
      "user": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "rack": [
        {
          "letter": "_",
          "points": 0,
          "id": "tile-_-0"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-3"
        },
        {
          "letter": "S",
          "points": 1,
          "id": "tile-S-2"
        },
        {
          "letter": "Z",
          "points": 10,
          "id": "tile-Z-0"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-1"
        },
        {
          "letter": "U",
          "points": 1,
          "id": "tile-U-3"
        },
        {
          "letter": "X",
          "points": 8,
          "id": "tile-X-0"
        }
      ],
      "score": 329
    }
  ],
  "playHistory": [
    {
      "playNumber": 0,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-6"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-1"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-2"
        },
        {
          "letter": "S",
          "points": 1,
          "id": "tile-S-0"
        },
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-4"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-3"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-11"
        }
      ],
      "placements": [
        {
          "row": 7,
          "col": 3,
          "bonus": "dls",
          "tile": {
            "letter": "S",
            "points": 1,
            "id": "tile-S-0"
          }
        },
        {
          "row": 7,
          "col": 4,
          "bonus": "",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-1"
          }
        },
        {
          "row": 7,
          "col": 5,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-6"
          }
        },
        {
          "row": 7,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "N",
            "points": 1,
            "id": "tile-N-4"
          }
        },
        {
          "row": 7,
          "col": 7,
          "bonus": "star",
          "tile": {
            "letter": "T",
            "points": 1,
            "id": "tile-T-3"
          }
        }
      ],
      "score": 12
    },
    {
      "playNumber": 1,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "U",
          "points": 1,
          "id": "tile-U-0"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-4"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-6"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-2"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-2"
        },
        {
          "letter": "V",
          "points": 4,
          "id": "tile-V-0"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-5"
        }
      ],
      "placements": [
        {
          "row": 8,
          "col": 6,
          "bonus": "dls",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-6"
          }
        },
        {
          "row": 9,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-2"
          }
        },
        {
          "row": 10,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "V",
            "points": 4,
            "id": "tile-V-0"
          }
        }
      ],
      "score": 8
    },
    {
      "playNumber": 2,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-2"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-11"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-4"
        },
        {
          "letter": "_",
          "points": 0,
          "id": "tile-_-1"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-5"
        },
        {
          "letter": "L",
          "points": 1,
          "id": "tile-L-2"
        },
        {
          "letter": "G",
          "points": 2,
          "id": "tile-G-2"
        }
      ],
      "placements": [
        {
          "row": 10,
          "col": 7,
          "bonus": "",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-2"
          }
        },
        {
          "row": 10,
          "col": 8,
          "bonus": "",
          "tile": {
            "letter": "L",
            "points": 1,
            "id": "tile-L-2"
          }
        },
        {
          "row": 10,
          "col": 9,
          "bonus": "",
          "tile": {
            "letter": "G",
            "points": 2,
            "id": "tile-G-2"
          }
        },
        {
          "row": 10,
          "col": 10,
          "bonus": "dws",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-4"
          }
        },
        {
          "row": 10,
          "col": 5,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-11"
          }
        }
      ],
      "score": 20
    },
    {
      "playNumber": 3,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "U",
          "points": 1,
          "id": "tile-U-0"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-4"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-2"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-5"
        },
        {
          "letter": "D",
          "points": 2,
          "id": "tile-D-2"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-0"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-0"
        }
      ],
      "placements": [
        {
          "row": 7,
          "col": 11,
          "bonus": "dls",
          "tile": {
            "letter": "D",
            "points": 2,
            "id": "tile-D-2"
          }
        },
        {
          "row": 8,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-0"
          }
        },
        {
          "row": 9,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-2"
          }
        },
        {
          "row": 10,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "T",
            "points": 1,
            "id": "tile-T-5"
          }
        },
        {
          "row": 11,
          "col": 11,
          "bonus": "dws",
          "tile": {
            "letter": "U",
            "points": 1,
            "id": "tile-U-0"
          }
        },
        {
          "row": 12,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-4"
          }
        }
      ],
      "score": 29
    },
    {
      "playNumber": 4,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "_",
          "points": 0,
          "id": "tile-_-1"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-5"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-0"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-1"
        },
        {
          "letter": "F",
          "points": 4,
          "id": "tile-F-1"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-9"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-5"
        }
      ],
      "placements": [
        {
          "row": 13,
          "col": 5,
          "bonus": "tls",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-5"
          }
        },
        {
          "row": 13,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "F",
            "points": 4,
            "id": "tile-F-1"
          }
        },
        {
          "row": 13,
          "col": 7,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-0"
          }
        },
        {
          "row": 13,
          "col": 8,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-1"
          }
        },
        {
          "row": 13,
          "col": 9,
          "bonus": "tls",
          "tile": {
            "letter": "_",
            "points": 0,
            "id": "tile-_-1"
          }
        },
        {
          "row": 13,
          "col": 10,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-9"
          }
        },
        {
          "row": 13,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-5"
          }
        }
      ],
      "score": 69
    },
    {
      "playNumber": 5,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-0"
        },
        {
          "letter": "Y",
          "points": 4,
          "id": "tile-Y-1"
        },
        {
          "letter": "C",
          "points": 3,
          "id": "tile-C-1"
        },
        {
          "letter": "L",
          "points": 1,
          "id": "tile-L-3"
        },
        {
          "letter": "Q",
          "points": 10,
          "id": "tile-Q-0"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-7"
        },
        {
          "letter": "Y",
          "points": 4,
          "id": "tile-Y-0"
        }
      ],
      "placements": [
        {
          "row": 6,
          "col": 2,
          "bonus": "dls",
          "tile": {
            "letter": "C",
            "points": 3,
            "id": "tile-C-1"
          }
        },
        {
          "row": 7,
          "col": 2,
          "bonus": "",
          "tile": {
            "letter": "L",
            "points": 1,
            "id": "tile-L-3"
          }
        },
        {
          "row": 8,
          "col": 2,
          "bonus": "dls",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-0"
          }
        },
        {
          "row": 9,
          "col": 2,
          "bonus": "",
          "tile": {
            "letter": "Q",
            "points": 10,
            "id": "tile-Q-0"
          }
        },
        {
          "row": 10,
          "col": 2,
          "bonus": "",
          "tile": {
            "letter": "Y",
            "points": 4,
            "id": "tile-Y-1"
          }
        }
      ],
      "score": 29
    },
    {
      "playNumber": 6,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-4"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-3"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-7"
        },
        {
          "letter": "V",
          "points": 4,
          "id": "tile-V-1"
        },
        {
          "letter": "H",
          "points": 4,
          "id": "tile-H-0"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-4"
        },
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-2"
        }
      ],
      "placements": [
        {
          "row": 14,
          "col": 0,
          "bonus": "tws",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-4"
          }
        },
        {
          "row": 14,
          "col": 1,
          "bonus": "",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-3"
          }
        },
        {
          "row": 14,
          "col": 2,
          "bonus": "",
          "tile": {
            "letter": "V",
            "points": 4,
            "id": "tile-V-1"
          }
        },
        {
          "row": 14,
          "col": 3,
          "bonus": "dls",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-4"
          }
        },
        {
          "row": 14,
          "col": 4,
          "bonus": "",
          "tile": {
            "letter": "H",
            "points": 4,
            "id": "tile-H-0"
          }
        },
        {
          "row": 14,
          "col": 5,
          "bonus": "",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-7"
          }
        },
        {
          "row": 14,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-2"
          }
        }
      ],
      "score": 99
    },
    {
      "playNumber": 7,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-7"
        },
        {
          "letter": "Y",
          "points": 4,
          "id": "tile-Y-0"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-8"
        },
        {
          "letter": "K",
          "points": 5,
          "id": "tile-K-0"
        },
        {
          "letter": "D",
          "points": 2,
          "id": "tile-D-1"
        },
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-5"
        },
        {
          "letter": "J",
          "points": 8,
          "id": "tile-J-0"
        }
      ],
      "placements": [
        {
          "row": 6,
          "col": 8,
          "bonus": "dls",
          "tile": {
            "letter": "J",
            "points": 8,
            "id": "tile-J-0"
          }
        },
        {
          "row": 6,
          "col": 9,
          "bonus": "",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-8"
          }
        },
        {
          "row": 6,
          "col": 10,
          "bonus": "",
          "tile": {
            "letter": "Y",
            "points": 4,
            "id": "tile-Y-0"
          }
        },
        {
          "row": 6,
          "col": 11,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-7"
          }
        },
        {
          "row": 6,
          "col": 12,
          "bonus": "dls",
          "tile": {
            "letter": "D",
            "points": 2,
            "id": "tile-D-1"
          }
        },
        {
          "row": 6,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "K",
            "points": 5,
            "id": "tile-K-0"
          }
        },
        {
          "row": 6,
          "col": 14,
          "bonus": "",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-5"
          }
        }
      ],
      "score": 91
    },
    {
      "playNumber": 8,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-2"
        },
        {
          "letter": "A",
          "points": 1,
          "id": "tile-A-0"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-0"
        },
        {
          "letter": "B",
          "points": 3,
          "id": "tile-B-0"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-8"
        },
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-5"
        },
        {
          "letter": "U",
          "points": 1,
          "id": "tile-U-2"
        }
      ],
      "placements": [
        {
          "row": 3,
          "col": 14,
          "bonus": "dls",
          "tile": {
            "letter": "B",
            "points": 3,
            "id": "tile-B-0"
          }
        },
        {
          "row": 4,
          "col": 14,
          "bonus": "",
          "tile": {
            "letter": "U",
            "points": 1,
            "id": "tile-U-2"
          }
        },
        {
          "row": 5,
          "col": 14,
          "bonus": "",
          "tile": {
            "letter": "N",
            "points": 1,
            "id": "tile-N-2"
          }
        },
        {
          "row": 0,
          "col": 14,
          "bonus": "tws",
          "tile": {
            "letter": "T",
            "points": 1,
            "id": "tile-T-0"
          }
        },
        {
          "row": 1,
          "col": 14,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-8"
          }
        },
        {
          "row": 2,
          "col": 14,
          "bonus": "",
          "tile": {
            "letter": "N",
            "points": 1,
            "id": "tile-N-5"
          }
        },
        {
          "row": 7,
          "col": 14,
          "bonus": "tws",
          "tile": {
            "letter": "A",
            "points": 1,
            "id": "tile-A-0"
          }
        }
      ],
      "score": 167
    },
    {
      "playNumber": 9,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-1"
        },
        {
          "letter": "L",
          "points": 1,
          "id": "tile-L-1"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-7"
        },
        {
          "letter": "D",
          "points": 2,
          "id": "tile-D-3"
        },
        {
          "letter": "S",
          "points": 1,
          "id": "tile-S-1"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-3"
        },
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-0"
        }
      ],
      "placements": [
        {
          "row": 0,
          "col": 7,
          "bonus": "tws",
          "tile": {
            "letter": "D",
            "points": 2,
            "id": "tile-D-3"
          }
        },
        {
          "row": 0,
          "col": 8,
          "bonus": "",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-1"
          }
        },
        {
          "row": 0,
          "col": 9,
          "bonus": "",
          "tile": {
            "letter": "L",
            "points": 1,
            "id": "tile-L-1"
          }
        },
        {
          "row": 0,
          "col": 10,
          "bonus": "",
          "tile": {
            "letter": "N",
            "points": 1,
            "id": "tile-N-0"
          }
        },
        {
          "row": 0,
          "col": 11,
          "bonus": "dls",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-7"
          }
        },
        {
          "row": 0,
          "col": 12,
          "bonus": "",
          "tile": {
            "letter": "S",
            "points": 1,
            "id": "tile-S-1"
          }
        },
        {
          "row": 0,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-3"
          }
        }
      ],
      "score": 80
    },
    {
      "playNumber": 10,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-0"
        },
        {
          "letter": "L",
          "points": 1,
          "id": "tile-L-0"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-2"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-2"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-6"
        },
        {
          "letter": "D",
          "points": 2,
          "id": "tile-D-0"
        },
        {
          "letter": "F",
          "points": 4,
          "id": "tile-F-0"
        }
      ],
      "placements": [
        {
          "row": 1,
          "col": 5,
          "bonus": "tls",
          "tile": {
            "letter": "F",
            "points": 4,
            "id": "tile-F-0"
          }
        },
        {
          "row": 1,
          "col": 6,
          "bonus": "",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-6"
          }
        },
        {
          "row": 1,
          "col": 7,
          "bonus": "",
          "tile": {
            "letter": "L",
            "points": 1,
            "id": "tile-L-0"
          }
        },
        {
          "row": 1,
          "col": 8,
          "bonus": "",
          "tile": {
            "letter": "D",
            "points": 2,
            "id": "tile-D-0"
          }
        },
        {
          "row": 1,
          "col": 4,
          "bonus": "",
          "tile": {
            "letter": "T",
            "points": 1,
            "id": "tile-T-2"
          }
        },
        {
          "row": 1,
          "col": 3,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-2"
          }
        },
        {
          "row": 1,
          "col": 2,
          "bonus": "",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-0"
          }
        }
      ],
      "score": 75
    },
    {
      "playNumber": 11,
      "player": {
        "_id": "5cb00071cdbcf74ff3407e7f",
        "id": "113014011347326231241",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "eepphhrraaiimm@gmail.com",
        "imageUrl": "https://lh4.googleusercontent.com/-bGltm710zRM/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcmj0-kAVuy2Bvh-4TATGuVkbomrg/s96-c/photo.jpg",
        "memberStatus": "ADMIN",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "G",
          "points": 2,
          "id": "tile-G-0"
        },
        {
          "letter": "P",
          "points": 3,
          "id": "tile-P-0"
        },
        {
          "letter": "I",
          "points": 1,
          "id": "tile-I-8"
        },
        {
          "letter": "G",
          "points": 2,
          "id": "tile-G-1"
        },
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-3"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-3"
        },
        {
          "letter": "R",
          "points": 1,
          "id": "tile-R-1"
        }
      ],
      "placements": [
        {
          "row": 11,
          "col": 0,
          "bonus": "dls",
          "tile": {
            "letter": "G",
            "points": 2,
            "id": "tile-G-1"
          }
        },
        {
          "row": 12,
          "col": 0,
          "bonus": "",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-3"
          }
        },
        {
          "row": 13,
          "col": 0,
          "bonus": "",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-3"
          }
        },
        {
          "row": 10,
          "col": 0,
          "bonus": "",
          "tile": {
            "letter": "P",
            "points": 3,
            "id": "tile-P-0"
          }
        },
        {
          "row": 9,
          "col": 0,
          "bonus": "",
          "tile": {
            "letter": "G",
            "points": 2,
            "id": "tile-G-0"
          }
        },
        {
          "row": 8,
          "col": 0,
          "bonus": "",
          "tile": {
            "letter": "I",
            "points": 1,
            "id": "tile-I-8"
          }
        },
        {
          "row": 7,
          "col": 0,
          "bonus": "tws",
          "tile": {
            "letter": "R",
            "points": 1,
            "id": "tile-R-1"
          }
        }
      ],
      "score": 92
    },
    {
      "playNumber": 12,
      "player": {
        "_id": "5cbb938c48dad5a358f9d0b6",
        "id": "113019734165160091458",
        "name": "Ephraim Glick",
        "givenName": "Ephraim",
        "familyName": "Glick",
        "email": "enggumtree@gmail.com",
        "imageUrl": "https://lh6.googleusercontent.com/-7RpulmIq8Us/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVxiokGv6Euphco-mPWQDOrd_CYw/s96-c/photo.jpg",
        "memberStatus": "ACTIVE",
        "settings": {
          "fixFooter": false,
          "emailNotifications": false
        }
      },
      "startRack": [
        {
          "letter": "U",
          "points": 1,
          "id": "tile-U-1"
        },
        {
          "letter": "W",
          "points": 4,
          "id": "tile-W-0"
        },
        {
          "letter": "T",
          "points": 1,
          "id": "tile-T-1"
        },
        {
          "letter": "N",
          "points": 1,
          "id": "tile-N-1"
        },
        {
          "letter": "O",
          "points": 1,
          "id": "tile-O-4"
        },
        {
          "letter": "E",
          "points": 1,
          "id": "tile-E-6"
        },
        {
          "letter": "C",
          "points": 3,
          "id": "tile-C-0"
        }
      ],
      "placements": [
        {
          "row": 7,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "U",
            "points": 1,
            "id": "tile-U-1"
          }
        },
        {
          "row": 8,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "N",
            "points": 1,
            "id": "tile-N-1"
          }
        },
        {
          "row": 9,
          "col": 13,
          "bonus": "tls",
          "tile": {
            "letter": "W",
            "points": 4,
            "id": "tile-W-0"
          }
        },
        {
          "row": 10,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "O",
            "points": 1,
            "id": "tile-O-4"
          }
        },
        {
          "row": 11,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "C",
            "points": 3,
            "id": "tile-C-0"
          }
        },
        {
          "row": 13,
          "col": 13,
          "bonus": "dws",
          "tile": {
            "letter": "T",
            "points": 1,
            "id": "tile-T-1"
          }
        },
        {
          "row": 12,
          "col": 13,
          "bonus": "",
          "tile": {
            "letter": "E",
            "points": 1,
            "id": "tile-E-6"
          }
        }
      ],
      "score": 102
    }
  ],
  "tilesToExchange": [

  ]
}

module.exports.mockGame = mockGame1;
module.exports.mockGames = [mockGame1, mockGame2];
module.exports.mockUser1 = mockUser1;
module.exports.mockUser2 = mockUser2;
module.exports.mockUser3 = mockUser3;
module.exports.mockUsers = [mockUser1, mockUser2, mockUser3];
