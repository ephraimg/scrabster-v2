
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private dataService: DataService) {}
  public isAuthenticated(): boolean {
    return this.dataService.user !== null;
  }
}
