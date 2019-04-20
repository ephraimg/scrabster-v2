import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { User, Game } from 'src/interfaces/interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    selectedGameId: string;
    selectedOpponent: User;

    constructor(
        private dataService: DataService,
      private authService: AuthService,
      private gameService: GameService,
        private router: Router
    ) {
        this.dataService.fetchAllGames();
        this.dataService.fetchAllUsers();
    }

    get games() {
        return this.dataService.allGames;
    }

    get opponents() {
        return this.dataService.allUsers
          .filter(user => !['PENDING', 'REJECTED'].includes(user.memberStatus));
    }

    handleNewGameClick() {
      const users = [this.dataService.user, this.selectedOpponent];
      if (!this.selectedOpponent) { return; }
      const newGame: Game = this.gameService.createNewGame(users);
      this.dataService.setNewGame(newGame);
      this.gameService.rackFill();
      this.dataService.saveNewGame(newGame);
      this.router.navigate(['/game', newGame.id]);
    }

    handleResumeGameClick() {
        if (!this.selectedGameId) { return; }
        this.router.navigate(['/game', this.selectedGameId]);
    }

    get isAdmin() {
      return this.authService.isAdmin();
    }

  getDateGameCreated(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  }

}
