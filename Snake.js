class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.eating = false;
        this.eating = false;
        this.xdir = 0;
        this.ydir = 0;
        this.scal = scal;
        this.size = 1;
        this.tail = [];
        this.headImg = initialHead;
        this.tailImg = [];
        this.tailDir = [];
        this.lastFoodx;
        this.lastFoody;
    }

    update() {
        this.shiftBody();
        this.x += this.xdir * scal;
        this.y += this.ydir * scal;

        if (this.x + this.scal > width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width;
        } else if (this.y + this.scal > height - 90) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = height - 120;
        }
    }

    shiftBody() {
        if (this.size === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
                this.tailImg[i] = this.tailImg[i + 1];
                this.tailDir[i] = this.tailDir[i + 1];
            }
        }
        if (this.size > 0) {
            let dir = 0;
            let eat = 0;

            this.tail[this.size - 1] = createVector(this.x, this.y);
            if (this.eating) {
                eat = 1;
            }
            this.tailDir[this.size - 1] = createVector(this.xdir, this.ydir, eat);

            //Horizontal: dir = 1; Vertical: dir = 0
            if (this.xdir == 1 || this.xdir == -1) {
                dir = 1;
            } else {
                dir = 0;
            }

            if (this.eating) {
                this.tailImg[this.size - 1] = snakeBodyEat[dir];
            } else {
                this.tailImg[this.size - 1] = snakeBody[dir];
            }
        }
    }

    show() {
        this.calculateTurnImages();
        this.showBody();
        this.showTail(this.calculateTailImage());
        this.showHead();
    }

    showBody() {
        for (let i = 1; i < this.tail.length; i++) {
            image(this.tailImg[i], this.tail[i].x, this.tail[i].y, this.scal, this.scal);
        }
    }

    showTail(img) {
        if (this.size > 0) {
            image(img, this.tail[0].x, this.tail[0].y, this.scal, this.scal);
        }
    }

    showHead() {
        image(this.headImg, this.x, this.y, this.scal, this.scal);
    }

    setDirection(x, y) {
        let pos = 0;
        this.xdir = x;
        this.ydir = y;

        if (this.xdir == 1) {
            pos = 1;
        } else if (this.ydir == -1) {
            pos = 0;
        } else if (this.xdir == -1) {
            pos = 3;
        } else if (this.ydir == 1) {
            pos = 2;
        }
        this.headImg = snakeHead[pos];
    }

    addTail() {
        this.size++;
    }

    eat(food) {
        if (this.x == food.x && this.y == food.y) {
            this.lastFoodx = food.x;
            this.lastFoody = food.y;
            this.eating = true;
            this.addTail();
            return true;
        } else {
            this.eating = false;
            return false;
        }
    }

    die() {
        for (let i = 1; i < this.tail.length; i++) {
            if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
                this.tail.length = 0;
                punctuation = 0;
                this.size = 1;
                return true;
            }
        }
    }

    calculateTurnImages() {
        let pos = 0;
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.tailDir[i].x != this.tailDir[i + 1].x &&
                this.tailDir[i].y != this.tailDir[i + 1].y) {

                if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == 1 &&
                    this.tailDir[i].y == -1 && this.tailDir[i + 1].y == 0) {
                    pos = 0;
                } else if (this.tailDir[i].x == 1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == 1) {
                    pos = 1;
                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == -1 &&
                    this.tailDir[i].y == 1 && this.tailDir[i + 1].y == 0) {
                    pos = 2;

                } else if (this.tailDir[i].x == -1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == -1) {
                    pos = 3;
                }

                if (this.tailDir[i].x == -1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == 1) {
                    pos = 0;
                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == -1 &&
                    this.tailDir[i].y == -1 && this.tailDir[i + 1].y == 0) {
                    pos = 1;
                } else if (this.tailDir[i].x == 1 && this.tailDir[i + 1].x == 0 &&
                    this.tailDir[i].y == 0 && this.tailDir[i + 1].y == -1) {
                    pos = 2;

                } else if (this.tailDir[i].x == 0 && this.tailDir[i + 1].x == 1 &&
                    this.tailDir[i].y == 1 && this.tailDir[i + 1].y == 0) {
                    pos = 3;
                }

                if (this.tailDir[i + 1].z == 1) {
                    this.tailImg[i + 1] = turnEatImgs[pos];
                } else {
                    this.tailImg[i + 1] = turnImgs[pos];
                }
            }
        }
    }

    calculateTailImage() {
        let endImg = tailLeft;
        if (this.tailDir[0].x == 1 && this.tailDir[0].y == 0) {
            endImg = tailRight;
        } else if (this.tailDir[0].x == 0 && this.tailDir[0].y == 1) {
            endImg = tailDown;
        } else if (this.tailDir[0].x == -1 && this.tailDir[0].y == 0) {
            endImg = tailLeft;
        } else if (this.tailDir[0].x == 0 && this.tailDir[0].y == -1) {
            endImg = tailUp;
        }
        return endImg;
    }
}

