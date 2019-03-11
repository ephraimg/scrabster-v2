import { Injectable } from '@angular/core';
import axios from 'axios';

import { Game, User } from 'src/interfaces/interfaces';
import { mockGame, mockUser1, mockUser2, mockUser3 } from '../../mock-data';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private currentUser: User = mockUser1;
    private currentGame: Game = mockGame;
    private users: User[];
    private games: Game[];
    loading = false;

    constructor() {}

    fetchGame(id: string) {
        this.loading = true;
        axios.get(`/games?id=${id}`)
            .then(({ data }) => {
                console.log('game from server: ', data);
                this.currentGame = data;
                this.loading = false;
            })
            .catch(err => {
                console.log('game fetching error: ', err);
                this.loading = false;
            });
    }

    fetchUser(id: string) {
        this.loading = true;
        axios.get(`/users?id=${id}`)
            .then(({ data }) => {
                console.log('users from server: ', data);
                this.currentUser = data;
                this.loading = false;
            })
            .catch(err =>{
                console.log('user fetching error: ', err);
                this.loading = false;
            });
    }

    fetchAllGames() {
        this.loading = true;
        axios.get('/games')
            .then(({ data }) => {
                console.log('games from server: ', data);
                this.games = data;
                this.loading = false;
            })
            .catch(err => {
                console.log('games fetching error: ', err);
                this.loading = false;
            });
    }

    fetchAllUsers() {
        this.loading = true;
        axios.get('/users')
            .then(({ data }) => {
                console.log('users from server: ', data);
                this.users = data;
                this.loading = false;
            })
            .catch(err => {
                console.log('user fetching error: ', err);
                this.loading = false;
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
