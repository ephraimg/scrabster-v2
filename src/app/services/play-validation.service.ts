import { Injectable } from '@angular/core';

import { DataModelService } from './data-model.service';
import {
  Play,
  Square,
  Placement,
  Board,
} from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayValidationService {

  constructor(
    private dms: DataModelService
  ) { }

  getSquare(board: Board, row: number, col: number) {
    if (!board[row]) { return undefined; }
    return board[row][col];
  }

  // Forget what this is for...
  getSortedPlacements(play: Play) {
    const compare = (sq1, sq2) => {
      if (sq1.row === sq2.row) { return sq1.col - sq2.col; }
      return sq1.row - sq2.row;
    }
    return Array.from(play.placements).sort(compare);
  }

  crossesCenter(sqs: Placement[]) {
    return sqs.some(square => (
      square.row === 7 && square.col === 7
    ));
  }

  isRowAligned(sqs: Placement[]) {
    for (let i = 1; i < sqs.length; i++) {
      if (sqs[i].row !== sqs[i - 1].row) { return false; }
    }
    return true;
  }

  isColAligned(sqs: Placement[]) {
    for (let i = 1; i < sqs.length; i++) {
      if (sqs[i].col !== sqs[i - 1].col) { return false; }
    }
    return true;
  }

  formsLine(sqs: Placement[]) {
    return this.isRowAligned(sqs) || this.isColAligned(sqs);
  }

  isContiguous(board: Board, sqs: Placement[]) {
    if (sqs.length === 1) { return true; }
    if (this.isRowAligned(sqs)) {
      const row = sqs[0].row;
      for (let col = sqs[0].col; col < sqs[sqs.length - 1].col; col++) {
        if (!this.getSquare(board, row, col).tile) { return false; }
      }
    } else if (this.isColAligned(sqs)) {
      const col = sqs[0].col;
      for (let row = sqs[0].row; row < sqs[sqs.length - 1].row; row++) {
        if (!this.getSquare(board, row, col).tile) { return false; }
      }
    }
    return true;
  }

  wordOrientation(sqs: Placement[]) {
    if (sqs.length === 0) { return null; }
    // get all unique rows and columns of the placements
    const rows = new Set(sqs.map(p => p.row));
    const cols = new Set(sqs.map(p => p.col));
    if (rows.size > 1) { return 'vertical'; }
    if (cols.size > 1) { return 'horizontal'; }
    if (rows.size < 2 && cols.size < 2) { return 'single'; }
  };

  getAllInRow(board: Board, square: Square) {
    // Start with the input square, then we'll look in each direction
    const squares = [square];
    const row = square.row;
    let col = square.col;
    // Get all occupied squares adjacent to input square on the right
    while (this.getSquare(board, row, ++col) && this.getSquare(board, row, col).tile) {
      squares.push(this.getSquare(board, row, col));
    }
    // Get all occupied squares adjacent to input square on the left
    col = square.col;
    while (this.getSquare(board, row, --col) && this.getSquare(board, row, col).tile) {
      squares.unshift(this.getSquare(board, row, col));
    }
    return squares;
  };

  getAllInCol(board: Board, square: Square) {
    // Start with the input square, then we'll look in each direction
    const squares = [square];
    let row = square.row;
    const col = square.col;
    // Get all occupied squares adjacent to input square below
    while (this.getSquare(board, ++row, col) && this.getSquare(board, row, col).tile) {
      squares.push(this.getSquare(board, row, col));
    }
    // Get all occupied squares adjacent to input square above
    row = square.row;
    while (this.getSquare(board, --row, col) && this.getSquare(board, row, col).tile) {
      squares.unshift(this.getSquare(board, row, col));
    }
    return squares;
  };

  getMainWord(board: Board, sqs: Placement[], inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(sqs);
    if (orient === 'vertical') {
      return this.getAllInCol(board, sqs[0]);
    } else if (orient === 'horizontal') {
      return this.getAllInRow(board, sqs[0]);
    } else if (orient === 'single') {
      return [sqs[0]];
    } else {
      throw Error('getMainWord error: orientation was not computed');
    }
  };

  getAdjWords(board: Board, sqs: Placement[], inputOrient?: string) {
    const orient = inputOrient ? inputOrient : this.wordOrientation(sqs);
    const words = [];
    if (orient === 'vertical' || orient === 'single') {
      sqs.forEach(plc => words.push(this.getAllInRow(board, plc)));
    }
    if (orient === 'horizontal' || orient === 'single') {
      sqs.forEach(plc => words.push(this.getAllInCol(board, plc)));
    }
    return words.filter(w => w.length > 1);
  };

  getAllWords(board: Board, play: Play, inputOrient?: string) {
    const sqs = play.placements;
    const orient = inputOrient ? inputOrient : this.wordOrientation(sqs);
    const mainWord = this.getMainWord(board, sqs, orient);
    if (!mainWord || !mainWord.length) { return []; }
    // console.log('Main word: ', '"' + mainWord.map(sq => sq.tile.letter).join('') + '"');
    const adjWords = this.getAdjWords(board, sqs, orient);
    return mainWord.length < 2 && play.playNumber > 0 ? adjWords : [mainWord, ...adjWords];
  };

  getPlainWords(board: Board, play: Play, inputOrient?: string) {
    const sqs = play.placements;
    const orient = inputOrient ? inputOrient : this.wordOrientation(sqs);
    return this.getAllWords(board, play, orient).map(w => {
      return w.map(sq => sq.tile.letter).join('');
    });
  }

  isConnected(board: Board, play: Play, sortedPlacements?: Placement[], inputOrient?: string) {
    const sqs = sortedPlacements ? sortedPlacements : this.getSortedPlacements(play);
    const orient = inputOrient ? inputOrient : this.wordOrientation(sqs);
    const adjWords = this.getAdjWords(board, sqs, orient);
    if (adjWords.length > 0) { return true; }
    if (orient === 'vertical') {
      let lastSq = sqs[sqs.length - 1];
      // If there's a tile on the sq below the bottom square of play, it's connected
      if (lastSq.row < 14 && this.getSquare(board, lastSq.row + 1, lastSq.col).tile) {
        return true;
      }
      // If there's a tile on the sq above the top square of play, it's connected
      if (sqs[0].row > 0 && this.getSquare(board, sqs[0].row - 1, sqs[0].col).tile) {
        return true;
      }
      // ??? TODO: test this
      for (let testRow = sqs[0].row; testRow < lastSq.row; testRow++) {
        const sq = this.getSquare(board, testRow, lastSq.col);
        if (sq.tile && !sqs.includes(sq)) {
          return true;
        }
      }
    } else if (orient === 'horizontal') {
      let lastSq = sqs[sqs.length - 1];
      // If there's a tile on the sq left of the first square of play, it's connected
      if (sqs[0].col > 0 && this.getSquare(board, sqs[0].row, sqs[0].col - 1).tile) {
        return true;
      }
      // If there's a tile on the sq right of the last square of play, it's connected
      if (lastSq.col < 14 && this.getSquare(board, lastSq.row, lastSq.col + 1).tile) {
        return true;
      }
      // ??? TODO: test this
      for (let testCol = sqs[0].col; testCol < lastSq.col; testCol++) {
        const sq = this.getSquare(board, lastSq.row, testCol);
        if (sq.tile && !sqs.includes(sq)) {
          return true;
        }
      }
    } else if (orient === 'single') {
      let sq = sqs[0];
      if (sq.row > 0 && this.getSquare(board, sq.row - 1, sq.col).tile) { return true; }
      if (sq.row < 14 && this.getSquare(board, sq.row + 1, sq.col).tile) { return true; }
      if (sq.col > 0 && this.getSquare(board, sq.row, sq.col - 1).tile) { return true; }
      if (sq.col < 14 && this.getSquare(board, sq.row, sq.col + 1).tile) { return true; }
    }
    return false;
  }

  isValid(board: Board = this.dms.board, play: Play = this.dms.play) {
    const sqs = this.getSortedPlacements(play);
    const orient = this.wordOrientation(sqs);
    // if 1st play, check if word crosses center
    if (play.playNumber === 0 && !this.crossesCenter(sqs)) {
      // console.log('Invalid play: First play must cross the center');
      return false;
    } // check if word played is in a straight line
    if (!this.formsLine(sqs)) {
      // console.log('Invalid play: Play must be in a straight line');
      return false;
    } // check if word played is contiguous (if > 1 long)
    if (!this.isContiguous(board, sqs)) {
      // console.log('Invalid play: Play must be contiguous');
      return false;
    } // check if word connects to other words (if 1st play)
    if (play.playNumber > 0 && !this.isConnected(board, play, sqs, orient)) {
      // console.log('Invalid play: Play must be attached');
      return false;
    } // otherwise, all good!
    return true;
  }

  getScore(board: Board = this.dms.board, play: Play = this.dms.play, inputOrient?: string): number {
    const orient = inputOrient ? inputOrient : this.wordOrientation(this.getSortedPlacements(play));
    const wordsPlayed = this.getAllWords(board, play, orient);
    let sum = 0;
    wordsPlayed.forEach(word => {
      // We'll multiply score if there's a word bonus under any tile in the word
      let wordMultiplier = 1;
      word.forEach(sq => {
        // Get points for the tile, and then we'll multiply if there's a letter bonus
        let points = sq.tile.points;
        if (play.placements.includes(sq)) {
          // Only count bonuss if they're under this turn's placements
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
