class Character {
    constructor() {
        this.x = mapWidth / 2;
        this.y = mapHeight / 2;
        this.hp = maxHealth;
        this.image = mainCharacterImg;
        this.level = 1;
        this.speed = 2;
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

    reset() {
        this.x = mapWidth / 2;
        this.y = mapHeight / 2;
        character.hp = maxHealth;
        character.level = 1;
    }

    update() {
        let newX = this.x;
        let newY = this.y;

        if (keyIsDown(LEFT_ARROW)) {
            newX = this.x - this.speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            newX = this.x + this.speed;
        }
        if (keyIsDown(UP_ARROW)) {
            newY = this.y - this.speed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            newY = this.y + this.speed;
        }

        // Check if the new position is within the map bounds
        if (newX >= 0 && newX <= mapWidth) {
            this.x = newX;
        }
        if (newY >= 0 && newY <= mapHeight) {
            this.y = newY;
        }
    }

    show() {
        image(this.image, this.x - 25, this.y - 25, 50, 50);
    }
}
