import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private userApprovals;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchAllUsers();
    this.userApprovals = {};
  }

  activateUser(userId) {
    this.dataService.activateUser(userId)
      .then(result => {
        if (result.ok = 1) { this.userApprovals[userId] = 'ACTIVE'; }
      });
  }

  rejectUser(userId) {
    this.dataService.rejectUser(userId)
      .then(result => {
        if (result.ok = 1) { this.userApprovals[userId] = 'REJECTED'; }
      });;
  }

  getStatus(userId) {
    if (this.userApprovals[userId]) { return this.userApprovals[userId]; }
    return null;
  }

}
