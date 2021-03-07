class Food {
    constructor() {
        this.x = Math.floor(Math.random() * sections) * scal;
        this.y = Math.floor(Math.random() * sections) * scal;
        this.scal = scal;
    }

    show() {
        fill(255, 0, 0);
        //rect(this.x, this.y, this.scal, this.scal);
        image(foodImg, this.x, this.y, this.scal, this.scal)
    }

    reappear(snake) {
        this.x = Math.floor(Math.random() * sections) * scal;
        this.y = Math.floor(Math.random() * sections) * scal;

        for (let i = 0; i < snake.tail.length; i++) {
            if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                this.reappear(snake);
            }
        }
    }
}