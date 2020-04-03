class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * sections) * scale;
        this.y = Math.floor(Math.random() * sections) * scale;
        this.scale = scale;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.scale, this.scale);
    }

    reappear(){
        this.x = Math.floor(Math.random() * sections) * scale;
        this.y = Math.floor(Math.random() * sections) * scale;
    }
}