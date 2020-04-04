class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * sections) * scale;
        this.y = Math.floor(Math.random() * sections) * scale;
        this.scale = scale;
    }

    show() {
        fill(255, 0, 0);
        //rect(this.x, this.y, this.scale, this.scale);
        image(appleImg, this.x, this.y, this.scale, this.scale)
    }

    reappear(snake) {
        this.x = Math.floor(Math.random() * sections) * scale;
        this.y = Math.floor(Math.random() * sections) * scale;

        for (let i = 0; i < snake.tail.length; i++) {
            if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                this.reappear(snake);
            }
        }
    }
}