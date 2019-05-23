import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AjaxService } from '../../services/ajax.service';
import { PlayValidationService } from '../../services/play-validation.service';
import { DataModelService } from '../../services/data-model.service';
import { DataMutationsService } from '../../services/data-mutations.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  windowWidth: number;

  constructor(
    private ajaxService: AjaxService,
    private playValidationService: PlayValidationService,
    private dms: DataModelService,
    private mut: DataMutationsService,
    private route: ActivatedRoute,
  ) {
    this.dms.loading = true;
  }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    const id = this.route.snapshot.paramMap.get('id');
    // todo - check if game is already loaded to avoid fetching
    this.ajaxService.fetchGame(id)
      .then(game => {
        this.dms.game = game;
        this.mut.playNext();
        this.dms.loading = false;
      });
  }

  toggleFooter() {
    this.mut.toggleFooter();
  }

  toggleEmailNotifications() {
    console.log('Toggled email notifications');
  }

  get isFooterFixed() {
    return this.dms.isFooterFixed;
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
}
