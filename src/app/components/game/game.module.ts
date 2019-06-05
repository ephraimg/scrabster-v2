
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { TileModule } from 'src/app/components/tile/tile.module';
import { HeaderModule } from '../header/header.module';
import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { TrianglesComponent } from './triangles/triangles.component';
import { FooterComponent } from './footer/footer.component';

import { GameRoutingModule } from './game-routing.module';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent,
    SquareComponent,
    TrianglesComponent,
    FooterComponent,
    LeftSidenavComponent,
    RightSidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderModule,
    TileModule,
    GameRoutingModule,
  ],
  providers: [],
})
export class GameModule { }