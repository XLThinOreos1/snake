let x   // snake head
let y      // snake head
let directionX
let directionY
let framerate
let AppleX;
let AppleY;
let tileSize
let Score
let snakeParts
let SnakeLife
let prevDirX
let prevDirY

function numbers() {
    x = 20;       // snake head
    y = 20;       // snake head
    directionX = 1;
    directionY = 0;
    framerate = 10;
    AppleX;
    AppleY;
    tileSize = 20;
    Score = 0;
    snakeParts = [];
    SnakeLife = true;
    prevDirX = 0;
    prevDirY = 0;
}

class part {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

EatSound = function () {
    var audio = new Audio('chomp.wav');
    audio.loop = false;
    audio.play();
}
GameOverSound = function () {
    var audio = new Audio('vine.wav');
    audio.loop = false;
    audio.play();
}

numbers();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "blue";
ctx.fillRect(250, 250, 20, 20);

document.addEventListener('keydown', function (event) {
    if (event.key == "w" && prevDirY != 1) {
        directionY = -1;
        directionX = 0;
    }
    if (event.key == "s" && prevDirY != -1) {
        directionY = 1;
        directionX = 0;
    }
    if (event.key == "a" && prevDirX != 1) {
        directionX = -1;
        directionY = 0;
    }
    if (event.key == "d" && prevDirX != -1) {
        directionX = 1;
        directionY = 0;
    }
    if (event.key == "r" && !SnakeLife) {
        numbers();
        AddApple();
        loop();
    }
    if (event.key == "ArrowUp") {
        framerate += 10;
    }
    if (event.key == "ArrowDown" && framerate >= 11) {
        framerate -= 10;
    }
    if (event.key == "g") {
        Score++;
    }

});

AddApple()
loop()

function loop() {
    if (SnakeLife) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "bisque"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "Black";

        Update()
        prevDirX = directionX;
        prevDirY = directionY;
        Collision()
        DrawApple()
        timeout = setTimeout(loop, 1000 / framerate); // hur snabbt loopen ska köras
    }
}

function Update() {
    snakeParts.push(new part(x, y));
    x += directionX * 20;
    y += directionY * 20;
    ctx.fillRect(x, y, 20, 20);
    ctx.fillStyle = "blue";
    snakeParts.forEach(burger => {
        ctx.fillRect(burger.x, burger.y, 20, 20);
    });
    if (snakeParts.length > Score) {
        snakeParts.shift();
    }
    ctx.fillStyle = "Black";
    ctx.font = "50px Comic Sans MS";
    ctx.fillText("Score: " + Score, 150, 100);
}

function AddApple() {
    AppleX = Math.floor(Math.random() * canvas.width / tileSize);
    AppleY = Math.floor(Math.random() * canvas.height / tileSize);
}

function DrawApple() {
    ctx.fillStyle = "red"
    ctx.fillRect(AppleX * tileSize, AppleY * tileSize, 20, 20)
}

function Collision() {
    if (x == AppleX * tileSize && y == AppleY * tileSize) {
        AddApple();
        EatSound();
        Score++;
    }
    snakeParts.forEach(part => {
        if (x == part.x && y == part.y) {
            gameover();
        }
    });
    if (x > canvas.width - tileSize || y > canvas.width - tileSize || x < 0 || y < 0) {
        gameover();
    }
}

function gameover() {
    SnakeLife = false
    GameOverSound();
    ctx.font = "25px Comic Sans MS";
    ctx.fillText("GAME OVER!", 175, 200);
    ctx.fillText("Press R to restart", 150, 250);
}