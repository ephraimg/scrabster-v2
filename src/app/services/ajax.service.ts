import { Injectable } from '@angular/core';
import axios from 'axios';

import { DataModelService } from '../services/data-model.service';
import { Bag, Board, Player, Play, Game, User, ExtractedGoogleUser } from 'src/interfaces/interfaces';
import { emptyUser } from '../../mock-data';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

  constructor(
    private dms: DataModelService,
  ) {}

  fetchGame(id: string): Promise<any> {
    return axios.get(`/games?id=${id}`)
      .then(({ data }) => {
        // console.log('game from server: ', data[0]);
        return data[0];
      })
      .catch(err => { console.log('game fetching error: ', err); })
  }

  saveNewGame(game: Game = this.dms.game) {
    return axios.post('/games', game)
      .catch(err => { console.log('saveNewGame - error: ', err); })
  }

  saveUpdatedGame(game: Game = this.dms.game) {
    return axios.put('/games', game)
      .catch(err => { console.log('saveUpdatedGame - error: ', err); })
  }

  fetchUser(id: string): Promise<any> {
    return axios.get(`/users?id=${id}`)
      .then(({ data }) => {
        if (!data.length) {
          // console.log('fetchUser - no user found on server. Returning []');
          return null;
        }
        // console.log('fetchUser - returning user found on server: ', data[0]);
        return data[0];
      })
      .catch(err => { console.log('fetchUser - user fetching error: ', err); })
  }

  createUser(extractedGoogleUser: ExtractedGoogleUser): Promise<any> {
    // Ensure saved user has all user fields
    const completeUser = Object.assign(emptyUser, extractedGoogleUser);
    return axios.post('/users', completeUser)
      .then(({ data }) => {
        // console.log('createUser - created user. Returning data: ', data);
        return data;
      })
      .catch(err => { console.log('createUser - error: ', err); })
  }

  activateUser(userId: string): Promise<any> {
    return axios.put('/users', { id: userId, memberStatus: 'ACTIVE' })
      .then(({ data }) => {
        console.log('activateUser - data: ', data);
        return data;
      })
      .catch(err => { console.log('user update error: ', err); })
  }

  rejectUser(userId: string): Promise<any> {
    return axios.put('/users', { id: userId, memberStatus: 'REJECTED' })
      .then(({ data }) => {
        // console.log('rejectUser - data: ', data);
        return data;
      })
      .catch(err => { console.log('user update error: ', err); })
  }

  fetchAllGames(): Promise<any> {
    return axios.get('/games')
      .then(({ data }) => {
        // console.log('games from server: ', data);
        return data;
      })
      .catch(err => { console.log('games fetching error: ', err); })
  }

  fetchAllUsers(): Promise<any> {
    return axios.get('/users')
      .then(({ data }) => {
        // console.log('users from server: ', data);
        return data;
      })
      .catch(err => { console.log('user fetching error: ', err); })
  }

  fetchOrCreateUser(extractedGoogleUser: ExtractedGoogleUser): Promise<any> {
    return this.fetchUser(extractedGoogleUser.id)
      .then(data => {
        if (!data) {
          // console.log('fetchOrCreateUser: No user found in db! Will now create user.');
          return this.createUser(extractedGoogleUser);
        }
        // console.log('fetchOrCreateUser: Found user. Returning data: ', data);
        return Promise.resolve(data);
      })
      .then(user => {
        // console.log('fetchOrCreateUser - Returning user:', user);
        return Promise.resolve(user);
      })
      .catch(err => { console.log('fetchOrCreateUser - error: ', err); })
  }

}
