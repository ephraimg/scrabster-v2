import { Component, Input, HostBinding, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Tile } from 'src/interfaces/interfaces';
import { DataModelService } from 'src/app/services/data-model.service';
import { DataMutationsService } from 'src/app/services/data-mutations.service';

@Component({
  selector: 'app-tile',
  styleUrls: ['./tile.component.scss'],
  template: `
      <div [ngClass]="'tile-text'">
        <span>{{tile.letter !== '_' ? tile.letter : ''}}</span>
        <span [ngClass]="'tile-points'">{{tile.points > 0 ? tile.points : ''}}</span>
      </div>
    `
})
export class TileComponent implements OnInit {

  @Input() inLogo: boolean = false;
  @Input() tile: Tile;

  rotation: number;

  constructor(
    private dms: DataModelService,
    private mut: DataMutationsService,
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
    return this.dms.selectedTile && this.dms.selectedTile.id === this.tile.id;
  }

  @HostListener('click', ['$event'])
  handleClick(event) {
    this.mut.selectTile(event, this.tile);
  }

}
