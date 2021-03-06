
import { bonuses } from './constants';
import {
    Board,
    Game,
    User,
    Play,
    Bag,
} from 'src/interfaces/interfaces';

export const emptyUser: User = {
    id: null,
    name: null,
    givenName: null,
    familyName: null,
    email: null,
    imageUrl: null,
    memberStatus: 'PENDING',
    settings: {
        fixFooter: false,
        emailNotifications: true
    }
};

export const mockUser1: User = {
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

export const mockUser2: User = {
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

export const mockUser3: User = {
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

export const mockPlay1: Play = {
    playNumber: 0,
    player: mockUser1,
    startRack: [
        { "letter":"Q", "points":10, "id":"tile-Q-0" },
        { "letter":"U", "points":1, "id":"tile-U-0" },
        { "letter":"O", "points":1, "id":"tile-O-0" },
        { "letter":"T", "points":1, "id":"tile-T-0" },
        { "letter":"E", "points":1, "id":"tile-E-0" },
        { "letter":"S", "points":1, "id":"tile-S-0" },
        { "letter":"L", "points":1, "id":"tile-L-0" }
    ],
    placements: [
        { row: 7, col: 3, bonus: 'dls', tile: { "letter":"Q", "points":10, "id":"tile-Q-0" } },
        { row: 7, col: 4, bonus: null, tile: { "letter":"U", "points":1, "id":"tile-U-0" } },
        { row: 7, col: 5, bonus: null, tile: { "letter":"O", "points":1, "id":"tile-O-0" } },
        { row: 7, col: 6, bonus: null, tile: { "letter":"T", "points":1, "id":"tile-T-0" } },
        { row: 7, col: 7, bonus: 'star', tile: { "letter":"E", "points":1, "id":"tile-E-0" } },
    ],
    plainWords: ['QUOTE'],
    score: 48
}

export const mockPlay2: Play = {
    playNumber: 1,
    player: mockUser2,
    startRack: [
        { "letter":"A", "points":1, "id":"tile-A-0" },
        { "letter":"P", "points":3, "id":"tile-P-0" },
        { "letter":"B", "points":3, "id":"tile-B-0" },
        { "letter":"V", "points":4, "id":"tile-V-1" },
        { "letter":"O", "points":1, "id":"tile-O-1" },
        { "letter":"E", "points":1, "id":"tile-E-1" },
        { "letter":"Y", "points":4, "id":"tile-Y-0" },
    ],
    placements: [
        { row: 5, col: 6, bonus: null, tile: { "letter":"A", "points":1, "id":"tile-A-0" } },
        { row: 6, col: 6, bonus: null, tile: { "letter":"P", "points":3, "id":"tile-P-0" } }
    ],
    plainWords: ['APT'],
    score: 8
}

const mockSquares = Array(15).fill(null).map((wholeRow, row) => {
    return Array(15).fill(null).map((sqInRow, col) => {
        return { row, col, bonus: bonuses[row][col], tile: null }; });
});
mockSquares[7][3].tile = { "letter":"Q", "points":10, "id":"tile-Q-0" };
mockSquares[7][4].tile = { "letter":"U", "points":1, "id":"tile-U-0" };
mockSquares[7][5].tile = { "letter":"O", "points":1, "id":"tile-O-0" };
mockSquares[7][6].tile = { "letter":"T", "points":1, "id":"tile-T-0" };
mockSquares[7][7].tile = { "letter":"E", "points":1, "id":"tile-E-0" };
mockSquares[5][6].tile = { "letter":"A", "points":1, "id":"tile-A-0" };
mockSquares[6][6].tile = { "letter":"P", "points":3, "id":"tile-P-0" };

export const mockBoard: Board = mockSquares;

export const mockBag: Bag = [
    { "letter":"_", "points":0, "id":"tile-_-0" },
    { "letter":"_", "points":0, "id":"tile-_-1" },
    // { "letter":"A", "points":1, "id":"tile-A-0" },
    { "letter":"A", "points":1, "id":"tile-A-1" },
    { "letter":"A", "points":1, "id":"tile-A-2" },
    { "letter":"A", "points":1, "id":"tile-A-3" },
    { "letter":"A", "points":1, "id":"tile-A-4" },
    { "letter":"A", "points":1, "id":"tile-A-5" },
    { "letter":"A", "points":1, "id":"tile-A-6" },
    { "letter":"A", "points":1, "id":"tile-A-7" },
    { "letter":"A", "points":1, "id":"tile-A-8" },
    // { "letter":"B", "points":3, "id":"tile-B-0" },
    { "letter":"B", "points":3, "id":"tile-B-1" },
    { "letter":"C", "points":3, "id":"tile-C-0" },
    { "letter":"C", "points":3, "id":"tile-C-1" },
    { "letter":"D", "points":2, "id":"tile-D-0" },
    { "letter":"D", "points":2, "id":"tile-D-1" },
    { "letter":"D", "points":2, "id":"tile-D-2" },
    { "letter":"D", "points":2, "id":"tile-D-3" },
    // { "letter":"E", "points":1, "id":"tile-E-0" },
    // { "letter":"E", "points":1, "id":"tile-E-1" },
    { "letter":"E", "points":1, "id":"tile-E-2" },
    { "letter":"E", "points":1, "id":"tile-E-3" },
    { "letter":"E", "points":1, "id":"tile-E-4" },
    { "letter":"E", "points":1, "id":"tile-E-5" },
    { "letter":"E", "points":1, "id":"tile-E-6" },
    { "letter":"E", "points":1, "id":"tile-E-7" },
    { "letter":"E", "points":1, "id":"tile-E-8" },
    { "letter":"E", "points":1, "id":"tile-E-9" },
    { "letter":"E", "points":1, "id":"tile-E-10" },
    { "letter":"E", "points":1, "id":"tile-E-11" },
    { "letter":"F", "points":4, "id":"tile-F-0" },
    { "letter":"F", "points":4, "id":"tile-F-1" },
    { "letter":"G", "points":2, "id":"tile-G-0" },
    { "letter":"G", "points":2, "id":"tile-G-1" },
    { "letter":"G", "points":2, "id":"tile-G-2" },
    // { "letter":"H", "points":4, "id":"tile-H-0" },
    // { "letter":"H", "points":4, "id":"tile-H-1" },
    // { "letter":"I", "points":1, "id":"tile-I-0" },
    // { "letter":"I", "points":1, "id":"tile-I-1" },
    // { "letter":"I", "points":1, "id":"tile-I-2" },
    // { "letter":"I", "points":1, "id":"tile-I-3" },
    // { "letter":"I", "points":1, "id":"tile-I-4" },
    // { "letter":"I", "points":1, "id":"tile-I-5" },
    { "letter":"I", "points":1, "id":"tile-I-6" },
    { "letter":"I", "points":1, "id":"tile-I-7" },
    { "letter":"I", "points":1, "id":"tile-I-8" },
    { "letter":"J", "points":8, "id":"tile-J-0" },
    { "letter":"K", "points":5, "id":"tile-K-0" },
    // { "letter":"L", "points":1, "id":"tile-L-0" },
    { "letter":"L", "points":1, "id":"tile-L-1" },
    { "letter":"L", "points":1, "id":"tile-L-2" },
    { "letter":"L", "points":1, "id":"tile-L-3" },
    { "letter":"M", "points":3, "id":"tile-M-0" },
    { "letter":"M", "points":3, "id":"tile-M-1" },
    { "letter":"N", "points":1, "id":"tile-N-0" },
    { "letter":"N", "points":1, "id":"tile-N-1" },
    { "letter":"N", "points":1, "id":"tile-N-2" },
    { "letter":"N", "points":1, "id":"tile-N-3" },
    { "letter":"N", "points":1, "id":"tile-N-4" },
    { "letter":"N", "points":1, "id":"tile-N-5" },
    // { "letter":"O", "points":1, "id":"tile-O-0" },
    // { "letter":"O", "points":1, "id":"tile-O-1" },
    { "letter":"O", "points":1, "id":"tile-O-2" },
    { "letter":"O", "points":1, "id":"tile-O-3" },
    { "letter":"O", "points":1, "id":"tile-O-4" },
    { "letter":"O", "points":1, "id":"tile-O-5" },
    { "letter":"O", "points":1, "id":"tile-O-6" },
    { "letter":"O", "points":1, "id":"tile-O-7" },
    // { "letter":"P", "points":3, "id":"tile-P-0" },
    { "letter":"P", "points":3, "id":"tile-P-1" },
    // { "letter":"Q", "points":10, "id":"tile-Q-0" },
    { "letter":"R", "points":1, "id":"tile-R-0" },
    { "letter":"R", "points":1, "id":"tile-R-1" },
    { "letter":"R", "points":1, "id":"tile-R-2" },
    { "letter":"R", "points":1, "id":"tile-R-3" },
    { "letter":"R", "points":1, "id":"tile-R-4" },
    { "letter":"R", "points":1, "id":"tile-R-5" },
    // { "letter":"S", "points":1, "id":"tile-S-0" },
    { "letter":"S", "points":1, "id":"tile-S-1" },
    { "letter":"S", "points":1, "id":"tile-S-2" },
    { "letter":"S", "points":1, "id":"tile-S-3" },
    // { "letter":"T", "points":1, "id":"tile-T-0" },
    { "letter":"T", "points":1, "id":"tile-T-1" },
    { "letter":"T", "points":1, "id":"tile-T-2" },
    { "letter":"T", "points":1, "id":"tile-T-3" },
    { "letter":"T", "points":1, "id":"tile-T-4" },
    { "letter":"T", "points":1, "id":"tile-T-5" },
    // { "letter":"U", "points":1, "id":"tile-U-0" },
    { "letter":"U", "points":1, "id":"tile-U-1" },
    { "letter":"U", "points":1, "id":"tile-U-2" },
    { "letter":"U", "points":1, "id":"tile-U-3" },
    { "letter":"V", "points":4, "id":"tile-V-0" },
    // { "letter":"V", "points":4, "id":"tile-V-1" },
    { "letter":"W", "points":4, "id":"tile-W-0" },
    { "letter":"W", "points":4, "id":"tile-W-1" },
    { "letter":"X", "points":8, "id":"tile-X-0" },
    // { "letter":"Y", "points":4, "id":"tile-Y-0" },
    { "letter":"Y", "points":4, "id":"tile-Y-1" },
    { "letter":"Z", "points":10, "id":"tile-Z-0" }
];

export const mockGame: Game = {
    id: 'game1',
    players: [
        {
            user: mockUser1,
            rack: [
                { "letter":"E", "points":1, "id":"tile-E-1" },
                { "letter":"Y", "points":4, "id":"tile-Y-0" },
                { "letter":"H", "points":4, "id":"tile-H-1" },
                { "letter":"I", "points":1, "id":"tile-I-0" },
                { "letter":"I", "points":1, "id":"tile-I-2" },
                { "letter":"I", "points":1, "id":"tile-I-4" },
                { "letter":"I", "points":1, "id":"tile-I-5" },
            ],
            score: 48
        },
        {
            user: mockUser2,
            rack: [
                { "letter":"B", "points":3, "id":"tile-B-0" },
                { "letter":"V", "points":4, "id":"tile-V-1" },
                { "letter":"O", "points":1, "id":"tile-O-1" },
                { "letter":"E", "points":1, "id":"tile-E-1" },
                { "letter":"Y", "points":4, "id":"tile-Y-0" },
                { "letter":"I", "points":1, "id":"tile-I-3" },
                { "letter":"I", "points":1, "id":"tile-I-1" },
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
    chats: {
      messages: [],
      views: {},
    }
};
