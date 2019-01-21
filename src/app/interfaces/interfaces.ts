
export interface Tile {
    id: string;
    points: number;
    letter: string;
};

export interface Square {
    row: number;
    col: number;
    bonus?: string;
    tile: Tile;
};

export interface User {
    id: string;
    name: string;
    email: string;
};

export interface Placement {
    row: number;
    col: number;
    bonus?: string;
    tile: Tile;
}

export interface Play {
    playNumber: number;
    player: User;
    startRack: Tile[];
    placements: Placement[];
    score: number;
}

export interface Player {
    user: User;
    rack: Tile[];
    score: number;
}

export interface Game {
    id: string;
    players: Player[];
    board: Board;
    bag: Tile[];
    playHistory: Play[];
    tilesToExchange: Tile[];
};

export interface Board {
    squares: Square[][];
};

export interface Bag extends Array<Tile> {};
