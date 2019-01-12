import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import TileComponent from './components/tile/tile.component';
import GameModule from './components/game/game.module';
import TileModule from './components/tile/tile.module';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    TileModule,
    GameModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    // MatButtonModule,
    // MatCheckboxModule
  ],
  exports: [
    TileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
