import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-triangles',
  template: `
    <div 
      *ngFor="let number of countIterable"
      [ngClass]="['triangle', sideClass, bonusClass]"
    ></div>
  `,
  styleUrls: ['./triangles.component.scss'],
})
export class TrianglesComponent implements OnInit {

  @Input() bonusClass: string = 'dws';
  @Input() side: string = 'l';
  @Input() count: number = 0;

  countIterable: null[] = [];
  sideClass: string = 'tri-l';

  ngOnInit() {
    this.sideClass = `tri-${this.side}`;
    this.countIterable = Array(this.count).fill(null);
  }


}
