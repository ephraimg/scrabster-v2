import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'scrabster-v2';
  
  constructor(private _userService: UserService) {};

  ngOnInit() {
    this._userService.getUser()
  }

}
