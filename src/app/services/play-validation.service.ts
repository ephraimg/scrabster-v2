import { Injectable } from '@angular/core';

import { DataModelService } from './data-model.service';
import {
  Play,
  Square,
} from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayValidationService {

  constructor(
    private dms: DataModelService
  ) { }

  // Forget what this is for...
  getPlaySquares(play: Play) {
    const compare = (sq1, sq2) => {
      if (sq1.row === sq2.row) { return sq1.col - sq2.col; }
      return sq1.row - sq2.row;
    }
    return Array.from(play.placements).sort(compare);
  }

  isValid(play: Play) {
    // if 1st play, check if word crosses center
    if (play.playNumber === 0 && !this.crossesCenter(play)) {
      // console.log('Invalid play: First play must cross the center');
      return false;
    } // check if word played is in a straight line
    if (!this.formsLine(play)) {
      // console.log('Invalid play: Play must be in a straight line');
      return false;
    } // check if word played is contiguous (if > 1 long)
    if (!this.isContiguous(play)) {
      // console.log('Invalid play: Play must be contiguous');
      return false;
    } // check if word connects to other words (if 1st play)
    const orient = this.wordOrientation(play);
    if (play.playNumber > 0 && !this.isConnected(play, orient)) {
      // console.log('Invalid play: Play must be attached');
      return false;
    } // otherwise, all good!
    return true;
  }

  isRowAligned(play: Play) {
    const squares = this.getPlaySquares(play);
    for (let i = 1; i < squares.length; i++) {
      if (squares[i].row !== squares[i - 1].row) { return false; }
    }
    return true;
  }

  isColAligned(play: Play) {
    const playSquares = this.getPlaySquares(play);
    for (let i = 1; i < playSquares.length; i++) {
      if (playSquares[i].col !== playSquares[i - 1].col) { return false; }
    }
    return true;
  }

  formsLine(play: Play) {
    return this.isRowAligned(play) || this.isColAligned(play);
  }

  crossesCenter(play: Play) {
    return play.placements.some(square => (
      square.row === 7 && square.col === 7
    ));
  }

  isContiguous(play: Play) {
    const sqs = this.getPlaySquares(play);
    if (sqs.length === 1) { return true; }
    if (this.isRowAligned(play)) {
      const row = sqs[0].row;
      for (let col = sqs[0].col; col < sqs[sqs.length - 1].col; col++) {
        if (!this.dms.getSquare(row, col).tile) { return false; }
      }
    } else if (this.isColAligned(play)) {
      const col = sqs[0].col;
      for (let row = sqs[0].row; row < sqs[sqs.length - 1].row; row++) {
        if (!this.dms.getSquare(row, col).tile) { return false; }
      }
    }
    return true;
  }

  wordOrientation(play: Play) {
    if (play.placements.length === 0) { return null; }
    // get all unique rows and columns of the placements
    const rows = new Set(play.placements.map(p => p.row));
    const cols = new Set(play.placements.map(p => p.col));
    if (rows.size > 1) { return 'vertical'; }
    if (cols.size > 1) { return 'horizontal'; }
    if (rows.size < 2 && cols.size < 2) { return 'single'; }
  };

  getAllInRow(square: Square) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (this.dms.getSquare(row, ++col) && this.dms.getSquare(row, col).tile) {
      squares.push(this.dms.getSquare(row, col));
    }
    col = square.col;
    while (this.dms.getSquare(row, --col) && this.dms.getSquare(row, col).tile) {
      squares.unshift(this.dms.getSquare(row, col));
    }
    return squares;
  };

  getAllInCol(square: Square) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (this.dms.getSquare(++row, col) && this.dms.getSquare(row, col).tile) {
      squares.push(this.dms.getSquare(row, col));
    }
    row = square.row;
    while (this.dms.getSquare(--row, col) && this.dms.getSquare(row, col).tile) {
      squares.unshift(this.dms.getSquare(row, col));
    }
    return squares;
  };

  getAdjWords(play: Play, inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(play);
    const words = [];
    if (orient === 'vertical' || orient === 'single') {
      play.placements.forEach(plc => {
        words.push(this.getAllInRow(plc));
      });
    }
    if (orient === 'horizontal' || orient === 'single') {
      play.placements.forEach(plc => {
        words.push(this.getAllInCol(plc));
      });
    }
    return words.filter(w => w.length > 1);
  };

  isConnected(play: Play, inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(play);
    const adjWords = this.getAdjWords(play, orient);
    if (adjWords.length > 0) { return true; }
    if (orient === 'vertical') {
      let sqs = this.getPlaySquares(play);
      let lastSq = sqs[sqs.length - 1];
      if (sqs[0].row > 0 && this.dms.getSquare(sqs[0].row - 1, sqs[0].col).tile) {
        return true;
      }
      if (lastSq.row < 14 && this.dms.getSquare(lastSq.row + 1, lastSq.col).tile) {
        return true;
      }
      for (let row = sqs[0].row; row < lastSq.row; row++) {
        const sq = this.dms.getSquare(row, lastSq.col);
        if (sq.tile && !play.placements.includes(sq)) {
          return true;
        }
      }
    } else if (orient === 'horizontal') {
      let sqs = this.getPlaySquares(play);
      let lastSq = sqs[sqs.length - 1];
      if (sqs[0].col > 0 && this.dms.getSquare(sqs[0].row, sqs[0].col - 1).tile) {
        return true;
      }
      if (lastSq.col < 14 && this.dms.getSquare(lastSq.row, lastSq.col + 1).tile) {
        return true;
      }
      for (let col = sqs[0].col; col < lastSq.col; col++) {
        const sq = this.dms.getSquare(lastSq.row, col);
        if (sq.tile && !play.placements.includes(sq)) {
          return true;
        }
      }
    } else if (orient === 'single') {
      let sq = play.placements[0];
      if (sq.row > 0 && this.dms.getSquare(sq.row - 1, sq.col).tile) { return true; }
      if (sq.row < 14 && this.dms.getSquare(sq.row + 1, sq.col).tile) { return true; }
      if (sq.col > 0 && this.dms.getSquare(sq.row, sq.col - 1).tile) { return true; }
      if (sq.col < 14 && this.dms.getSquare(sq.row, sq.col + 1).tile) { return true; }
    }
    return false;
  }

  getMainWord(play: Play, inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(play);
    if (orient === 'vertical') {
      return this.getAllInCol(play.placements[0]);
    } else if (orient === 'horizontal') {
      return this.getAllInRow(play.placements[0]);
    } else if (orient === 'single') {
      return [play.placements[0]];
    } else {
      throw Error("Orientation cannot be computed");
    }
  };

  getAllWords(play: Play, inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(play);
    const mainWord = this.getMainWord(play, orient);
    if (!mainWord || !mainWord.length) { return []; }
    // console.log('Main word: ', '"' + mainWord.map(sq => sq.tile.letter).join('') + '"');
    const adjWords = this.getAdjWords(play, orient);
    return mainWord.length < 2 && play.playNumber > 0 ? adjWords : [mainWord, ...adjWords];
  };

  getPlainWords(play: Play, inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(play);
    return this.getAllWords(play, orient).map(w => {
      return w.map(sq => sq.tile.letter).join('');
    });
  }

  getScore(play: Play): number {
    const wordsPlayed = this.getAllWords(play);
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
}
