import { Component, Input, HostBinding, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Tile } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-tile',
    styleUrls: ['./tile.component.scss'],
    template: `
        <app-letter>{{tile.letter}}</app-letter>
        <app-points>{{tile.points}}</app-points>
    `
})
export default class TileComponent implements OnInit {

    @Input() inLogo: boolean = false;
    @Input() tile: Tile;

    rotation: number;

    constructor(
        private gameService: GameService,
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'noselect');
        if (this.inLogo) {
            const randomRotation = Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
            this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${randomRotation}turn)`)
            this.renderer.addClass(this.el.nativeElement, 'logo-tile');
        }
    }

    @HostBinding('class.selected')
    get selectClass() {
        return this.gameService.selectedTile && this.gameService.selectedTile.id === this.tile.id;
    }

    @HostListener('click', ['$event'])
    handleClick(event) {
        this.gameService.selectTile(event, this.tile);
    }
  
}
