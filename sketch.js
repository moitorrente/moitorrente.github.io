const sections = 20;
const width = 600;
const height = 690;
const scal = width / sections;
let snake;
let apple;
let lastx = 0;
let lasty = 0;

let foodImg;

let snakeHead = [4]
let snakeBody = [2];
let snakeBodyEat = [2];
let turnImgs = [4];
let turnEatImgs = [4];

let initialHead;

let tailUp;
let tailDown;
let tailRight;
let tailLeft;
let trophy;
let deathImg;
let bodyEatHor;
let bodyEeatVer;
let punctuation = 0;
let maxPunctuation = 0;
let deaths = 0;
p5.disableFriendlyErrors = true;

let buttonUp;


function preload() {
    foodImg = loadImage('./assets/img/food/apple.png');
    initialHead = loadImage('./assets/img/snake/initialHead.png');
    snakeHead[0] = loadImage('./assets/img/snake/headUp.png');
    snakeHead[1] = loadImage('./assets/img/snake/headRight.png');
    snakeHead[2] = loadImage('./assets/img/snake/headDown.png');
    snakeHead[3] = loadImage('./assets/img/snake/headLeft.png');
    snakeBody[0] = loadImage('./assets/img/snake/bodyVer-2.png');
    snakeBody[1] = loadImage('./assets/img/snake/bodyHor-2.png');
    turnImgs[0] = loadImage('./assets/img/snake/turn0-2.png');
    turnImgs[1] = loadImage('./assets/img/snake/turn1-2.png');
    turnImgs[2] = loadImage('./assets/img/snake/turn2-2.png');
    turnImgs[3] = loadImage('./assets/img/snake/turn3-2.png');
    turnEatImgs[0] = loadImage('./assets/img/snake/turnEat0.png');
    turnEatImgs[1] = loadImage('./assets/img/snake/turnEat1.png');
    turnEatImgs[2] = loadImage('./assets/img/snake/turnEat2.png');
    turnEatImgs[3] = loadImage('./assets/img/snake/turnEat3.png');
    snakeBodyEat[0] = loadImage('./assets/img/snake/bodyEatVer.png');
    snakeBodyEat[1] = loadImage('./assets/img/snake/bodyEatHor.png');

    tailUp = loadImage('./assets/img/snake/tailUp.png');
    tailDown = loadImage('./assets/img/snake/tailDown.png');
    tailRight = loadImage('./assets/img/snake/tailRight.png');
    tailLeft = loadImage('./assets/img/snake/tailLeft.png');
    trophy = loadImage('./assets/img/trophy.png');
    deathImg = loadImage('./assets/img/deaths.png');
}

function setup() {
    snake = new Snake();
    apple = new Food();
    canvas = createCanvas(width, height);
    buttonUp = createButton('Up');
    buttonDown = createButton('Down');
    buttonRight = createButton('Right');
    buttonLeft = createButton('Left');


   


    frameRate(10);
    let options = {
        preventDefault: true
    };
    let hammer = new Hammer(document.body, options);
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on("swipe", swiped);
}

function draw() {
    translate(0, 0);
    //scale(1.1);

    background(139, 167, 82);
    drawGrid();
    showPanel();

    if (snake.die()) {
        alert('Has perdido');
        deaths++;
    }
    apple.show();

    snake.update();
    snake.show();
    if (snake.eat(apple)) {
        punctuation++;
        apple.reappear(snake);
    }
}

function drawGrid() {
    stroke(150, 180, 123);
    for (let i = 0; i < sections; i++) {
        line(i * scal, 0, i * scal, height);
        line(0, i * scal, width, i * scal);
    }
}

function keyPressed() {
    if (lastx != snake.x || lasty != snake.y || snake.xdir == 0 && snake.ydir == 0) {
        if (keyCode === RIGHT_ARROW && snake.xdir != -1) {
            snake.setDirection(1, 0);
        }
        if (keyCode === UP_ARROW && snake.ydir != 1) {
            snake.setDirection(0, -1);
        }
        if (keyCode === DOWN_ARROW && snake.ydir != -1) {
            snake.setDirection(0, 1);
        }
        if (keyCode === LEFT_ARROW && snake.xdir != 1) {
            snake.setDirection(-1, 0);
        }
        if (key === 'A') {
            snake.addTail();
        }
        lastx = snake.x;
        lasty = snake.y;
    }
}

function swiped(event) {
    if (lastx != snake.x || lasty != snake.y || snake.xdir == 0 && snake.ydir == 0) {

        if (event.direction == 4 && snake.xdir != -1) {
            snake.setDirection(1, 0);
        } else if (event.direction == 8 && snake.ydir != 1) {
            snake.setDirection(0, -1);
        } else if (event.direction == 16 && snake.ydir != -1) {
            snake.setDirection(0, 1);
        } else if (event.direction == 2 && snake.xdir != 1) {
            snake.setDirection(-1, 0);
        }
        lastx = snake.x;
        lasty = snake.y;
    }
}

function setUpDirection(){
        snake.setDirection(0, -1);

}

function showPanel() {
    fill(62, 76, 34);
    rect(0, height - 3 * scal, width, 3 * scal);
    image(foodImg, width - scal * 19.5, height - scal * 2.5, scal * 2, scal * 2);
    textSize(42);
    fill(255);
    text('x ' + punctuation, width - scal * 17, height - scal)
    if (punctuation > maxPunctuation) {
        maxPunctuation = punctuation;
    }
    image(trophy, width - scal * 13, height - scal * 2.5, scal * 2, scal * 2);
    text('x ' + maxPunctuation, width - scal * 12.5 + 2 * scal, height - scal)

    image(deathImg, width - scal * 6, height - scal * 2.5, scal * 2, scal * 2);
    text('x ' + deaths, width - scal * 5.5 + 2 * scal, height - scal);

}