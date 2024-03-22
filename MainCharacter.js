class Character {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.hp = maxHealth;
        this.image = mainCharacterImg;
        this.level = 1;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            for (const entity of enemies) {
                entity.x += 5;
            }
            for (const entity of allies) {
                entity.x += 5;
            }
        }
        if (keyIsDown(RIGHT_ARROW)) {
            for (const entity of enemies) {
                entity.x -= 5;
            }
            for (const entity of allies) {
                entity.x -= 5;
            }
        }
        if (keyIsDown(UP_ARROW)) {
            for (const entity of enemies) {
                entity.y += 5;
            }
            for (const entity of allies) {
                entity.y += 5;
            }
        }
        if (keyIsDown(DOWN_ARROW)) {
            for (const entity of enemies) {
                entity.y -= 5;
            }
            for (const entity of allies) {
                entity.y -= 5;
            }
        }
    }
    getAttack() {
        return 2 * this.level;
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

    reset() {
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
        character.hp = maxHealth;
        character.level = 1;
    }
}
