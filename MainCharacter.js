class Character {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.hp = 10;
        this.attack = 1;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
    }

    display() {
        // Placeholder for character display
        ellipse(this.x, this.y, 50, 50);
    }
}
