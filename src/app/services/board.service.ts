import { Injectable } from '@angular/core';
import { BonusService } from './bonus.service';
import { Board, Square } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private squares: Square[][];

  constructor(bonusService: BonusService) {
    this.squares = Array(15).fill(null).map((wholeRow, row) => {
        return Array(15).fill(null).map((sqInRow, col) => {
            return { row, col, bonus: bonusService.getBonus(row, col), tile: null };
        });
    });
  }

  getSquare(row, col) {
      if (!this.squares[row]) { return undefined; }
      return this.squares[row][col];
  }

  placeTile(tile, row, col) {
      this.squares[row][col].tile = tile;
  }

  removeTile(tile, row, col) {
      this.squares[row][col].tile = null;
  }

  display() {
      const disp = this.squares.map(row => {
          return row.map(sq => sq.tile ? `[${sq.tile.letter}]` : '[ ]').join(' ');
      })
      console.log('\nCurrent board:\n');
      console.log(disp.join('\n\n'));
  }

}
