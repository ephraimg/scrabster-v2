import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { User, Game } from 'src/interfaces/interfaces';

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
    public dataService: DataService,
    private authService: AuthService,
    private gameService: GameService,
    private router: Router,
    private renderer: Renderer2
  ) {
      this.dataService.fetchAllGames();
      this.dataService.fetchAllUsers();
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

  get games() {
      return this.dataService.allGames;
  }

  get opponents() {
      return this.dataService.allUsers
        .filter(user => !['PENDING', 'REJECTED'].includes(user.memberStatus));
  }

  handleNewGameClick() {
    const users = [this.dataService.user, this.selectedOpponent];
    if (!this.selectedOpponent) { return; }
    this.dataService.loading = true;
    const newGame: Game = this.gameService.createNewGame(users);
    this.dataService.setNewGame(newGame);
    this.gameService.players.forEach(player => {
      this.gameService.rackFill(player.rack);
    });
    this.dataService.saveNewGame(newGame)
      .then(() => {
        this.dataService.loading = false;
        this.router.navigate(['/game', newGame.id]);
      });
  }

  handleResumeGameClick() {
      if (!this.selectedGameId) { return; }
      this.router.navigate(['/game', this.selectedGameId]);
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  getDateGameCreated(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  }

}
