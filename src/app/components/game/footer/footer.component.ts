import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
  }

}
