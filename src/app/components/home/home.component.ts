import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  games;
  opponents;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getUser();
    this.games = [
      { id: 1 },
      { id: 2 },
    ];
    this.opponents = [
      { id: 325821 },
      { id: 902525 },
    ];
  }

}
