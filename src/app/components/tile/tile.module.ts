
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import LetterComponent from './letter/letter.component';
import PointsComponent from './points/points.component';
import TileComponent from './tile.component';

@NgModule({
  declarations: [
    LetterComponent,
    PointsComponent,
    TileComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TileComponent,
  ],
  providers: [],
})
export default class TileModule { }