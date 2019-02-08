
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import TileModule from 'src/app/components/tile/tile.module';
import HeaderModule from '../header/header.module';
import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { TrianglesComponent } from './triangles/triangles.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    SquareComponent,
    TrianglesComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    HeaderModule,
    TileModule,
  ],
  providers: [],
})
export default class GameModule { }