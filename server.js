let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let fs = require("fs");
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

let matrix = [];
function generator(n, gr, grEat, gazanik, mard, jur, dzuk) {
    for (let x = 0; x < n; x++) {
        matrix[x] = [];
        for (let y = 0; y < n; y++) {
            matrix[x][y] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < gazanik; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < mard; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < jur; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < dzuk; i++) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
}
generator(60, 30, 40, 60, 20, 30, 40);

io.sockets.emit('send matrix', matrix);

let grassArr = [];
let grassEaterArr = [];
let gazanikArr = [];
let mardArr = [];
let jurArr = [];
let dzukArr = [];

let Grass = require("./Grass");
let GrassEater = require("./GrassEater");
let Gazanik = require("./Gazanik");
let Mard = require("./Mard");
let Jur = require("./Jur");
let Dzuk = require("./Dzuk");

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[x].length; x++) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[x][y] == 2) {
                let grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat);
            }
            else if (matrix[x][y] == 3) {
                let gazanik = new Gazanik(x, y);
                gazanikArr.push(gazanik);
            }
            else if (matrix[x][y] == 4) {
                let mard = new Mard(x, y);
                mardArr.push(mard);
            }
            else if (matrix[x][y] == 5) {
                let jur = new Jur(x, y);
                jurArr.push(jur);
            }
            else if (matrix[x][y] == 6) {
                let dzuk = new Dzuk(x, y);
                dzukArr.push(dzuk);
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (const i in grassArr) {
        grassArr[i].mul();
    }
    for (const i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (const i in gazanikArr) {
        gazanikArr[i].mul();
    }
    for (const i in mardArr) {
        mardArr[i].mul();
    }
    for (const i in jurArr) {
        jurArr[i].mul();
    }
    for (const i in dzukArr) {
        dzukArr[i].mul();
        dzukArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000);

io.on('connection', function (socket) {
    createObject(matrix);
})

function kill() {
    grassArr = [];
    grassEaterArr = [];
    gazanikArr = [];
    mardArr = [];
    jurArr = [];
    dzukArr = [];
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[y].length; y++) {
            matrix[x][y] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

// function addGrass() {
//     for (var i = 0; i < 7; i++) {
//     var x = Math.floor(Math.random() * matrix[0].length)
//     var y = Math.floor(Math.random() * matrix.length)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 1
//             var gr = new Grass(x, y, 1)
//             grassArr.push(gr)
//         }
//     }
//     io.sockets.emit("send matrix", matrix);
// }

// function addGrassEater() {
//     for (var i = 0; i < 7; i++) {   
//     var x = Math.floor(Math.random() * matrix[0].length)
//     var y = Math.floor(Math.random() * matrix.length)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 2
//             grassEaterArr.push(new GrassEater(x, y, 2))
//         }
//     }
//     io.sockets.emit("send matrix", matrix);
// }