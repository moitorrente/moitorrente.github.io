class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.scale = scale;
        this.size = 0;
        this.tail = [];
    }

    update() {
        if (this.size === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.size - 1] = createVector(this.x, this.y)

        this.x += this.xspeed * scale;
        this.y += this.yspeed * scale;

        if (this.x >= width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = width;
        }
        if (this.y >= height) {
            this.y = 0;
        }
        if (this.y < 0) {
            this.y = height;
        }
    }

    show() {
        fill(134, 173, 132);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, this.scale, this.scale);
        }
        fill(68, 117, 66);
        rect(this.x, this.y, this.scale, this.scale);

    }

    setDirection(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    addTail(){
        this.size++;
    }

    eat(apple){
        if(this.x == apple.x && this.y == apple.y){
            this.addTail();
            return true;

        } else {
            return false;
        }
    }
    
    die(){
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y){
                alert(i);
                this.tail.length = 0;
                return true;
            }
        }
    }
}

