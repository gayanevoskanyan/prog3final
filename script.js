let socket = io();
let side = 15;

function setup() {
  createCanvas(50 * side + 1,50 * side + 1);
  background("grey");
  // frameRate(1000);
}

function nkar(matrix) {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      let obj = matrix[x][y];
      if (obj == 0) {
        fill("grey");
      } else if (obj == 1) {
        fill("green");
      } else if (obj == 2) {
        fill("yellow");
      } else if (obj == 3) {
        fill(230, 21, 21);
      } else if (obj == 4) {
        fill(140, 235, 52);
      } else if (obj == 5) {
        fill("blue");
      } else if (obj == 6) {
        fill(232, 3, 252);
      }
      rect(y * side, x * side, side, side);
    }
  }
}
socket.on('send matrix', nkar);


function kill() {
  socket.emit("Kill");
}
function addGrass() {
  socket.emit("Add Grass");
}
function addGrassEater() {
  socket.emit("Add GrassEater");
}
function addGazanik() {
  socket.emit("Add Gazanik");
}
function addMard() {
  socket.emit("Add Mard");
}
function addJur() {
  socket.emit("Add Jur");
}
function addDzuk() {
  socket.emit("Add Dzuk");
}
