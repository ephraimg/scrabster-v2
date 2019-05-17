import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { PlayService } from '../../../services/play.service';
import { PlayValidationService } from '../../../services/play-validation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
      private gameService: GameService,
      private playService: PlayService,
      private playValidationService: PlayValidationService
    ) {}

  handleFooterClick() {
    this.gameService.selectSquareOrRack(null);
  }

  exchange(e) {
    this.gameService.exchangeTile();
  }

  shuffle(e) {
    this.gameService.shuffle();
  }

  clear(e) {
    this.gameService.playClear();
  }

  submit(e) {
    this.gameService.submitPlay();
  }

  get isButtonDisabled() {
    return !this.gameService.isCurrentPlayerUser() || this.gameService.gameOver;
  }

  get isSubmitDisabled() {
    if (!this.gameService.isCurrentPlayerUser() || this.gameService.gameOver) {
        return true;
    }
    if (this.playService.tilesToExchange.length > 0) {
        return false;
    }
    if (this.playService.placements.length > 0 && 
        this.playValidationService.isValid(this.gameService.play)
    ) {
        return false;
    }
    return true;
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

  get isUserWinner(): boolean {
    return this.gameService.user.id === this.gameService.winner.user.id;
  }

}
