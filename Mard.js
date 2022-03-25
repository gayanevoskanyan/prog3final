let LivingCreature = require("./LivingCreature");
module.exports = class Mard extends LivingCreature {         //indexy 4
    constructor(x, y) {
      super(x, y);
      this.energy = 9;
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
      let emptyCell0 = this.chooseCell(0);
      let emptyCell1 = this.chooseCell(1);
      let arr = [...emptyCell0, ...emptyCell1]
      let newCell = arr[Math.floor(Math.random() * arr.length)];
      if (newCell && this.energy >= 0) { 
        this.energy--; 
        let newX = newCell[0];
        let newY = newCell[1];
        if(matrix[newX][newY] = 0) {
          matrix[newX][newY] = 4;
          matrix[this.x][this.y] = 0;
        } else if(matrix[newX][newY] = 1) {
            matrix[newX][newY] = 4;
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
        matrix[newX][newY] = 4;
        let mard = new Mard(newX, newY);
        mardArr.push(mard);
        this.energy -= 4;
        } else {
          this.eat();
          }
    }
    eat() {
      let emptyCell0 = this.chooseCell(2);
      let emptyCell1 = this.chooseCell(3);
      let arr = [...emptyCell0, ...emptyCell1];
      let newCell = arr[Math.floor(Math.random() * arr.length)];
      if (newCell) {
        this.energy += 2;
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 4;
        matrix[this.x][this.y] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {   //grassEaterina utelu dra hamar ira arr-i vrov enq frum
          if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY ){
            grassEaterArr.splice(i, 1);
          }
        }
        for (let i = 0; i < gazanikArr.length; i++) { //gazanikina el a utelu dra hamar ira vrov el enq frum
          if (gazanikArr[i].x == newX && gazanikArr[i].y == newY ){
            gazanikArr.splice(i, 1);
          }
        }
        this.x = newX;
        this.y = newY;
      } else {
        this.move();
      }
    }
    die() {
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < mardArr.length; i++) {
        if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
          mardArr.splice(i, 1);
        }
      }
    }
  }