import { Component, Input, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
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

    constructor(
        public gameService: GameService,
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit() {
        this.bonusWords = this.square ? bonusMessages[this.square.bonus] : [];
        this.triangleCount = this.square ? triangleCounts[this.square.bonus] : 0;
        this.bonusClass = this.square ? this.square.bonus : '';
        // star class messes up appearance of tile. TODO: fix that!
        if (this.bonusClass === 'star' && this.square.tile) { this.bonusClass = 'dws'; }
        // add classes to host element
        if (this.bonusClass !== '') { this.renderer.addClass(this.el.nativeElement, this.bonusClass); }
        this.renderer.addClass(this.el.nativeElement, 'noselect');
    }

    @HostListener('click')
    handleClick() {
        this.gameService.selectSquareOrRack(this.square);
    }

    get isDragDisabled() {
        return !this.gameService.placedTiles.includes(this.square.tile);
    }

}
