import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss']
})
export class RightSidenavComponent implements OnInit {

  @Input() sidenav: any;

  chats = [
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:24:00'),
      viewedBy: ['Henry'],
      message: 'Great play, bro'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T03:28:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Ephraim',
      time: new Date('1995-12-17T23:58:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    },
    {
      author: 'Henry',
      time: new Date('1995-12-17T23:59:00'),
      viewedBy: ['Ephraim'],
      message: 'I\'m gonna kick your butt, fool'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  formatChatTime(jsDate: Date) {
    const day = jsDate.getDate();
    const month = jsDate.getMonth();
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    return `${month}/${day}, ${hours}:${minutes}`;
  }

  onSubmit(chatForm: NgForm) {
    // TODO: save new message to db
    this.chats.push({
      author: 'Whoever',
      time: new Date(),
      viewedBy: ['Ephraim'],
      message: chatForm.value.chatInput
    });
    chatForm.reset();
  }

}
