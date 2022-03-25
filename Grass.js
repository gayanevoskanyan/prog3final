let LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {          //indexy 1
    mul() {
      this.multiply++;
      let emptyCell = this.chooseCell(0);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell && this.multiply >= 8) {
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 1;
        let gr = new Grass(newX, newY);
        grassArr.push(gr);
        this.multiply = 0;
      }
    }
  }