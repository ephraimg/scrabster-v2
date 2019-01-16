import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'scrabster-v2';
  
  constructor(private dataService: DataService) {};

  ngOnInit() {
    this.dataService.fetchUser();
    this.dataService.fetchGame();
  }

}
