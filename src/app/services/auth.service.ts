
import { Injectable } from '@angular/core';
import { ExtractedGoogleUser } from '../../interfaces/interfaces';
import { DataModelService } from './data-model.service';

declare const gapi: any;

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly clientId = '49734647833-v72mrldilf6fhvhfg42atmo1lgnblu87.apps.googleusercontent.com';
  private auth2: any;

  constructor(
    private dms: DataModelService
  ) {
    gapi.load('auth2', () => {
      gapi.auth2.init({ client_id: this.clientId, scope: 'profile' })
        .then((auth2) => { this.auth2 = auth2; });
    });
  }

  googleSignIn(): Promise<any> {
    if (this.auth2.isSignedIn.get()) {
      const user = this.extractUser(this.auth2.currentUser.get());
      return Promise.resolve(user);
    }
    return new Promise((resolve, reject) => {
      this.auth2.isSignedIn.listen(signedIn => {
        if (signedIn) {
          resolve(this.extractUser(this.auth2.currentUser.get()));
        } else {
          reject('Sign-in error');
        }
      });
      this.auth2.signIn();
    });
  }

  private extractUser(googleUser: any): ExtractedGoogleUser {
    const profile = googleUser.getBasicProfile();
    return {
      id: profile.getId(),
      name: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    };
  }

  signOut(): void {
    this.dms.user = null;
    localStorage.removeItem('scrabster-id');
    this.auth2.isSignedIn.listen(null);
    this.auth2.signOut();
  }

  get isAuthenticated(): boolean {
    return !!this.dms.user;
  }

  get isAdmin(): boolean {
    return !this.isAuthenticated && this.dms.user.memberStatus === 'ADMIN';
  }

}
