import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v1 as uuid } from 'uuid';

import { BoardService } from './board.service';
import { BagService } from './bag.service';
import { PlayService } from './play.service';
import { PlayValidationService } from './play-validation.service';
import { DataService } from './data.service';
import {
  Game,
  Board,
  Bag,
  User,
  Play,
  Tile,
  Player,
  Square,
  Placement
} from 'src/interfaces/interfaces';
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

    selectedTile: Tile;
    isFooterFixed: boolean;
    allDropLists: string[] = ['testid'];
    dragging: boolean = false;

    constructor(
        private boardService: BoardService,
        private bagService: BagService,
        private playService: PlayService,
        private playValidationService: PlayValidationService,
        private dataService: DataService,
    ) {
        this.isFooterFixed = window.innerWidth <= 450
            || this.dataService.user.settings.fixFooter;
        Array(15).fill(null).forEach((row, i) => {
            Array(15).fill(null).forEach((col, j) => {
                this.allDropLists.push(`square-${i}-${j}`);
            })
        });
    }

    get game() {
        return this.dataService.game;
    }
    get play() {
        return this.playService.currentPlay;
    }
    get user() {
        return this.dataService.user;
    }
    get player() {
        return this.playService.currentPlayer;
    }
    get rack() {
        const userPlayer = this.players.find(player => {
            return player.user.id === this.user.id;
        });
        return userPlayer.rack;
    }
    get players() {
        return this.playService.players;
    }
    get placements() {
        return this.playService.placements;
    }
    get placedTiles() {
        return this.placements.map(p => p.tile);
    }
    get tilesToExchange() {
        return this.playService.tilesToExchange;
    }

    isCurrentPlayerUser() {
        return this.player.user.id === this.user.id;
    }

    toggleFooter() {
        this.isFooterFixed = !this.isFooterFixed;
    }

    createNewPlayer(user: User) {
        return {
            user: user,
            rack: [],
            score: 0
        }
    }

    createNewGame(users: User[] = [mockUser1, mockUser2]) {
        const players = users.map(user => this.createNewPlayer(user));
        const newGame: Game = {
          id: uuid(),
          board: this.boardService.create(),
          bag: this.bagService.create(),
          players: players,
          playHistory: [],
          tilesToExchange: []
        }
        return newGame;
    }

    selectTile(event, tile: Tile) {
        event.stopPropagation();
        // Only let the current player select tiles
        if (this.user.id !== this.player.user.id) {
            return false;
        }
        if (!this.selectedTile) {
            this.selectedTile = tile;
        } else if (this.selectedTile.id === tile.id) {
            this.selectedTile = null;
        } else if (this.rack.includes(tile) && this.rack.includes(this.selectedTile)) {
            this.rackSwap(tile, this.selectedTile);
            this.selectedTile = null;
        }
    }

    selectSquareOrRack(target?: Square) {
        const selected = this.selectedTile;

        if (this.user.id !== this.player.user.id) { return false; }
        if (!selected) { return; }
        const tileIsOnBoard = this.placements.map(p => p.tile).includes(selected);
        const tileIsOnRack = this.rack.includes(selected);
        
        if (tileIsOnRack && target && target.row !== undefined) {
            const success = this.boardService.placeTile(selected, target.row, target.col);
            if (!success) { return; } // maybe square was occupied?
            this.placements.push(target);
            this.exchangeClear();
            this.rackRemove(selected);
        }

        if (tileIsOnBoard) {
            const oldSq = this.placements.filter(p => p.tile && p.tile.id === selected.id)[0];
            if (target && target.row !== undefined) { // if user clicked a different square
                const success = this.boardService.placeTile(selected, target.row, target.col);
                if (!success) { return; } // maybe square was occupied?
                this.boardService.removeTile(selected, oldSq.row, oldSq.col);
                this.playService.placementsRemove(oldSq);
                this.playService.placementsAdd(target);
                this.exchangeClear();
            } else { // if user clicked on the rack, not on a square
                this.playService.placementsRemove(oldSq);
                this.boardService.removeTile(selected, oldSq.row, oldSq.col);
                this.rackAdd(selected);
            }
        }
        
        this.selectedTile = null;
    }

    dragStarted(e, tile: Tile) {
        this.selectedTile = tile;
        this.dragging = true;
    }

    dropOnRack(event: CdkDragDrop<any>, targetSquare?: Square) {
        console.log('dropOnRack. dropping...', event.previousContainer.id, 'to ', event.container.id);

        this.dragging = false;
        if (event.previousContainer === event.container) {
            moveItemInArray(this.rack, event.previousIndex, event.currentIndex);
        } else {
            this.selectSquareOrRack(targetSquare);
        }
    }

    dropOnSquare(event: CdkDragDrop<any>, targetSquare?: Square) {
        console.log('dropOnSquare. dropping...', event.previousContainer.id, 'to ', event.container.id);
        
        this.dragging = false;
        if (targetSquare.tile) { return; }
        if (event.previousContainer === event.container) {
        } else {
            this.selectSquareOrRack(targetSquare);
        }
    }

    rackSwap(tile1: Tile, tile2: Tile) {
        const tile1Idx = this.rack.indexOf(tile1);
        const tile2Idx = this.rack.indexOf(tile2);
        this.rack[tile1Idx] = tile2;
        this.rack[tile2Idx] = tile1;
        return this.rack;
    }

    rackRemove(tile: Tile) {
        const tileIndex = this.rack.findIndex(el => el.id === tile.id);
        this.rack.splice(tileIndex, 1);
        return this.rack;
    }

    rackAdd(tile: Tile) {
        this.rack.push(tile);
        return this.rack;
    }

    rackFill() {
        while (this.rackCount < 7 && this.bagService.count > 0) {
            this.rackAdd(this.bagService.takeTile());
        }
        return this.rack;
    }

    playClear() {
        this.placements.forEach(square => {
            this.rackAdd(square.tile);
            this.boardService.removeTile(square.tile, square.row, square.col);
        });
        this.exchangeClear();
        this.playService.placementsClear();
    }

    exchangeClear() {
        for (let tile of this.tilesToExchange) {
            this.rackAdd(tile);
        }
        this.playService.exchangeClear();
    }

    shuffle() {
        const isAPlayer = this.players.find(player => (
            player.user.id === this.user.id
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

    exchangeTile() {
        if (!this.selectedTile) { return; }
        if (this.rack.includes(this.selectedTile)) {
            if (this.placements.length > 0) { this.playClear(); }
            this.tilesToExchange.push(this.selectedTile);
            this.rackRemove(this.selectedTile);
        } else {
            console.log('Problem with exchangeTile! ', this.rack, this.selectedTile);
            return false;
        }
    }

    submitPlay() {
        if (this.tilesToExchange.length > 0 && this.placements.length > 0) {
            // this shouldn't happen, so reset the play!
            console.log('Error: Tiles were both placed on board and selected to exchange');
            return this.playClear();
        }
        if (this.tilesToExchange.length > 0) {
            // the player is trying to exchange tiles
            this.rackFill();
            this.tilesToExchange.forEach(tile => this.bagService.returnTile(tile));
            this.playService.exchangeSubmit();
        }
        if (this.placements.length > 0 && this.playValidationService.isValid(this.play)) {
            // the player is trying to make a play
            this.rackFill();
            this.playService.playSubmit();
            // now currentPlayer has changed!
            this.gameOver ? this.handleGameOver() : this.playService.playNext(); 
        }
    }

    get rackCount() {
        return this.rack.length;
    }

    get playerCount() {
        return this.game.players.length;
    }

    get currentTurn() {
        return this.game.playHistory.length + 1;
    }

    get gameOver() {
        return this.bagService.count < 1 && this.game.players.some(player => (
        player.rack.length < 1 
        ));
    }

    handleGameOver() {
        console.log('Game over!');
        this.game.players.forEach(player => {
        const pointsLeft = player.rack.reduce((a, t) => a + t.points, 0);
        player.score -= pointsLeft;
        this.player.score += pointsLeft;
        })
        console.log(
            `Scores:\n ${this.game.players.reduce((acc, player) => {
            return acc + player.user.name + ': ' + player.score + '\n';
            }, '')}`
        );
    }

}
