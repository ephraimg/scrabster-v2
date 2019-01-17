import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Tile, Square } from 'src/app/interfaces/interfaces';

const bonusMessages = {
  'tws': ['TRIPLE', 'WORD', 'SCORE'],
  'dws': ['DOUBLE', 'WORD', 'SCORE'],
  'tls': ['TRIPLE', 'LETTER', 'SCORE'],
  'dls': ['DOUBLE', 'LETTER', 'SCORE'],
  'star': []
};

const triangleCounts = {
  'tws': 3,
  'dws': 2,
  'tls': 3,
  'dls': 2,
  'star': 0
};

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() square: Square;
  @Input() selectedTile: Tile;

  bonusClass: string;
  bonusWords: string[];
  triangleCount: number;

  constructor(public gameService: GameService) {
  }

  ngOnInit() {
    this.bonusClass = (this.square && this.square.bonus) || '';
    this.bonusWords = (this.square && bonusMessages[this.square.bonus]) || [];
    this.triangleCount = (this.square && triangleCounts[this.square.bonus]) || 0;
    if (this.square && (this.square.bonus === 'star')) {
      this.bonusClass = (this.square && this.square.tile) ? 'dws' : 'star';
    }
  }

  handleClick() {
    this.gameService.selectSquareOrRack(this.square);
  }

}
