import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User, Game } from 'src/interfaces/interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(
        private dataService: DataService,
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

    startNewGame(players: User[]) {
        // const newGame: Game = this.gameService.create(players);
        // this.dataService.setNewGame(newGame);
    }

}
