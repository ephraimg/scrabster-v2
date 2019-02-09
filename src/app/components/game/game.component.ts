import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { PlayService } from '../../services/play.service';
import { PlayValidationService } from '../../services/play-validation.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    windowWidth: number;

    constructor(
        private gameService: GameService,
        private playService: PlayService,
        private playValidationService: PlayValidationService,
    ) {}

    ngOnInit() {
        this.windowWidth = window.innerWidth;
    }

    toggleFooter() {
        this.gameService.toggleFooter();
    }

    toggleEmailNotifications() {
        console.log('Toggled email notifications');
    }

    get isFooterFixed() {
        return this.gameService.isFooterFixed;
    }

    get pendingScore() {
        if (this.playService.placements.length < 1) {
            return 'Waiting...';
        }
        if (this.playService.tilesToExchange.length > 0) {
            return '0 (exchanging tiles)';
        }
        if (this.playValidationService.isValid(this.gameService.play)) {
            return this.playService.getScore(this.gameService.play);
        }
        return 'Play not valid!';
    }
}
