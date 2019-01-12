import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoTiles = [
    { letter: 'S', points: 1 }, 
    { letter: 'C', points: 3 },
    { letter: 'R', points: 1 }, 
    { letter: 'A', points: 1 },
    { letter: 'B', points: 3 }, 
    { letter: 'S', points: 1 },
    { letter: 'T', points: 1 }, 
    { letter: 'E', points: 1 },
    { letter: 'R', points: 1 }  
  ];

  rotations = [];

  randomTurn = () => {
    return Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
  };

  randomRotation = () => ({
    transform: 'rotate(' + this.randomTurn() + 'turn)',
    msTransform: 'rotate(' + this.randomTurn() + 'turn)',
    WebkitTransform: 'rotate(' + this.randomTurn() + 'turn)'
  });

  constructor() {
    this.logoTiles.forEach(tile => {
      this.rotations.push(this.randomRotation());
    })
  }

  ngOnInit() {
  }

}
