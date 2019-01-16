import { Injectable } from '@angular/core';
import { BoardService } from './board.service';
import { BagService } from './bag.service';
import {
  Game,
  Board,
  Bag,
  User,
  Play,
} from '../interfaces/interfaces';
import {
  mockGame,
  mockUser1,
  mockUser2,
  mockUser3,
  mockBoard,
  mockBag,
} from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  constructor(
    private boardService: BoardService,
    private bagService: BagService,
  ) {
    this.game = mockGame;
  }

  create(players: Player[]) {
    // const newGame: Game = {
    //   id: '1abc',
    //   board: this.boardService.create(),
    //   bag: this.bagService.create(),
    //   players: players,
    //   playHistory: [],
    // }
    // return newGame;r
  }

  get playerCount() {
    return this.game.players.length;
  }

  get currentTurn() {
    return this.game.playHistory.length + 1;
  }

  get currentPlayer() {
    return this.game.players[(this.currentTurn % this.playerCount) - 1];
  }

}
