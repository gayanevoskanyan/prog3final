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

matrix = [];

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
io.sockets.emit('send matrix', matrix);

grassArr = [];
grassEaterArr = [];
gazanikArr = [];
mardArr = [];
jurArr = [];
dzukArr = [];

let Grass = require("./Grass");
let GrassEater = require("./GrassEater");
let Gazanik = require("./Gazanik");
let Mard = require("./Mard");
let Jur = require("./Jur");
let Dzuk = require("./Dzuk");


function createObject() {
    for (var y = 0; y < matrix[0].length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
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
setInterval(game, 100);

function kill() {
    grassArr = [];
    grassEaterArr = [];
    gazanikArr = [];
    mardArr = [];
    jurArr = [];
    dzukArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y, 1));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y, 2));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGazanik() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            gazanikArr.push(new Gazanik(x, y, 3));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addMard() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            mardArr.push(new Mard(x, y, 3));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addJur() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            jurArr.push(new Jur(x, y, 4));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addDzuk() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            dzukArr.push(new Dzuk(x, y, 5));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
  generator(60, 30, 40, 60, 20, 30, 40);
    createObject();
    socket.on("Kill", kill);
    socket.on("Add Grass", addGrass);
    socket.on("Add Grass Eater", addGrassEater);
    socket.on("Add Gazanik", addGazanik);
    socket.on("Add Mard", addMard);
    socket.on("Add Jur", addJur);
    socket.on("Add Dzuk", addDzuk);
})

let statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.gazanik = gazanikArr.length;
    statistics.mard = mardArr.length;
    statistics.jur = jurArr.length;
    statistics.dzuk = dzukArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send");
    })
},1000)

// function weather() {
//     if (weath == "winter") {
//         weath = "spring";
//     } else if (weath == "spring") {
//         weath = "summer";
//     } else if (weath == "summer") {
//         weath = "autumn";
//     } else if (weath == "autumn") {
//         weath = "winter";
//     }
//     io.sockets.emit('weather', weath);
// }
// setInterval(weather, 5000);
