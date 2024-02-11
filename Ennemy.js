class Enemy {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.hp = tier;
        this.attack = tier - 1;
        this.tier = tier;
        this.image = enemyImages[tier]; // Assign the correct image based on tier
    }

    display() {
        image(this.image, this.x, this.y, imageWidth, imageHeight);
    }
    attackCharacter(character) {
        if (this.attack > 0 && frameCount % 60 === 0) { // Attack once per second
            character.hp -= this.attack;
        }
    }
}
