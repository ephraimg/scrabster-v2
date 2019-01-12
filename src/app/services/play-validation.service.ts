import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayValidationService {

  constructor() { }

  isValid(play) {
    // if 1st play, check if word crosses center
    if (play.playNumber === 0 && !this.crossesCenter(play)) {
        console.log('Invalid play: First play must cross the center');
        return false; 
    } // check if word played is in a straight line
    if (!this.formsLine(play)) { 
        console.log('Invalid play: Play must be in a straight line');
        return false; 
    } // check if word played is contiguous (if > 1 long)
    if (!this.isContiguous(play)) { 
        console.log('Invalid play: Play must be contiguous');
        return false; 
    } // check if word connects to other words (if 1st play)
    if (play.playNumber > 0 && !this.isConnected(play)) { 
        console.log('Invalid play: Play must be attached');
        return false;            
    } // otherwise, all good!
    return true;
  }

  isRowAligned(play) {
    const playSquares = play.squares;
    for (let i = 1; i < playSquares.length; i++) {
        if (playSquares[i].row !== playSquares[i - 1].row) { return false; }
    }
    return true;    
  }

  isColAligned(play) {
    const playSquares = play.squares;
    for (let i = 1; i < playSquares.length; i++) {
        if (playSquares[i].col !== playSquares[i - 1].col) { return false; }
    }
    return true;    
  }

  formsLine(play) {
    return this.isRowAligned(play) || this.isColAligned(play);
  } 

  crossesCenter(play) {
    return play.placements.includes(play.board.getSquare(7, 7));
  }

  isContiguous(play) {
    const sqs = play.squares;
    if (sqs.length === 1) { return true; }
    if (this.isRowAligned(play)) {
        const row = sqs[0].row;
        for (let col = sqs[0].col; col < sqs[sqs.length - 1].col; col++) {
            if (!play.board.getSquare(row, col).tile) { return false; }
        }
    } else if (this.isColAligned(play)) {
        const col = sqs[0].col;
        for (let row = sqs[0].row; row < sqs[sqs.length - 1].row; row++) {
            if (!play.board.getSquare(row, col).tile) { return false; }
        }
    }
    return true; 
  }

  getWordOrientation(placements) {
    if (placements.length === 0) { return null; }
    // get all unique rows and columns of the placements
    const rows = new Set(placements.map(p => p.row));
    const cols = new Set(placements.map(p => p.col));
    if (rows.size > 1) { return 'vertical'; }
    if (cols.size > 1) { return 'horizontal'; }
    if (rows.size < 2 && cols.size < 2) { return 'single'; }
  };

  getAllInRow(square, board) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (board.getSquare(row, ++col) && board.getSquare(row, col).tile) {
        squares.push(board.getSquare(row, col));
    }
    col = square.col;
    while (board.getSquare(row, --col) && board.getSquare(row, col).tile) {
        squares.unshift(board.getSquare(row, col));
    }
    return squares;
  };

  getAllInCol(square, board) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (board.getSquare(++row, col) && board.getSquare(row, col).tile) {
        squares.push(board.getSquare(row, col));
    }
    row = square.row;
    while (board.getSquare(--row, col) && board.getSquare(row, col).tile) {
        squares.unshift(board.getSquare(row, col));
    }
    return squares;
  };

  getMainWord(placements, board, orient) {
    if (!orient) { return null; }
    if (orient === 'vertical') {
        return this.getAllInCol(placements[0], board);
    } else if (orient === 'horizontal') {
        return this.getAllInRow(placements[0], board);
    } else if (orient === 'single') {
        return [placements[0]];
    } else {
        throw "Orientation cannot be computed"; 
    }
  };

  getAdjWords(placements, board, orient) {
    const words = [];
    if (orient === 'vertical' || orient === 'single') {
        placements.forEach(p => {
            words.push(this.getAllInRow(p, board));
        });
    }
    if (orient === 'horizontal' || orient === 'single') {
        placements.forEach(p => {
            words.push(this.getAllInCol(p, board));
        });   
    }
    return words.filter(w => w.length > 1);
  };

  isConnected(play) {
    const orient = this.getWordOrientation(play.placements);
    const adjWords = this.getAdjWords(play.placements, play.board, orient);
    if (adjWords.length > 0) { return true; }
    if (orient === 'vertical') {
        let sqs = play.squares;
        let lastSq = sqs[sqs.length - 1];
        if (sqs[0].row > 0 && play.board.getSquare(sqs[0].row - 1, sqs[0].col).tile) {
            return true;
        }
        if (lastSq.row < 14 && play.board.getSquare(lastSq.row + 1, lastSq.col).tile) {
            return true;
        }
        for (let row = sqs[0].row; row < lastSq.row; row++) {
            const sq = play.board.getSquare(row, lastSq.col);
            if (sq.tile && !play.placements.includes(sq)) {
                return true;
            }
        }
    } else if (orient === 'horizontal') {
        let sqs = play.squares;
        let lastSq = sqs[sqs.length - 1];
        if (sqs[0].col > 0 && play.board.getSquare(sqs[0].row, sqs[0].col - 1).tile) {
            return true;
        }
        if (lastSq.col < 14 && play.board.getSquare(lastSq.row, lastSq.col + 1).tile) {
            return true;
        }
        for (let col = sqs[0].col; col < lastSq.col; col++) {
            const sq = play.board.getSquare(lastSq.row, col);
            if (sq.tile && !play.placements.includes(sq)) {
                return true;
            }
        }
    } else if (orient === 'single') {
        let sq = play.placements[0];
        if (sq.row > 0 && play.board.getSquare(sq.row - 1, sq.col).tile) { return true; }
        if (sq.row < 14 && play.board.getSquare(sq.row + 1, sq.col).tile) { return true; }
        if (sq.col > 0 && play.board.getSquare(sq.row, sq.col - 1).tile) { return true; }
        if (sq.col < 14 && play.board.getSquare(sq.row, sq.col + 1).tile) { return true; }
    }
    return false;
  }

  getAllWords(play) {
    const orient = this.getWordOrientation(play.placements);
    const mainWord = this.getMainWord(play.placements, play.board, orient);
    if (!mainWord || !mainWord.length) { return []; }
    // console.log('Main word: ', '"' + mainWord.map(sq => sq.tile.letter).join('') + '"');
    const adjWords = this.getAdjWords(play.placements, play.board, orient);
    return mainWord.length < 2 && play.playNumber > 0 ? adjWords : [mainWord, ...adjWords];
  };

}
