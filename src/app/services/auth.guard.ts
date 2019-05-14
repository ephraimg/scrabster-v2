
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public dataService: DataService,
    public router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) { return true; }
    const userId = window.localStorage.getItem('scrabster-id');
    if (!this.auth.isAuthenticated() && userId) {
      return this.dataService.fetchUser(userId)
        .then(() => true)
        .catch(err => {
          console.log('LoggedInGuard error: ', err);
          this.router.navigate(['login']);
          return false;
        });
    }
    this.router.navigate(['login']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public dataService: DataService,
    public router: Router
  ) { }
  canActivate(): Promise<boolean> | boolean {
    if (this.auth.isAdmin()) { return true; }
    const userId = window.localStorage.getItem('scrabster-id');
    if (!this.auth.isAdmin() && userId) {
      return this.dataService.fetchUser(userId)
        .then(() => true)
        .catch(err => {
          console.log('AdminGuard error: ', err);
          this.router.navigate(['login']);
          return false;  
        });
    }
    this.router.navigate(['login']);
    return false;
  }
}
