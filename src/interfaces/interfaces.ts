
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
  plainWords: String[];
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
  chats: Chats;
};

export interface Board extends Array<Array<Square>> { };

export interface Bag extends Array<Tile> { };

export interface NewMoveEmailPayload {
  game: Game;
  recipient: Player;
};

export interface ChatMessage {
  authorUserId: string;
  date: Date;
  message: string;
};

export interface ChatViews {
  // key is viewer user id
  // value is most recent view by that user
  [key: string]: Date;
}

export interface Chats {
  messages: ChatMessage[];
  views: ChatViews;
};
