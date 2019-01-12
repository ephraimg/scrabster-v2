import { Component, Input, OnInit } from '@angular/core';
import { Tile } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export default class TileComponent implements OnInit {

  @Input() inLogo: boolean = false;
  @Input() tile: Tile;
  @Input() selectedTile: Tile;

  rotationStyle: { [key: string]: string };
  selectClass: string;
  logoClass: string;

  constructor() { }

  ngOnInit() {
    console.log(this.tile);
    const randomRotation = Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
    const rotation = this.inLogo ? randomRotation : 0;
    this.rotationStyle = {
      transform: `rotate(${rotation}turn)`,
      msTransform: `rotate(${rotation}turn)`,
      WebkitTransform: `rotate(${rotation}turn)`
    }
    this.selectClass = this.selectedTile && this.selectedTile.id === this.tile.id ? 'selected' : '';
    this.logoClass = this.inLogo ? 'logo-tile' : '';
  }

}
