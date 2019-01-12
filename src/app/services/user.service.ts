
import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor() {}

  user: User;

  getUser() {
    return this.user;
  }

}
