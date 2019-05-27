
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileModule } from '../tile/tile.module';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    TileModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [],
})
export class HeaderModule { }