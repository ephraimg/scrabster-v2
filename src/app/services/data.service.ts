import { Injectable } from '@angular/core';
import axios from 'axios';

import { Bag, Board, Player, Play, Game, User, ExtractedGoogleUser } from 'src/interfaces/interfaces';
import { emptyUser } from '../../mock-data';

@Injectable({
    providedIn: 'root'
})
export class DataService {

  private currentUser: User; // = emptyUser;
  private currentGame: Game;
  private users: User[] = [];
  private games: Game[] = [];
  loading = false;

  constructor() {}

  fetchGame(id: string): Promise<any> {
    this.loading = true;
    return axios.get(`/games?id=${id}`)
      .then(({ data }) => {
        // console.log('game from server: ', data[0]);
        this.currentGame = data[0];
        return data[0];
      })
      .catch(err => { console.log('game fetching error: ', err); })
      .finally(() => { this.loading = false; });
  }

  saveNewGame(game: Game = this.currentGame) {
    this.loading = true;
    return axios.post('/games', game)
      .catch(err => { console.log('saveNewGame - error: ', err); })
      .finally(() => { this.loading = false; });
  }

  saveUpdatedGame(game: Game = this.currentGame) {
    this.loading = true;
    return axios.put('/games', game)
      .catch(err => { console.log('saveUpdatedGame - error: ', err); })
      .finally(() => { this.loading = false; });
  }

  fetchUser(id: string): Promise<any> {
    this.loading = true;
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
      .finally(() => { this.loading = false; });
  }

  createUser(extractedGoogleUser: ExtractedGoogleUser): Promise<any> {
    this.loading = true;
    // Ensure saved user has all user fields
    const completeUser = Object.assign(emptyUser, extractedGoogleUser);
    return axios.post('/users', completeUser)
      .then(({ data }) => {
        // console.log('createUser - created user. Returning data: ', data);
        return data;
      })
      .catch(err => { console.log('createUser - error: ', err); })
      .finally(() => { this.loading = false; });
  }

  activateUser(userId: string): Promise<any> {
    this.loading = true;
    return axios.put('/users', { id: userId, memberStatus: 'ACTIVE' })
      .then(({ data }) => {
        console.log('activateUser - data: ', data);
        return data;
      })
      .catch(err => { console.log('user update error: ', err); })
      .finally(() => { this.loading = false; });
  }

  rejectUser(userId: string): Promise<any> {
    this.loading = true;
    return axios.put('/users', { id: userId, memberStatus: 'REJECTED' })
      .then(({ data }) => {
        // console.log('rejectUser - data: ', data);
        return data;
      })
      .catch(err => { console.log('user update error: ', err); })
      .finally(() => { this.loading = false; });
  }

  fetchAllGames(): Promise<any> {
    this.loading = true;
    return axios.get('/games')
      .then(({ data }) => {
        // console.log('games from server: ', data);
        this.games = data;
        return data;
      })
      .catch(err => { console.log('games fetching error: ', err); })
      .finally(() => { this.loading = false; });
  }

  fetchAllUsers(): Promise<any> {
    this.loading = true;
    return axios.get('/users')
      .then(({ data }) => {
        // console.log('users from server: ', data);
        this.users = data;
        return data;
      })
      .catch(err => { console.log('user fetching error: ', err); })
      .finally(() => { this.loading = false; });
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
        this.currentUser = user;
        return Promise.resolve(user);
      })
      .catch(err => { console.log('fetchOrCreateUser - error: ', err); })
      .finally(() => { this.loading = false; });
  }

  setNewGame(game: Game) {
    this.currentGame = game;
  }

  get game(): Game {
    return this.currentGame;
  }

  get allGames(): Game[] {
    return this.games;
  }

  get bag(): Bag {
    return this.currentGame.bag;
  }

  set bag(bagToSave: Bag) {
    this.currentGame.bag = bagToSave;
  }

  get board(): Board {
    return this.currentGame ? this.currentGame.board : [[]];
  }

  set board(boardToSave: Board) {
    this.currentGame.board = boardToSave;
  }

  get players(): Player[] {
    return this.currentGame ? this.currentGame.players : [];
  }

  get playHistory(): Play[] {
    return this.currentGame ? this.currentGame.playHistory : [];
  }

  get user(): User {
    return this.currentUser;
  }

  set user(user) {
    this.currentUser = user;
  }

  get allUsers(): User[] {
    return this.users;
  }

}
