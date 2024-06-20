const Die = require("./die");

// export class Board {
class Board {
    constructor(size = 4) {
        this.size = size;
        this.grid = [];
        this.dice = [
            ['T','E','R','T','Y','L'],
            ['O','U','M','C','T','I'],
            ['D','T','Y','T','I','S'],
            ['S','O','I','S','E','T'],
            ['D','R','Y','V','E','L'],
            ['R','L','I','E','X','D'],
            ['L','N','H','N','Z','R'],
            ['A','W','T','O','O','T'],
            ['G','E','W','N','E','H'],
            ['N','H','I','U','M','Qu'],
            ['O','A','B','B','O','J'],
            ['E','N','U','I','E','S'],
            ['F','P','S','A','F','K'],
            ['R','E','T','W','H','V'],
            ['H','S','P','A','C','O'],
            ['E','E','G','N','A','A'],
        ];
        this.makeGrid();
    }

    makeGrid() {
        for (let i = 0; i < this.size * this.size; i++) {
            const random = Math.floor(Math.random()*this.dice.length);
            let letters = this.dice.splice(random, 1);
            const die = new Die(letters[0]);
            this.grid.push(die.top);
        }
    }
}

module.exports = Board;
