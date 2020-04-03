const sections = 20;
const width = 600;
const height = 600;
const scale = width / sections;
let snake;
let apple;


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
    background(60);
    stroke(120);
    for (let i = 0; i < sections; i++) {
        line(i * scale, 0, i * scale, height);
        line(0, i * scale, height, i * scale);
    }
    if (snake.die()) {
        alert('Has perdido');
        snake.size = 0;
    }
    apple.show();

    snake.update();
    snake.show();
    if (snake.eat(apple)) {
        apple.reappear();
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