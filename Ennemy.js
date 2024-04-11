class Enemy {
    constructor(tier) {
        let pos = randomPositionInsideMap();
        this.x = pos.x;
        this.y = pos.y;
        /*this.x = random(width - 50);
        this.y = random(height - 100);*/
        this.hp = tier * 10;
        this.attack = tier - 1;
        this.tier = tier;
        this.image = enemyImages[tier]; // Assign the correct image based on tier
    }

    display() {
        image(this.image, this.x - 25, this.y - 25, 40, 40); // Adjust dimensions as needed
        text("Tier: " + this.tier, this.x - 23, this.y + 30);
        text("HP: " + this.hp, this.x - 23, this.y + 45);
        text("Attack: " + this.attack, this.x - 27.5, this.y + 60);
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

