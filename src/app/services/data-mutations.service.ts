import { v1 as uuid } from 'uuid';
import _clone from 'lodash.clonedeep';
import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataModelService } from './data-model.service';
import { AjaxService } from './ajax.service';
import { PlayValidationService } from './play-validation.service';
import { Tile, Bag, Board, Square, Player, Rack, Play, Placement, Game, User, ExtractedGoogleUser } from 'src/interfaces/interfaces';
import { tileTypes } from '../../constants';
import { mockUser1, mockUser2 } from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataMutationsService {

  constructor(
    private dms: DataModelService,
    private ajaxService: AjaxService,
    private playValidationService: PlayValidationService
  ) { }

  ///////////////////////////
  // EXCHANGE-RELATED HELPERS

  exchangeAdd(tile: Tile): Tile[] {
    this.dms.tilesToExchange.push(tile);
    return this.dms.tilesToExchange;
  }

  exchangeClear(): Tile[] {
    for (let tile of this.dms.tilesToExchange) {
      this.rackAdd(tile);
    }
    this.dms.tilesToExchange.splice(0, this.dms.tilesToExchange.length);
    return this.dms.tilesToExchange;
  }

  ///////////////////////
  // GAME-RELATED HELPERS

  createNewGame(users: User[] = [mockUser1, mockUser2]): Game {
    const players = users.map(user => this.createNewPlayer(user));
    return {
      id: uuid(),
      board: this.createBoard(),
      bag: this.createBag(),
      players: players,
      playHistory: [],
      tilesToExchange: []
    }
  }

  ///////////////////////
  // PLAY-RELATED HELPERS

  placementsAdd(square: Square): Placement[] {
    this.dms.placements.push(square);
    return this.dms.placements;
  }

  placementsRemove(square: Square): Placement[] {
    const placementsIdx = this.dms.placements.indexOf(square);
    this.dms.placements.splice(placementsIdx, 1);
    return this.dms.placements;
  }

  placementsClear(): Placement[] {
    this.dms.placements.splice(0, this.dms.placements.length);
    return this.dms.placements;
  }

  exchangeTile(): boolean {
    if (!this.dms.selectedTile) { return false; }
    if (this.dms.rack.includes(this.dms.selectedTile)) {
      if (this.dms.placements.length > 0) { this.playClear(); }
      this.dms.tilesToExchange.push(this.dms.selectedTile);
      this.rackRemove(this.dms.selectedTile);
      return true;
    } else {
      console.log('Problem with exchangeTile! ', this.dms.rack, this.dms.selectedTile);
      return false;
    }
  }

  playNext() {
    this.dms.play = {
      playNumber: this.dms.currentTurn - 1,
      player: this.dms.currentPlayer.user,
      startRack: _clone(this.dms.currentPlayer.rack),
      placements: [],
      score: 0
    };
  }

  /////////////////////////
  // PLAYER-RELATED HELPERS

  createNewPlayer(user: User): Player {
    return {
      user: user,
      rack: [],
      score: 0
    }
  }

  rackSwap(tile1: Tile, tile2: Tile, rack: Rack = this.dms.rack): Rack {
    const tile1Idx = rack.indexOf(tile1);
    const tile2Idx = rack.indexOf(tile2);
    rack[tile1Idx] = tile2;
    rack[tile2Idx] = tile1;
    return rack;
  }

  rackRemove(tile: Tile, rack: Rack = this.dms.rack): Rack {
    const tileIndex = rack.findIndex(el => el.id === tile.id);
    rack.splice(tileIndex, 1);
    return rack;
  }

  rackAdd(tile: Tile, rack: Rack = this.dms.rack): Rack {
    rack.push(tile);
    return rack;
  }

  rackFill(rack: Rack = this.dms.rack): Rack {
    while (rack.length < 7 && this.dms.bag.length > 0) {
      this.rackAdd(this.takeTile(), rack);
    }
    return rack;
  }

  shuffle() {
    const isAPlayer = this.dms.players.find(player => (
      player.user.id === this.dms.user.id
    ));
    // Make sure user is a player in the current game
    if (!isAPlayer) { return; }
    const rack = isAPlayer.rack;
    let i = 0;
    let j = 0;
    let temp = null;
    for (i = rack.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = rack[i];
      rack[i] = rack[j];
      rack[j] = temp;
    }
  }

  //////////////////////
  // BAG-RELATED HELPERS

  takeTile() {
    const randomIdx = Math.floor(Math.random() * this.dms.bag.length);
    return this.dms.bag.splice(randomIdx, 1)[0];
  }

  returnTile(tile) {
    this.dms.bag.push(tile);
    return this.dms.bag;
  }

  createBag() {
    const newBag = [];
    tileTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const tile: Tile = {
          letter: type.letter,
          points: type.points,
          id: `tile-${type.letter}-${i}`
        };
        newBag.push(tile);
      }
    });
    return newBag;
  }

  ////////////////////////
  // BOARD-RELATED HELPERS

  placeTile(tile, row, col) {
    this.dms.squares[row][col].tile = tile;
    return true;
  }

  removeTile(tile, row, col) {
    this.dms.squares[row][col].tile = null;
    return true;
  }

  createBoard() {
    return Array(15).fill(null).map((wholeRow, row) => {
      return Array(15).fill(null).map((sqInRow, col) => {
        return { row, col, bonus: this.dms.getBonus(row, col), tile: null };
      });
    });
  }

  display() {
    const disp = this.dms.squares.map(row => {
      return row.map(sq => sq.tile ? `[${sq.tile.letter}]` : '[ ]').join(' ');
    })
    console.log('\nCurrent board:\n');
    console.log(disp.join('\n\n'));
  }

  ///////////////////////////
  // GAMEPLAY-RELATED HELPERS

  toggleFooter(): void {
    this.dms.isFooterFixed = !this.dms.isFooterFixed;
  }

  selectTile(event, tile: Tile): boolean {
    event.stopPropagation();
    // Only let the current player select tiles
    if (this.dms.user.id !== this.dms.currentPlayer.user.id) {
      return false;
    }
    if (!this.dms.selectedTile) {
      this.dms.selectedTile = tile;
    } else if (this.dms.selectedTile.id === tile.id) {
      this.dms.selectedTile = null;
    } else if (this.dms.rack.includes(tile) && this.dms.rack.includes(this.dms.selectedTile)) {
      this.rackSwap(tile, this.dms.selectedTile);
      this.dms.selectedTile = null;
    }
    return true;
  }

  selectSquareOrRack(target?: Square) {
    const selected = this.dms.selectedTile;
    if (this.dms.user.id !== this.dms.currentPlayer.user.id) { return false; }
    if (!selected) { return; }
    const tileIsOnBoard = this.dms.placements.map(p => p.tile).includes(selected);
    const tileIsOnRack = this.dms.rack.includes(selected);
    if (tileIsOnRack && target && target.row !== undefined) {
      const success = this.placeTile(selected, target.row, target.col);
      if (!success) { return; } // maybe square was occupied?
      this.dms.placements.push(target);
      this.exchangeClear();
      this.rackRemove(selected);
    }
    if (tileIsOnBoard) {
      const oldSq = this.dms.placements.filter(p => p.tile && p.tile.id === selected.id)[0];
      if (target && target.row !== undefined) { // if user clicked a different square
        const success = this.placeTile(selected, target.row, target.col);
        if (!success) { return; } // maybe square was occupied?
        this.removeTile(selected, oldSq.row, oldSq.col);
        this.placementsRemove(oldSq);
        this.placementsAdd(target);
        this.exchangeClear();
      } else { // if user clicked on the rack, not on a square
        this.placementsRemove(oldSq);
        this.removeTile(selected, oldSq.row, oldSq.col);
        this.rackAdd(selected);
      }
    }
    this.dms.selectedTile = null;
  }

  dragStarted(e, tile: Tile): void {
    this.dms.selectedTile = tile;
    this.dms.dragging = true;
  }

  dropOnRack(event: CdkDragDrop<any>, targetSquare?: Square) {
    this.dms.dragging = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dms.rack, event.previousIndex, event.currentIndex);
    } else {
      this.selectSquareOrRack(targetSquare);
    }
  }

  dropOnSquare(event: CdkDragDrop<any>, targetSquare?: Square) {
    this.dms.dragging = false;
    if (targetSquare.tile) { return; }
    if (event.previousContainer === event.container) {
    } else {
      this.selectSquareOrRack(targetSquare);
    }
  }

  playClear() {
    this.dms.placements.forEach(square => {
      this.rackAdd(square.tile);
      this.removeTile(square.tile, square.row, square.col);
    });
    this.exchangeClear();
    this.placementsClear();
  }

  submitPlay() {
    if (this.dms.tilesToExchange.length > 0 && this.dms.placements.length > 0) {
      // this shouldn't happen, so reset the play!
      // console.log('Error: Tiles were both placed on board and selected to exchange');
      return this.playClear();
    }
    if (this.dms.tilesToExchange.length > 0) {
      // the player is trying to exchange tiles
      this.rackFill();
      this.dms.tilesToExchange.forEach(tile => this.returnTile(tile));
      console.log(`${this.dms.currentPlayer.user.name}'s play: 0 points (tile exchange)`);
      this.exchangeClear();
      this.dms.playHistory.push(this.dms.play);
      // now currentPlayer has changed!  ???
      this.ajaxService.saveUpdatedGame();
    }
    if (this.dms.placements.length > 0 && this.playValidationService.isValid(this.dms.play)) {
      // the player is trying to make a play
      this.rackFill();
      this.dms.play.score = this.playValidationService.getScore(this.dms.play);
      this.dms.currentPlayer.score += this.dms.play.score;
      const plainWords = this.playValidationService.getPlainWords(this.dms.play).join(', ');
      console.log(`${this.dms.currentPlayer.user.name}'s play: ${this.dms.play.score} for ${plainWords}`);
      this.dms.playHistory.push(_clone(this.dms.play));
      // now currentPlayer has changed! ???
      this.ajaxService.saveUpdatedGame()
        .then(() => this.playNext())
        .catch(err => console.log('playSubmit error: ', err));
      // now currentPlayer has changed!
      this.dms.gameOver ? this.handleGameOver() : this.playNext();
    }
  }

  handleGameOver() {
    console.log('Game over!');
    this.dms.players.forEach(player => {
      const pointsLeft = player.rack.reduce((a, t) => a + t.points, 0);
      player.score -= pointsLeft;
      this.dms.currentPlayer.score += pointsLeft;
    })
    console.log(
      `Scores:\n ${this.dms.players.reduce((acc, player) => {
        return acc + player.user.name + ': ' + player.score + '\n';
      }, '')}`
    );
  }

}
