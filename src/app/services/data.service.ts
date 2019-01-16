import { Injectable } from '@angular/core';
import { Game } from '../interfaces/interfaces';
import { mockGame, mockUser1 } from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentUser;
  private currentGame;
  loading;

  constructor() {}

  fetchGame(id?: string) {
    this.loading = true;
    setTimeout(() => {
      this.currentGame = mockGame;
      this.loading = false;
    }, 100);
  }

  fetchUser(id?: string) {
    this.loading = true;
    setTimeout(() => {
      this.currentUser = mockUser1;
      this.loading = false;
    }, 100);
  }

  setNewGame(game: Game) {
    this.currentGame = game;
  }

  get bag() {
    return this.currentGame.bag;
  }

  set bag(bagToSave) {
    this.currentGame.bag = bagToSave;
  }

  get board() {
    return this.currentGame.board;
  }

  set board(boardToSave) {
    this.currentGame.board = boardToSave;
  }

  get players() {
    return this.currentGame.players;
  }

  get playHistory() {
    return this.currentGame.playHistory;
  }

  get user() {
    return this.currentUser;
  }

}
