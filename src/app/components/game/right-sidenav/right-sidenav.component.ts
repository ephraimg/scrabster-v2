import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataModelService } from 'src/app/services/data-model.service';
import { DataMutationsService } from 'src/app/services/data-mutations.service';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss']
})
export class RightSidenavComponent {

  @Input() sidenav: any;

  constructor(
    public dms: DataModelService,
    private mut: DataMutationsService,
    private ajaxService: AjaxService
  ) { }

  toggleSidenav() {
    this.mut.chatViewsUpdate();
    this.ajaxService.saveUpdatedGame();
    this.sidenav.toggle();
  }

  formatChatTime(inputDate: Date) {
    // Dates are stored in DB as strings
    const jsDate = new Date(inputDate);
    const day = jsDate.getDate();
    const month = jsDate.getMonth();
    const hours = jsDate.getHours();
    const minuteString = `0${jsDate.getMinutes().toString()}`.slice(-2);
    return `${month}/${day}, ${hours}:${minuteString}`;
  }

  formatChatAuthor(userId: string) {
    return this.dms.getPlayerNameFromId(userId);
  }

  onSubmit(chatForm: NgForm) {
    this.mut.chatsAdd(chatForm.value.chatInput);
    this.ajaxService.saveUpdatedGame()
    .then(() => {
      chatForm.reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

}
