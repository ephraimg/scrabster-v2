import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../../services/ajax.service';
import { AuthService } from '../../services/auth.service';
import { User, Game } from 'src/interfaces/interfaces';
import { DataMutationsService } from 'src/app/services/data-mutations.service';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('headerwrapper') headerWrapper: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setLogoScale(event.target.innerWidth);
  }

  selectedGameId: string;
  selectedOpponent: User;

  constructor(
    public ajaxService: AjaxService,
    private mut: DataMutationsService,
    public dms: DataModelService,
    public authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.ajaxService.fetchAllGames()
      .then(games => {
        this.dms.games = games;
      });
    this.ajaxService.fetchAllUsers()
      .then(users => {
        this.dms.users = users;
      });
  }

  ngOnInit() {
    this.setLogoScale(window.innerWidth);
  }

  setLogoScale(windowWidth) {
    // For wider window, logo looks good at 1.3 scale
    let scale = windowWidth > 599 ? 1.3 : windowWidth / 350;
    if (scale > 1.3) { scale = 1.3; }
    this.renderer.setStyle(
      this.headerWrapper.nativeElement,
      'transform',
      `scale(${scale})`
    );
  }

  get opponents() {
    return this.dms.users
      .filter(user => !['PENDING', 'REJECTED'].includes(user.memberStatus));
  }

  handleNewGameClick() {
    const users = [this.dms.user, this.selectedOpponent];
    if (!this.selectedOpponent) { return; }
    this.dms.loading = true;
    const newGame: Game = this.mut.createNewGame(users);
    this.dms.game = newGame;
    this.dms.players.forEach(player => {
      this.mut.rackFill(player.rack);
    });
    this.ajaxService.saveNewGame(newGame)
      .then(() => {
        this.dms.loading = false;
        this.router.navigate(['/game', newGame.id]);
      });
  }

  handleResumeGameClick() {
    if (!this.selectedGameId) { return; }
    this.router.navigate(['/game', this.selectedGameId]);
  }

  getDateGameCreated(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  }

}
