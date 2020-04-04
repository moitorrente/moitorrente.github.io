const sections = 20;
const width = 600;
const height = 690;
const scale = width / sections;
let snake;
let apple;

let appleImg;
let snakeHeadUpImg;
let snakeHeadRightImg;
let snakeHeadDowmImg;
let snakeHeadLeftImg;
let snakeBodyVerImg;
let snakeBodyHorImg;
let turn1;
let turn2;
let turn3;
let turn4;
let tailUp;
let tailDown;
let tailRight;
let tailLeft;
let trophy;
let deathImg;
let punctuation = 0;
let maxPunctuation = 0;
let deaths = 0;

function preload() {
    appleImg = loadImage('./assets/img/apple.png');
    snakeHeadUpImg = loadImage('./assets/img/headUp.png');
    snakeHeadRightImg = loadImage('./assets/img/headRight.png');
    snakeHeadDownImg = loadImage('./assets/img/headDown.png');
    snakeHeadLeftImg = loadImage('./assets/img/headLeft.png');
    snakeBodyVerImg = loadImage('./assets/img/bodyVer.png');
    snakeBodyHorImg = loadImage('./assets/img/bodyHor.png');
    turn1 = loadImage('./assets/img/turn1.png');
    turn2 = loadImage('./assets/img/turn2.png');
    turn3 = loadImage('./assets/img/turn3.png');
    turn4 = loadImage('./assets/img/turn4.png');
    tailUp = loadImage('./assets/img/tailUp.png');
    tailDown = loadImage('./assets/img/tailDown.png');
    tailRight = loadImage('./assets/img/tailRight.png');
    tailLeft = loadImage('./assets/img/tailLeft.png');
    trophy = loadImage('./assets/img/trophy.png');
    deathImg = loadImage('./assets/img/deaths.png');
}

function setup() {
    canvas = createCanvas(width, height);
    snake = new Snake();
    apple = new Apple();
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
    background(139, 167, 82);
    drawGrid();
    showPanel();

    if (snake.die()) {
        alert('Has perdido');
        snake.size = 0;
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
    stroke(218, 235, 183);
    for (let i = 0; i < sections; i++) {
        line(i * scale, 0, i * scale, height);
        line(0, i * scale, width, i * scale);
    }
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW && snake.xspeed != -1) {
        snake.setDirection(1, 0);
    }
    if (keyCode === UP_ARROW && snake.yspeed != 1) {
        snake.setDirection(0, -1);
    }
    if (keyCode === DOWN_ARROW && snake.yspeed != -1) {
        snake.setDirection(0, 1);
    }
    if (keyCode === LEFT_ARROW && snake.xspeed != 1) {
        snake.setDirection(-1, 0);
    }
    if (key === 'A') {
        snake.addTail();
    }
}

function swiped(event) {
    if (event.direction == 4 && snake.xspeed != -1) {
        snake.setDirection(1, 0);
    } else if (event.direction == 8 && snake.yspeed != 1) {
        snake.setDirection(0, -1);
    } else if (event.direction == 16 && snake.yspeed != -1) {
        snake.setDirection(0, 1);
    } else if (event.direction == 2 && snake.xspeed != 1) {
        snake.setDirection(-1, 0);
    }
}

function showPanel() {
    fill(62, 76, 34);
    rect(0, height - 3 * scale, width, 3 * scale);
    image(appleImg, width - scale * 19.5, height - scale * 2.5, scale * 2, scale * 2);
    textSize(42);
    fill(255);
    text('x ' + punctuation, width - scale * 17, height - scale)
    if (punctuation > maxPunctuation) {
        maxPunctuation = punctuation;
    }
    image(trophy, width - scale * 13, height - scale * 2.5, scale * 2, scale * 2);
    text('x ' + maxPunctuation, width - scale * 12.5 + 2 * scale, height - scale)

    image(deathImg, width - scale * 6, height - scale * 2.5, scale * 2, scale * 2);
    text('x ' + deaths, width - scale * 5.5 + 2 * scale, height - scale)
}