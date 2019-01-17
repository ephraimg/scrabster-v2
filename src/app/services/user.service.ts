
import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { mockUser1 } from '../../mock-data';

@Injectable({ providedIn: 'root' })
export class UserService {
  
    user: User;

  constructor() {
    this.user = mockUser1;
  }

  getUser() {
    return this.user;
  }

}
