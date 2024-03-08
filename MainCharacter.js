class Character {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.hp = 10;
        this.attack = 1;
        this.image = mainCharacterImg;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
    }

    summon(){
        if(keyIsDown(O)) {
            let ally = new Ally(1); // Assuming tier 1 for the ally
            allies.push(ally);
        }
    }
    display() {
        image(this.image, this.x, this.y, 50, 50); // Adjust dimensions as needed
    }
}
