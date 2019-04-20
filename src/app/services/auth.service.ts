
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ExtractedGoogleUser } from '../../interfaces/interfaces';

declare const gapi: any;

@Injectable({ providedIn: 'root' })
export class AuthService {

    readonly clientId = '49734647833-v72mrldilf6fhvhfg42atmo1lgnblu87.apps.googleusercontent.com';
    private auth2: any;
    user: any;

    constructor(private dataService: DataService) {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: this.clientId,
                scope: 'profile'
            }).then((auth2) => {
                this.auth2 = auth2;
            });
        });
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    googleSignIn(): Promise<any> {
        if (this.auth2.isSignedIn.get()) {
            this.user = this.extractUser(this.auth2.currentUser.get());
            return Promise.resolve(this.user);
        }

        return new Promise((resolve, reject) => {
            this.auth2.isSignedIn.listen(signedIn => {
                if (signedIn) {
                    this.user = this.extractUser(this.auth2.currentUser.get());
                    resolve(this.user);
                } else {
                    reject('sign-in error');
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
        this.user = null;
        // localStorage.removeItem('user');
        this.auth2.isSignedIn.listen(null);
        this.auth2.signOut();
    }

    public isAuthenticated(): boolean {
        // console.log(this.user);
        return !!this.user;
    }

  public isAdmin(): boolean {
    return this.dataService.user.memberStatus === 'ADMIN';
  }

}
