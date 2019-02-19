import { Injectable } from '@angular/core';
import axios from 'axios';

import { Game, User } from 'src/interfaces/interfaces';
import { mockGame, mockUser1, mockUser2, mockUser3 } from '../../mock-data';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private currentUser: User;
    private currentGame: Game;
    private users: User[];
    private games: Game[];
    loading;

    constructor() {}

    fetchGame(id?: string) {
        this.loading = true;
        const that = this;
        // setTimeout(() => {
            that.currentGame = mockGame;
            that.loading = false;
        // }, 100);
    }

    fetchUser(id?: string) {
        this.loading = true;
        const that = this;
        // setTimeout(() => {
            that.currentUser = mockUser1;
            that.loading = false;
        // }, 100);
    }

    fetchAllGames(id?: string) {
        axios.get('/games').then(({ data }) => {
            console.log('games from server: ', data);
            this.games = data;
        });
    }

    fetchAllUsers(id?: string) {
        axios.get('/users').then(({ data }) => {
            console.log('users from server: ', data);
            this.users = data;
        });
    }

    setNewGame(game: Game) {
        this.currentGame = game;
    }

    get game() {
        return this.currentGame;
    }

    get allGames() {
        return this.games;
    }

    get bag() {
        return this.currentGame.bag;
    }

    set bag(bagToSave) {
        this.currentGame.bag = bagToSave;
    }

    get board() {
        return this.currentGame.board;
    }

    set board(boardToSave) {
        this.currentGame.board = boardToSave;
    }

    get players() {
        return this.currentGame.players;
    }

    get playHistory() {
        return this.currentGame.playHistory;
    }

    get user() {
        return this.currentUser;
    }

    get allUsers() {
        return this.users;
    }

}
