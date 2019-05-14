import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    public dataService: DataService,
  ) { }

  signIn(): void {
    this.dataService.loading = true;
    const scrabsterId = window.localStorage.getItem('scrabster-id');
    if (scrabsterId) {
      this.handleLoggedInUser(scrabsterId);
    } else {
      this.handleLoggedOutUser();
    }
  }

  handleLoggedInUser(scrabsterId) {
    return this.dataService.fetchUser(scrabsterId)
      .then(scrabsterUser => {
        this.redirectUser(scrabsterUser);
      }).catch(error => {
        console.log('handleLoggedInUser error: ', error);
      });    
  }

  handleLoggedOutUser() {
    return this.authService.googleSignIn()
      .then(extractedGoogleUser => {
        window.localStorage.setItem('scrabster-id', extractedGoogleUser.id);
        return this.dataService.fetchOrCreateUser(extractedGoogleUser);
      }).then(scrabsterUser => {
        this.redirectUser(scrabsterUser);
      }).catch(error => {
        console.log('handleLoggedOutUser error: ', error);
      });
  }

  redirectUser(scrabsterUser): void {
    this.dataService.loading = false;
    if (scrabsterUser.memberStatus === 'PENDING') {
      this.router.navigate(['/waiting-room']);
    } else if (['ACTIVE', 'ADMIN'].includes(scrabsterUser.memberStatus)) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
