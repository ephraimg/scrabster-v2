import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter',
  styleUrls: ['./letter.component.scss'],
  template: `
    <span [ngClass]="'tile-letter'">
      <ng-content></ng-content>
    </span>
  `,
})
export default class LetterComponent { }
