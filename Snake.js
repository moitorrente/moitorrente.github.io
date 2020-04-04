class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xdir = 1;
        this.ydir = 0;
        this.scale = scale;
        this.size = 1;
        this.tail = [];
        this.headImg = snakeHeadRightImg;
        this.tailImg = [snakeBodyHorImg];
        this.tailDir = [];
    }

    update() {
        if (this.size === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
                this.tailImg[i] = this.tailImg[i + 1];
                this.tailDir[i] = this.tailDir[i + 1];
            }
        }
        if (this.size > 0) {
            this.tail[this.size - 1] = createVector(this.x, this.y);
            this.tailDir[this.size - 1] = createVector(this.xdir, this.ydir);
            if (this.xdir == 1 || this.xdir == -1) {
                this.tailImg[this.size - 1] = snakeBodyHorImg;
            } else {
                this.tailImg[this.size - 1] = snakeBodyVerImg;
            }
        }
        this.x += this.xdir * scale;
        this.y += this.ydir * scale;

        if (this.x + this.scale > width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = width;
        }
        if (this.y + this.scale > height - 90) {
            this.y = 0; 
        }
        if (this.y < 0) {
            this.y = height - 120;
        }
    }

    show() {
        this.calculateBodyImages();
        this.showBody();
        this.showTail(this.calculateTailImage());
        this.showHead();
    }

    showBody() {
        for (let i = 1; i < this.tail.length; i++) {
            image(this.tailImg[i], this.tail[i].x, this.tail[i].y, this.scale, this.scale);
        }
    }

    showTail(img) {
        if(this.size > 0){
            image(img, this.tail[0].x, this.tail[0].y, this.scale, this.scale);
        }
    }

    showHead() {
        image(this.headImg, this.x, this.y, this.scale, this.scale);
    }

    setDirection(x, y) {
        this.xdir = x;
        this.ydir = y;
        if (this.xdir == 1) {
            this.headImg = snakeHeadRightImg;
        }
        if (this.ydir == -1) {
            this.headImg = snakeHeadUpImg;
        }
        if (this.xdir == -1) {
            this.headImg = snakeHeadLeftImg;
        }
        if (this.ydir == 1) {
            this.headImg = snakeHeadDownImg;
        }
    }

    addTail() {
        this.size++;
    }

    eat(apple) {
        if (this.x == apple.x && this.y == apple.y) {
            this.addTail();
            return true;

        } else {
            return false;
        }
    }

    die() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
                this.tail.length = 0;
                this.size = 1;
                punctuation = 0;
                return true;
            }
        }
    }

    calculateBodyImages() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.tailDir[i].x != this.tailDir[i + 1].x &&
                this.tailDir[i].y != this.tailDir[i + 1].y) {

                if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == 1 &&
                    this.tailDir[i].y == -1 && this.tailDir[i + 1].y == 0) {
                    this.tailImg[i + 1] = turn1;
                } else if (this.tailDir[i].x == 1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == 1) {
                    this.tailImg[i + 1] = turn2;
                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == -1 &&
                    this.tailDir[i].y == 1 && this.tailDir[i + 1].y == 0) {
                    this.tailImg[i + 1] = turn3;

                } else if (this.tailDir[i].x == -1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == -1) {
                    this.tailImg[i + 1] = turn4;
                }

                if (this.tailDir[i].x == -1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == 1) {
                    this.tailImg[i + 1] = turn1;
                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == -1 &&
                    this.tailDir[i].y == -1 && this.tailDir[i + 1].y == 0) {
                    this.tailImg[i + 1] = turn2;
                } else if (this.tailDir[i].x == 1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == -1) {
                    this.tailImg[i + 1] = turn3;

                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == 1 &&
                    this.tailDir[i].y == 1 && this.tailDir[i + 1].y == 0) {
                    this.tailImg[i + 1] = turn4;
                }
            }
        }
    }

    calculateTailImage() {
        let endImg;
        if (this.size > 0) {
              if (this.tailDir[0].x == 1 && this.tailDir[0].y == 0) {
                endImg = tailRight;
            } else if (this.tailDir[0].x == 0 && this.tailDir[0].y == 1) {
                endImg = tailDown;
            } else if (this.tailDir[0].x == -1 && this.tailDir[0].y == 0) {
                endImg = tailLeft;
            } else if (this.tailDir[0].x == 0 && this.tailDir[0].y == -1) {
                endImg = tailUp;
            }
        }
        return endImg;
    }
}

