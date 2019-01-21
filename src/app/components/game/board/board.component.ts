import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  arrayOf15 = Array(15).fill(null);

  boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

}
