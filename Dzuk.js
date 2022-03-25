let LivingCreature = require("./LivingCreature");
module.exports = class Dzuk extends LivingCreature {            //indexy 6
    constructor(x, y) {
      super(x, y);
      this.energy = 8;
    }
    getNewCordinates() {
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1],
      ];
    }
    chooseCell(ch) {
      this.getNewCordinates();
      return super.chooseCell(ch);
      }
    move() {    
      let emptyCells = this.chooseCell(0);
      let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      if (emptyCell && this.energy > 0) {
        this.energy--;
        let newX = emptyCell[0];
        let newY = emptyCell[1];
        matrix[newX][newY] = 6;
        matrix[this.x][this.y] = 0;
        this.x = newX;
        this.y = newY;
      } else if(this.energy <= 0){
        this.die();
      }
    }
    eat() {
      let jurCells = this.chooseCell(5);    //"5" index unecoxina utum
      let jurCell = jurCells[Math.floor(Math.random() * jurCells.length)];
      if (jurCell && this.energy > 0) {
        this.energy++;
        let newX = jurCell[0];
        let newY = jurCell[1];
        matrix[newX][newY] = 6;
        matrix[this.x][this.y] = 0;
        for (let i = 0; i < jurArr.length; i++) {
          if(newX == jurArr[i].x && newY == jurArr[i].y){
            jurArr.splice(i, 1);
          }
        }
        this.x = newX;
        this.y = newY;
      } else {
        this.move();
      }
    }
    mul() {
      let emptyCell = this.chooseCell(0);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell && this.energy >= 9) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 6;
        let dzuk = new Dzuk(newX, newY);
        dzukArr.push(dzuk);
        this.energy = 8;
      }
    }
    die(){
      matrix[this.x][this.y] = 5;
      for (let i = 0; i < dzukArr.length; i++) {
        if(this.x == dzukArr[i].x && this.y == dzukArr[i].y){
          dzukArr.splice(i, 1);
        }
      }
    }
  }