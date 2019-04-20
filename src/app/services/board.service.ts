import { Injectable } from '@angular/core';
import { BonusService } from './bonus.service';
import { DataService } from './data.service';
import { Board, Square } from 'src/interfaces/interfaces';
import { mockBoard } from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

    constructor(
        private bonusService: BonusService,
        private dataService: DataService
    ) { }

    get squares() {
        return this.dataService.game
            ? this.dataService.game.board
            : [[]];
    }

    get board() {
        return this.squares;
    }

    getSquare(row, col) {
        if (!this.squares[row]) { return undefined; }
        return this.squares[row][col];
    }

    placeTile(tile, row, col) {
        this.squares[row][col].tile = tile;
        return true;
    }

    removeTile(tile, row, col) {
        this.squares[row][col].tile = null;
        return true;
    }

    create() {
        return Array(15).fill(null).map((wholeRow, row) => {
            return Array(15).fill(null).map((sqInRow, col) => {
                return { row, col, bonus: this.bonusService.getBonus(row, col), tile: null };
            });
        });
    }

    display() {
        const disp = this.squares.map(row => {
            return row.map(sq => sq.tile ? `[${sq.tile.letter}]` : '[ ]').join(' ');
        })
        console.log('\nCurrent board:\n');
        console.log(disp.join('\n\n'));
    }

}
