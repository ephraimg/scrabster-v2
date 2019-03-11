import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { User, Game } from 'src/interfaces/interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    selectedGameId: string;
    selectedOpponentId: string;

    constructor(
        private dataService: DataService,
        private router: Router
    ) {
        this.dataService.fetchAllGames();
        this.dataService.fetchAllUsers();
    }

    get games() {
        return this.dataService.allGames;
    }

    get opponents() {
        return this.dataService.allUsers;
    }

    handleNewGameClick(players: User[]) {
        if (!this.selectedOpponentId) { return; }
            // const newGame: Game = this.gameService.create(players);
            // this.dataService.setNewGame(newGame);

        // create a new game
        // save new game to db
        // get new game id
        // navigate to /game/:newid


        console.log(this.selectedOpponentId);

    }

    handleResumeGameClick() {
        if (!this.selectedGameId) { return; }
        this.router.navigate(['/game', this.selectedGameId]);
    }

}
