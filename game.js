const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const theme = document.querySelector('.theme');

let count = 0;

let game = document.querySelector('.game');
theme.addEventListener('click', change1);
function change1() {
    console.log('chagne the theme');
    if (count % 4 == 0) {
        document.body.style.backgroundImage = "url(bg.jpg)";
    }
    else if(count%4 == 1){
        document.body.style.backgroundImage = "url(bg2.jpg)";
    }
    else if(count%4 == 2){
        document.body.style.backgroundImage = "url(snow.png)";
    }
    else if(count%4 == 3){
        document.body.style.backgroundImage = "url(dark_city.jpg)";
    }
    count++;
}

// onclicking the (startScreen) the game should get start
startScreen.addEventListener('click', StartGame);
// creating an object for the player
let player = { speed: 5, score: 0 };
let vel = player.speed;

// setting up the movements of the car first
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// now if a user wants to control some actions in the website by pressing some key
document.addEventListener('keydown', keyDown);
function keyDown(e) {
    //whichever key will be pressed make that true for movement
    keys[e.key] = true;
    e.preventDefault();
}

document.addEventListener('keyup', keyUp);
function keyUp(e) {
    // when we release that key we need to make that default again
    keys[e.key] = false;
    e.preventDefault();
}

// gameplay function
function gamePlay() {

    // getting the car element 
    let car = document.querySelector('.car');
    // restriciting the boundary of the road for the car to move
    let road = gameArea.getBoundingClientRect();
    if (player.start == true) {
        // moving lines function
        moveLines();
        // moving enemy cars
        moveEnemy(car);
        // for the movement of the car in +x , -x , +y , -y
        if (keys.ArrowUp && player.y > (road.top + 95)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 120)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 65)) {
            player.x += player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps = player.score - 2;
        score.innerText = "Score :- " + ps;
    }
}

// function for the pause of the game when the collision occurs
function isCollision(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.left > bRect.right) || (aRect.right < bRect.left));
}

// function for ending the game
function endgame() {
    player.start = false;
    // on ending of the game the start screen hit in the main
    startScreen.classList.remove('hide');
    // and on the hitting the main the message print will be different
    startScreen.innerHTML = `GAME OVER !! <br> Your Score is :- ${player.score} 
                            <br> Press here to Restart`
}

// functions for moving the enemy cars
function moveEnemy(car) {
    let Enemy = document.querySelectorAll('.Enemy');
    Enemy.forEach(function (item) {
        // for collision
        if (isCollision(car, item)) {
            console.log('BOOM HIT');
            endgame();
        }
        // if it reaches to 700 then reset the top and it will appeae like they are moving
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

// functions for moving the road lines
function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        // if it reaches to 700 then reset the top and it will appeae like they are moving
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

// startGame function 
function StartGame() {

    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    // creating the road lines
    for (let x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = x * 150;
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    // i want to add the background of cars in after clicking the start screen
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = 'hey this is CAR';
    gameArea.appendChild(car);

    // position of car
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // for the enemy cars 
    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'Enemy');
        enemyCar.y = ((x + 1) * 350) * (-1);
        enemyCar.style.top = enemyCar.y + "px";
        //giving them the random position
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    theme.innerText = 'Change theme';

}