let LivingCreature = require("./LivingCreature");

module.exports = class Jur extends LivingCreature {      //indexy 5
    mul() {  
      this.multiply++; 
      console.log(this.multiply)
      let emptyCell = this.chooseCell(0);
      let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
      if (newCell && this.multiply >= 3) {
        console.log('mul2')
        let newX = newCell[0];
        let newY = newCell[1];
        matrix[newX][newY] = 5;
        let jur = new Jur(newX, newY);
        jurArr.push(jur);
        this.multiply = 0;
      }
    }
  }