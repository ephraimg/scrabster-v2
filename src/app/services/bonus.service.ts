import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

    private bonuses;

    constructor() {
        // fill in upper-left quadrant, then we'll copy/flip it
        const ULbonuses = {};
        for (let i = 0; i < 8; i++) { ULbonuses[i] = {}; }
        // triple-word scores
        [0, 7].forEach(n => {
            [0, 7].forEach(m => ULbonuses[n][m] = 'tws');
        });
        // triple-letter scores
        [1, 5].forEach(n => {
            [1, 5].forEach(m => ULbonuses[n][m] = 'tls');
        });
        // double-word scores
        [1, 2, 3, 4, 7].forEach(n => {
            ULbonuses[n][n] = 'dws';
        });
        // double-letter scores
        [[0, 3], [2, 6], [3, 7], [6, 6]].forEach(nm => {
            ULbonuses[nm[0]][nm[1]] = 'dls';
            ULbonuses[nm[1]][nm[0]] = 'dls';
        })
        // copy / flip UL quadrant to complete board
        const allBonuses = Object.assign({}, ULbonuses);
        for (let i = 8; i < 15; i++) { allBonuses[i] = {}; }
        for (let i = 0; i < 8; i++) { 
            for (let j = 0; j < 8; j++) { 
                allBonuses[i][14 - j] = ULbonuses[i][j];
                allBonuses[14 - i][j] = ULbonuses[i][j];
                allBonuses[14 - i][14 - j] = ULbonuses[i][j];        
            }
        }
        // fix the center
        allBonuses[7][7] = 'star';
        this.bonuses = allBonuses;
    }

    getBonus(row, col) {
        return this.bonuses[row][col];
    }

}
