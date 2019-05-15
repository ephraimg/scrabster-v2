
export interface Tile {
  id: string;
  points: number;
  letter: string;
};

export interface Rack extends Array<Tile> { };

export interface Square {
  row: number;
  col: number;
  bonus: string;
  tile: Tile;
};

export interface UserSettings {
  fixFooter: boolean;
  emailNotifications: boolean;
}

export interface User {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl: string;
  memberStatus: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'ADMIN';
  settings: UserSettings;
};

export interface ExtractedGoogleUser {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl: string;
}

export interface Placement {
  row: number;
  col: number;
  bonus: string;
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

export interface Board extends Array<Array<Square>> { };

export interface Bag extends Array<Tile> { };
