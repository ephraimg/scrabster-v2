import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private userApprovals;

  constructor(
    public ajaxService: AjaxService,
    public dms: DataModelService,
  ) { }

  ngOnInit() {
    this.ajaxService.fetchAllUsers()
      .then(users => {
        this.dms.users = users;
      });
    this.userApprovals = {};
  }

  activateUser(userId) {
    this.ajaxService.activateUser(userId)
      .then(result => {
        if (result.ok = 1) { this.userApprovals[userId] = 'ACTIVE'; }
      });
  }

  rejectUser(userId) {
    this.ajaxService.rejectUser(userId)
      .then(result => {
        if (result.ok = 1) { this.userApprovals[userId] = 'REJECTED'; }
      });;
  }

  getStatus(userId) {
    if (this.userApprovals[userId]) { return this.userApprovals[userId]; }
    return null;
  }

}
