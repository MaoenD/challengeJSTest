class Enemy {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.hp = tier * 10;
        this.attack = tier - 1;
        this.tier = tier;
        this.image = enemyImages[tier]; // Assign the correct image based on tier
    }

    display() {
        image(this.image, this.x, this.y, 40, 40); // Adjust dimensions as needed
        text("Tier: " + this.tier, this.x + 2, this.y + 55);
        text("HP: " + this.hp, this.x + 2, this.y + 70);
        text("Attack: " + this.attack, this.x - 2, this.y + 85);
    }
    attackCharacter(character) {
        /*if (this.attack > 0 && frameCount % 60 === 0) { // Attack once per second
            character.hp -= this.attack;
        }*/
    }


}

function preload() {
    /*for (let i = 1; i <= 10; i++) {
        enemyImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
    }*/
}

