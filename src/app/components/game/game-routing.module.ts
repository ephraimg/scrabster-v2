import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from '../../services/auth.guard';
import { GameComponent } from './game.component';

const gameRoutes: Routes = [
  { path: 'game/:id', component: GameComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(gameRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class GameRoutingModule { }