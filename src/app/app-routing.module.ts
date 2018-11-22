
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth-gaurd.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
