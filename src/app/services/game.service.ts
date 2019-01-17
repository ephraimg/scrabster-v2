import { Injectable } from '@angular/core';
import { BoardService } from './board.service';
import { BagService } from './bag.service';
import { UserService } from './user.service';
import {
  Game,
  Board,
  Bag,
  User,
  Play,
  Tile,
  Player,
  Square
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
  selectedTile: Tile;
  tilesToExchange: Tile[] = [];
  currentPlay: Play;

  constructor(
    private boardService: BoardService,
    private bagService: BagService,
    private userService: UserService,
  ) {
    this.game = mockGame;
    this.currentPlay = {
      playNumber: this.currentTurn,
      player: this.userService.user,
      startRack: this.currentPlayer.rack,
      placements: [],
      score: 0
    };
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

  selectTile(event, tile: Tile) {
    console.log('clicked: ', tile, event);
    event.stopPropagation();
    if (this.userService.user.id !== this.currentPlayer.user.id) {
      return false;
    }
    if (!this.selectedTile) {
        this.selectedTile = tile;
    } else if (this.selectedTile.id === tile.id) {
        this.selectedTile = null;
    } else {
      if (this.currentRack.includes(tile) &&
        this.currentRack.includes(this.selectedTile)
      ) {
        this.rackSwap(tile, this.selectedTile);
        this.selectedTile = null;
      }
    }
  }

  selectSquareOrRack(target?: Square) {
    console.log('selected');
    const selected = this.selectedTile;
    if (this.userService.user.id !== this.currentPlayer.user.id) { return false; }
    if (!selected) { return; }
    const placements = this.currentPlay.placements;
    const tileIsOnBoard = placements.map(p => p.tile).includes(selected);
    const tileIsOnRack = this.currentRack.includes(selected);
    
    if (tileIsOnRack && target && target.row !== undefined) {
      const success = this.boardService.placeTile(selected, target.row, target.col);
      if (!success) { return; } // maybe square was occupied?
      this.currentPlay.placements.push(target);
      this.clearExchange();
      this.rackRemove(selected);
    }

    if (tileIsOnBoard) {
      const oldSq = placements.filter(p => p.tile && p.tile.id === selected.id)[0];
      // if user clicked a different square
      if (target && target.row !== undefined) {
        const success = this.boardService.placeTile(selected, target.row, target.col);
        if (!success) { return; } // maybe square was occupied?
        this.boardService.removeTile(selected, oldSq.row, oldSq.col);
        this.placementsRemove(oldSq);
        this.placementsAdd(target);
        this.clearExchange();
      } else { // if user clicked on the rack, not on a square
        this.placementsRemove(oldSq);
        this.boardService.removeTile(selected, oldSq.row, oldSq.col);
        this.rackAdd(selected);
      }
    }
    
    this.selectedTile = null;
  }

  rackSwap(tile1, tile2) {
    const tile1Idx = this.currentRack.indexOf(tile1);
    const tile2Idx = this.currentRack.indexOf(tile2);
    this.currentRack[tile1Idx] = tile2;
    this.currentRack[tile2Idx] = tile1;
    return this.currentRack;
  }

  rackRemove(tile) {
    const tileIndex = this.currentRack.findIndex(el => el.id === tile.id);
    this.currentRack.splice(tileIndex, 1);
    return this.currentRack;
  }

  rackAdd(tile) {
      this.currentRack.push(tile);
      return this.currentRack;
  }

  clearExchange() {
    const ttx = this.tilesToExchange;
    while (ttx.length > 0) { this.rackAdd(ttx.pop()); }
  }

  placementsAdd(square) {
    this.currentPlay.placements.push(square);
  }

  placementsRemove(square) {
    const placementsIdx = this.currentPlay.placements.indexOf(square);
    this.currentPlay.placements.splice(placementsIdx, 1);
  }

  get rackCount() {
      return this.currentRack.length;
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

  get currentRack() {
    return this.currentPlayer.rack;
  }

}
