
export interface Tile {
    id: string;
    points: number;
    letter: string;
};

export interface Square {
    bonus?: string;
    tile?: Tile;
};

export interface User {
    id?: string;
    name?: string;
};

export interface Play {
    playNumber: number;
    board: any;
    player: User;
    startRack?: Tile[];
    placements?: []; 
}

export interface Game {
    id?: string;
    players?: User[];
    board?: any;
    bag?: Tile[];
    tilesToExchange?: Tile[];
};

export interface Board {
    squares?: Square[];
}
