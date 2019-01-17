import { Injectable } from '@angular/core';
import { BonusService } from './bonus.service';
import { Board, Square } from '../interfaces/interfaces';
import { mockBoard } from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private squares: Square[][];

  constructor(private bonusService: BonusService) {
    this.squares = mockBoard.squares;
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
    const sqArr = Array(15).fill(null).map((wholeRow, row) => {
        return Array(15).fill(null).map((sqInRow, col) => {
            return { row, col, bonus: this.bonusService.getBonus(row, col), tile: null };
        });
    });
    return { squares: sqArr }
  }

  display() {
      const disp = this.squares.map(row => {
          return row.map(sq => sq.tile ? `[${sq.tile.letter}]` : '[ ]').join(' ');
      })
      console.log('\nCurrent board:\n');
      console.log(disp.join('\n\n'));
  }

}
