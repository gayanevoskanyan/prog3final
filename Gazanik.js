let LivingCreature = require("./LivingCreature")

module.exports = class Gazanik extends LivingCreature {         //indexy 3
    constructor(x, y) {
      super(x, y);
      this.energy = 12;
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
      let grassCells = this.chooseCell(1);
      let emptyCells = this.chooseCell(0);
      let arr = [...grassCells, ...emptyCells];
      let newCell = arr[Math.floor(Math.random() * arr.length)];
      if (newCell && this.energy >= 0) { 
        this.energy--; 
        let newX = newCell[0];
        let newY = newCell[1];
        if(matrix[newX][newY] = 0) {
          matrix[newX][newY] = 3;
          matrix[this.x][this.y] = 0;
        } else  if(matrix[newX][newY] = 1) {
            matrix[newX][newY] = 3;
            matrix[this.x][this.y] = 1;
          }
          this.x = newX;
          this.y = newY;
        } else if (this.energy < 0) {
            this.die();
          }
    }
    mul() {
      let emptyCell= this.chooseCell(0);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell && this.energy >= 15) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 3;
        let gazanik = new Gazanik(newX, newY);
        gazanikArr.push(gazanik);
        this.energy -= 4;
      } else {
          this.eat();
        }
    }
    eat() {
      let emptyCell = this.chooseCell(2);  //"2" index unecoxina utum
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell) {
        this.energy += 2;
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 3;
        matrix[this.x][this.y] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {    //um utuma dra arr-ov petqa pttvenq
          if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY ){
            grassEaterArr.splice(i, 1);
          }
        }
        this.x = newX;
        this.y = newY;
      } else {
          this.move();
        }
    }
    die() {
      matrix[this.x][this.y] = 0;  //datarka sarqum ira texy
      for (let i = 0; i < gazanikArr.length; i++) {
        if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
          gazanikArr.splice(i, 1);
        }
      }
    }
  }