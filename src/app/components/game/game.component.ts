import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    windowWidth: number;

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.windowWidth = window.innerWidth;
    }

    toggleFooter() {
        this.gameService.toggleFooter();
    }

    get isFooterFixed() {
        return this.gameService.isFooterFixed;
    }

}
