import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

    arrayOf15 = Array(15).fill(null);

    constructor(
        public boardService: BoardService,
        public gameService: GameService
    ) {}

}
