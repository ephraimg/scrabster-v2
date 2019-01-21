import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {

    constructor(
        private gameService: GameService
    ) {}

    toggleFooter() {
        this.gameService.toggleFooter();
    }

    get isFooterFixed() {
        return this.gameService.isFooterFixed;
    }

}
