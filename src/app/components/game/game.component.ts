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
    public dms: DataModelService,
    public mut: DataMutationsService,
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

  toggleEmailNotifications() {
    const oldValue = this.dms.user.settings.emailNotifications;
    // update the user and the corresponding player of the game
    this.mut.updateUserSettings({
      emailNotifications: !oldValue
    });
    this.ajaxService.saveUpdatedUser(this.dms.user);
    this.ajaxService.saveUpdatedGame(this.dms.game);
  }

  get pendingScore() {
    if (this.dms.placements.length < 1) {
      return 'Waiting...';
    }
    if (this.dms.tilesToExchange.length > 0) {
      return '0 (exchanging tiles)';
    }
    if (this.playValidationService.isValid(this.dms.board, this.dms.play)) {
      return this.playValidationService.getScore(this.dms.board, this.dms.play);
    }
    return 'Play not valid!';
  }

  get badgeVisible() {
    if (!this.dms.chatMessages.length) { return false; }
    // Show badge if there's a message more recent than last view by the user
    const lastMessage = this.dms.chatMessages[this.dms.chatMessages.length - 1];
    const lastMessageDate = new Date(lastMessage.date);
    return !this.dms.userChatView || this.dms.userChatView < lastMessageDate;
  }
}
