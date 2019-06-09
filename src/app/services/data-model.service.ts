import _clone from 'lodash.clonedeep';

import { Injectable } from '@angular/core';
import { bonuses } from '../../constants';
import { Tile, Bag, Board, Chats, Player, Rack, Play, Placement, Game, User } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  loading = false;
  selectedTile: Tile;
  isFooterFixed: boolean = true;
  allDropLists: string[] = ['testid'];
  dragging: boolean = false;
  // Keep these private, access via getters / setters
  private currentUser: User;
  private currentGame: Game;
  private allUsers: User[] = [];
  private allGames: Game[] = [];
  private currentPlay: Play;
  private currentTilesToExchange: Tile[] = [];

  constructor() {
    // For drag and drop, fill in allDropLists array
    Array(15).fill(null).forEach((row, i) => {
      Array(15).fill(null).forEach((col, j) => {
        this.allDropLists.push(`square-${i}-${j}`);
      })
    });
  }

  //////////////////////////////
  // TOP LEVEL GETTERS & SETTERS

  get user(): User {
    return this.currentUser;
  }

  set user(user) {
    this.currentUser = user;
  }

  get game(): Game {
    return this.currentGame;
  }

  set game(game: Game) {
    this.currentGame = game;
  }

  get users(): User[] {
    return this.allUsers;
  }

  set users(users: User[]) {
    this.allUsers = users;
  }

  get games(): Game[] {
    return this.allGames;
  }

  set games(games: Game[]) {
    this.allGames = games;
  }

  get play(): Play {
    return this.currentPlay;
  }

  set play(play) {
    this.currentPlay = play;
  }

  get tilesToExchange(): Tile[] {
    return this.currentTilesToExchange;
  } 

  ////////////////////////////////////
  // GAME PROPERTY GETTERS AND SETTERS

  get bag(): Bag {
    return this.game ? this.game.bag : [];
  }

  set bag(bag: Bag) {
    this.bag = bag;
  }

  get board(): Board {
    return this.game ? this.game.board : [[]];
  }

  set board(boardToSave: Board) {
    this.game.board = boardToSave;
  }

  get players(): Player[] {
    return this.game ? this.game.players : [];
  }

  get playHistory(): Play[] {
    return this.game ? this.game.playHistory : [];
  }

  get chats(): Chats {
    return this.game && this.game.chats
      ? this.game.chats
      : { messages: [], views: {} };
  }

  ////////////////////////////////////
  // PLAY PROPERTY GETTERS AND SETTERS

  get placements(): Placement[] {
    return this.play ? this.play.placements : [];
  }

  ///////////////////////////////////
  // GAME-RELATED GETTERS AND SETTERS

  get currentPlayer(): Player {
    const turnNumber = this.playHistory.length;
    return this.players[(turnNumber % this.players.length)];
  }

  get nextPlayer(): Player {
    const nextTurnNumber = this.playHistory.length + 1;
    return this.players[(nextTurnNumber % this.players.length)];
  }

  get currentTurn(): number {
    return this.game ? this.playHistory.length + 1 : 0;
  }

  get gameOver(): boolean {
    return this.bag.length < 1 && this.players.some(player => {
      if (player.rack.length > 0) { return false; }
      // even if player has empty rack, they need to submit the play!
      return player.user.id === this.currentPlayer.user.id
        ? this.play.placements.length < 1
        : true;
    });
  }

  get winner() {
    if (!this.gameOver) {
      throw new Error('Get winner error: Game still in progress!')
    }
    // winner is whoever is first to have no tiles while bag is empty
    return this.players.find(player => {
      return player.rack.length < 1;
    });
  }

  ///////////////////////////////////
  // PLAY-RELATED GETTERS AND SETTERS

  get placedTiles(): Tile[] {
    return this.placements.map(p => p.tile);
  }

  /////////////////////////////////////
  // PLAYER-RELATED GETTERS AND SETTERS

  get isCurrentPlayerUser(): boolean {
    return this.currentPlayer && this.user
      ? this.currentPlayer.user.id === this.user.id
      : false;
  }

  get playerCount(): number {
    return this.game.players.length;
  }

  getPlayerNameFromId(inputUserId, players = this.players) {
    const player = players.find(player => player.user.id === inputUserId);
    return player.user.givenName;
  }

  get rack(): Rack {
    // show rack of current player if that's the user
    if (this.currentPlayer.user.id === this.user.id) {
      return this.currentPlayer.rack;
    }
    // otherwise, find rack of player that's the user
    const userPlayer = this.players.find(player => {
      return player.user.id === this.user.id;
    });
    return userPlayer ? userPlayer.rack : [];
  }

  get rackCount(): number {
    return this.rack.length;
  }

  ////////////////////////////////////
  // BOARD-RELATED GETTERS AND SETTERS

  get squares() {
    // TODO: Is there a point to this?
    return this.board;
  }

  getSquare(row, col) {
    if (!this.board[row]) { return undefined; }
    return this.board[row][col];
  }

  getBonus(row, col) {
    return bonuses[row][col] || '';
  }

  ////////////////////////////////////
  // CHAT-RELATED GETTERS AND SETTERS

  get chatMessages() {
    return this.chats.messages;
  }

  get chatViews() {
    return this.chats.views;
  }

  get userChatView() {
    if (this.chatViews[this.user.id]) {
      // Date is stored as string in DB
      return new Date(this.chatViews[this.user.id]);
    }
    return undefined;
  }

}
