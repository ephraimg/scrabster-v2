import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { BoardService } from '../services/board.service';
import { PlayValidationService } from '../services/play-validation.service';
import {
    Play,
    Square,
    Tile,
    Board
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

    currentPlay: Play;
    tilesToExchange: Tile[];

    constructor(
        private dataService: DataService,
        private boardService: BoardService,
        private playValidationService: PlayValidationService,
    ) {
        this.playNext();
        this.tilesToExchange = [];
    }

    get playHistory() {
        return this.dataService.playHistory;
    }

    get players() {
        return this.dataService.players;
    }

    get currentPlayer() {
        const turnNumber = this.playHistory.length;
        return this.players[(turnNumber % this.players.length)];
    }

    get currentTurn() {
        return this.playHistory.length + 1;
    }

    get placements() {
        return this.currentPlay.placements;
    }

    getScore(inputPlay?: Play) {
        const play = inputPlay ? inputPlay : this.currentPlay;
        const wordsPlayed = this.playValidationService.getAllWords(play);
        let sum = 0;
        wordsPlayed.forEach(word => {
            let wordMultiplier = 1;
            word.forEach(sq => {
                let points = sq.tile.points;
                if (play.placements.includes(sq)) {
                    if (sq.bonus === 'tls') { points *= 3; }
                    if (sq.bonus === 'dls') { points *= 2; }
                    if (sq.bonus === 'tws') { wordMultiplier *= 3; }
                    if (sq.bonus === 'dws' || sq.bonus === 'star') { wordMultiplier *= 2; }
                }
                sum += points;
            });
            sum *= wordMultiplier;
        })
        if (play.placements.length === 7) { sum += 50; }
        return sum;
    }

    placementsAdd(square: Square) {
        this.placements.push(square);
        return this.placements;
    }

    placementsRemove(square: Square) {
        const placementsIdx = this.placements.indexOf(square);
        this.placements.splice(placementsIdx, 1);
        return this.placements;
    }
    
    placementsClear() {
        this.placements.splice(0, this.placements.length);
        return this.placements;
    }

    exchangeAdd(tile) {
        this.tilesToExchange.push(tile);
        return this.tilesToExchange;
    }

    exchangeClear() {
        this.tilesToExchange.splice(0, this.tilesToExchange.length);
        return this.tilesToExchange;
    }

    exchangeSubmit() {
        console.log(`${this.currentPlayer.user.name}'s play: 0 points (tile exchange)`);
        this.exchangeClear();
        this.playHistory.push(this.currentPlay);
        // now currentPlayer has changed!  ???
        this.playSaveToDB();
    }

    playSubmit() {
        if (this.placements.length > 0 && this.playValidationService.isValid(this.currentPlay)) {
            // the player is trying to make a play
            this.currentPlay.score = this.getScore(this.currentPlay);
            this.currentPlayer.score += this.currentPlay.score;
            const plainWords = this.playValidationService.getPlainWords(this.currentPlay).join(', ');
            console.log(`${this.currentPlayer.user.name}'s play: ${this.currentPlay.score} for ${plainWords}`);
            this.playHistory.push(this.currentPlay);
            this.placementsClear();
            // now currentPlayer has changed! ???
            this.playSaveToDB();
        }
    }

    playNext() {
        const newPlay = {
            playNumber: this.currentTurn,
            player: this.currentPlayer.user,
            startRack: [...this.currentPlayer.rack],
            placements: [],
            score: 0
        };
        this.currentPlay = newPlay;
        return newPlay;
    }

    playSaveToDB() {

    }
}
