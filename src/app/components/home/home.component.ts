import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { DataService } from '../../services/data.service';
import { User, Game } from '../../interfaces/interfaces';
import { mockUser1, mockUser2, mockUser3, mockGame } from '../../../mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games: Game[];
  opponents: User[];

  constructor(
    private dataService: DataService,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.games = [mockGame];
    this.opponents = [mockUser1, mockUser2, mockUser3];
  }

  startNewGame(players: User[]) {
    const newGame: Game = this.gameService.create(players);
    this.dataService.setNewGame(newGame);
  }

}
