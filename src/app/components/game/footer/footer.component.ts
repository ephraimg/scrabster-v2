import { Component } from '@angular/core';
import { PlayValidationService } from '../../../services/play-validation.service';
import { DataModelService } from '../../../services/data-model.service';
import { DataMutationsService } from '../../../services/data-mutations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private playValidationService: PlayValidationService,
    public dms: DataModelService,
    public mut: DataMutationsService,
  ) { }

  get isButtonDisabled() {
    return !this.dms.isCurrentPlayerUser || this.dms.gameOver;
  }

  get isSubmitDisabled() {
    if (!this.dms.isCurrentPlayerUser || this.dms.gameOver) {
      return true;
    }
    if (this.dms.tilesToExchange.length > 0) {
      return false;
    }
    if (this.dms.placements.length > 0 &&
      this.playValidationService.isValid(this.dms.play)
    ) {
      return false;
    }
    return true;
  }

  get pendingScore() {
    if (this.dms.placements.length < 1) {
      return 'Waiting...';
    }
    if (this.dms.tilesToExchange.length > 0) {
      return '0 (exchanging tiles)';
    }
    if (this.playValidationService.isValid(this.dms.play)) {
      return this.playValidationService.getScore(this.dms.play);
    }
    return 'Play not valid!';
  }

  get isUserWinner(): boolean {
    return this.dms.user.id === this.dms.winner.user.id;
  }

}
