const grid = document.querySelector(".grid");
const resetBtn = document.getElementById("startRestart");
const scoreBoard = document.getElementById("score");
const highScoreBoard = document.getElementById("highScore");
const upBtn = document.getElementById("up");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const downBtn = document.getElementById("down");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 30;
let appleIndex = 0;
let timer = 750;
let score = 0;
let highScoreArr = [parseInt(localStorage.getItem("PlayerHighscore"))];
let timerID = 0;
const speed = 0.9;
highScoreBoard.textContent = highScoreArr[0];

// creating grid boxes
function createGrid() {
    for (let i = 0; i < 900; i++) {
        const gridBox = document.createElement("div");
        gridBox.classList.add("square");
        grid.appendChild(gridBox);
        squares.push(gridBox);
    }
}
createGrid();

//initilize snake
currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerID);
    highScoreArr.push(score);
    highScoreBoard.textContent = Math.max(...highScoreArr);
    //saving highscore on local storage
    localStorage.setItem("PlayerHighscore", JSON.stringify(Math.max(...highScoreArr)));

    score = 0;
    scoreBoard.textContent = score;
    currentSnake = [2, 1, 0];
    direction = 1;
    timer = 750;
    generateApples();
    //snake movement timer
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    timerID = setInterval(moveSnake, timer);
}

//move snake 
function moveSnake() {

    //check if snake hits wall
    if ((currentSnake[0] + width >= squares.length && direction === width) ||
        ((currentSnake[0] + 1) % width === 0 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')) {
        return clearInterval(timerID);
    }

    //moves snake
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    //snake eating apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add('snake')
        currentSnake.push(tail);
        generateApples();
        score++;
        scoreBoard.textContent = score;
        clearInterval(timerID);
        timer *= speed;
        timerID = setInterval(moveSnake, timer);
    }

    squares[currentSnake[0]].classList.add('snake');
}




//control snake movement
function controlSnake(e) {
    if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 38) {
        direction = -width;
    } else if (e.keyCode === 39) {
        direction = 1;
    } if (e.keyCode === 40) {
        direction = width;
    }
}

//generates apples
function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
}



resetBtn.addEventListener("click", startGame);
document.addEventListener("keyup", controlSnake);
upBtn.addEventListener("click", () => { direction = -width; });
leftBtn.addEventListener("click", () => { direction = -1; });
rightBtn.addEventListener("click", () => { direction = 1; });
downBtn.addEventListener("click", () => { direction = width; });