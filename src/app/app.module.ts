import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import TileComponent from './components/tile/tile.component';
import GameModule from './components/game/game.module';
import TileModule from './components/tile/tile.module';
import HeaderModule from './components/header/header.module';
import { RulesComponent } from './components/rules/rules.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { AdminComponent } from './components/admin/admin.component';
import SpinnerModule from './components/spinner/spinner.module';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RulesComponent,
    StatisticsComponent,
    WaitingRoomComponent,
    AdminComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    HeaderModule,
    GameModule,
    TileModule,
    SpinnerModule,
    AppRoutingModule,
  ],
  exports: [
    TileComponent,
    SpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
