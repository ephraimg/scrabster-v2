
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AjaxService } from './ajax.service';
import { DataModelService } from './data-model.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public ajaxService: AjaxService,
    public dms: DataModelService,
    public router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (this.auth.isAuthenticated) { return true; }
    const userId = window.localStorage.getItem('scrabster-id');
    if (!userId) {
      this.router.navigate(['login'], {
        queryParams: { destination: state.url }
      });
      return false;
    }
    return this.ajaxService.fetchUser(userId)
      .then(user => {
        this.dms.user = user;
        return true;
      })
      .catch(err => {
        console.log('LoggedInGuard error: ', err);
        this.router.navigate(['login']);
        return false;
      });
  }
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public ajaxService: AjaxService,
    public dms: DataModelService,
    public router: Router
  ) { }
  canActivate(): Promise<boolean> | boolean {
    if (this.auth.isAdmin) { return true; }
    const userId = window.localStorage.getItem('scrabster-id');
    if (!userId) {
      this.router.navigate(['login']);
      return false;
    }
    return this.ajaxService.fetchUser(userId)
      .then(scrabsterUser => {
        this.dms.user = scrabsterUser;
        return true;
      })
      .catch(err => {
        console.log('AdminGuard error: ', err);
        this.router.navigate(['login']);
        return false;  
      });
  }
}
