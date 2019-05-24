import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AjaxService } from '../../services/ajax.service';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  destination: string = '/home';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public ajaxService: AjaxService,
    public dms: DataModelService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.destination = params['destination']
        ? params['destination']
        : this.destination;
    });
  }

  signIn(): void {
    this.dms.loading = true;
    const scrabsterId = window.localStorage.getItem('scrabster-id');
    if (scrabsterId) {
      this.handleLoggedInUser(scrabsterId);
    } else {
      this.handleLoggedOutUser();
    }
  }

  handleLoggedInUser(scrabsterId) {
    return this.ajaxService.fetchUser(scrabsterId)
      .then(scrabsterUser => {
        this.dms.user = scrabsterUser;
        this.redirectUser(scrabsterUser);
      }).catch(error => {
        console.log('handleLoggedInUser error: ', error);
      });    
  }

  handleLoggedOutUser() {
    return this.authService.googleSignIn()
      .then(extractedGoogleUser => {
        window.localStorage.setItem('scrabster-id', extractedGoogleUser.id);
        return this.ajaxService.fetchOrCreateUser(extractedGoogleUser);
      }).then(scrabsterUser => {
        this.dms.user = scrabsterUser;
        this.redirectUser(scrabsterUser);
      }).catch(error => {
        console.log('handleLoggedOutUser error: ', error);
      });
  }

  redirectUser(scrabsterUser): void {
    this.dms.loading = false;
    if (scrabsterUser.memberStatus === 'PENDING') {
      this.router.navigate(['/waiting-room']);
    } else if (['ACTIVE', 'ADMIN'].includes(scrabsterUser.memberStatus)) {
      this.router.navigate([this.destination]);
    }
  }

}
