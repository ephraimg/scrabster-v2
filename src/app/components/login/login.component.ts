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
    private dataService: DataService,
  ) { }

  signIn(): void {
    this.authService.googleSignIn()
      .then(extractedGoogleUser => {
        return this.dataService.fetchOrCreateUser(extractedGoogleUser);
      }).then(scrabsterUser => {
        // console.log('signIn - user is: ', scrabsterUser);
        if (scrabsterUser.memberStatus === 'PENDING') {
          this.router.navigate(['/waiting-room']);
        } else if (['ACTIVE', 'ADMIN'].includes(scrabsterUser.memberStatus)) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }).catch(error => {
        console.log(error);
      });
  }

}
