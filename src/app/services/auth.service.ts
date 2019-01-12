
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _userService: UserService) {}
  public isAuthenticated(): boolean {
    return this._userService.user !== null;
  }
}
