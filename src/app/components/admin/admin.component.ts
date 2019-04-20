import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchAllUsers();
  }

  activateUser(userId) {
    this.dataService.activateUser(userId);
  }

  rejectUser(userId) {
    this.dataService.rejectUser(userId);
  }

}
