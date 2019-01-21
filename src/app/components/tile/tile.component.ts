import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Tile } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export default class TileComponent implements OnInit {

  @Input() inLogo: boolean = false;
  @Input() tile: Tile;

  rotationStyle: { [key: string]: string };
  logoClass: string;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    const randomRotation = Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
    const rotation = this.inLogo ? randomRotation : 0;
    this.rotationStyle = {
      transform: `rotate(${rotation}turn)`,
      msTransform: `rotate(${rotation}turn)`,
      WebkitTransform: `rotate(${rotation}turn)`
    }
    this.logoClass = this.inLogo ? 'logo-tile' : '';
  }

  handleClick($event) {
    this.gameService.selectTile($event, this.tile);
  }

  get selectClass() {
    return this.gameService.selectedTile && this.gameService.selectedTile.id === this.tile.id ? 'selected' : '';
  }
  
}
