import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Tile } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  private tileTypes = [
    { letter: '_', points: 0, count: 2 },
    { letter: 'A', points: 1, count: 9 },
    { letter: 'B', points: 3, count: 2 },
    { letter: 'C', points: 3, count: 2 },
    { letter: 'D', points: 2, count: 4 },
    { letter: 'E', points: 1, count: 12 },
    { letter: 'F', points: 4, count: 2 },
    { letter: 'G', points: 2, count: 3 },
    { letter: 'H', points: 4, count: 2 },
    { letter: 'I', points: 1, count: 9 },
    { letter: 'J', points: 8, count: 1 },
    { letter: 'K', points: 5, count: 1 },
    { letter: 'L', points: 1, count: 4 },
    { letter: 'M', points: 3, count: 2 },
    { letter: 'N', points: 1, count: 6 },
    { letter: 'O', points: 1, count: 8 },
    { letter: 'P', points: 3, count: 2 },
    { letter: 'Q', points: 10, count: 1 },
    { letter: 'R', points: 1, count: 6 },
    { letter: 'S', points: 1, count: 4 },
    { letter: 'T', points: 1, count: 6 },
    { letter: 'U', points: 1, count: 4 },
    { letter: 'V', points: 4, count: 2 },
    { letter: 'W', points: 4, count: 2 },
    { letter: 'X', points: 8, count: 1 },
    { letter: 'Y', points: 4, count: 2 },
    { letter: 'Z', points: 10, count: 1 }
  ];

  constructor(private dataService: DataService) {}

  get bag() {
    return this.dataService.bag;
  }

  get count() {
      return this.bag.length;
  }

  takeTile() {
    const randomIdx = Math.floor(Math.random() * this.bag.length);
    return this.bag.splice(randomIdx, 1)[0];
  }

  returnTile(tile) {
      this.bag.push(tile);
      return this.bag;
  }

  create() {
    const newBag = [];
    this.tileTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const tile: Tile = {
          letter: type.letter,
          points: type.points,
          id: `tile-${type.letter}-${i}`
        };
        newBag.push(tile);
      }
    });
    return newBag;
  }

}
