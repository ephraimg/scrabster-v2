
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './services/auth.guard';
import { AdminGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { RulesComponent } from './components/rules/rules.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'waiting-room', component: WaitingRoomComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'rules', component: RulesComponent, canActivate: [LoggedInGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
