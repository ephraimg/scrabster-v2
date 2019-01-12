import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-points',
  styleUrls: ['./points.component.scss'],
  template: `
    <span [ngClass]="'tile-points'">
      <ng-content></ng-content>
    </span>
  `
})
export default class PointsComponent { }
