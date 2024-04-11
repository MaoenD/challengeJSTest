class Enemy {
    constructor(tier) {
        let pos = randomPositionInsideMap();
        this.x = pos.x;
        this.y = pos.y;
        this.hp = tier * 10;
        this.attack = tier - 1;
        this.tier = tier;
        this.speed = 11 - tier;
        this.image = enemyImages[tier]; // Assign the correct image based on tier
    }

    display() {
        image(this.image, this.x - 25, this.y - 25, 40, 40); // Adjust dimensions as needed
        text("ENNEMY", this.x - 23, this.y + 30);
        text("Tier: " + this.tier, this.x - 23, this.y + 45);
        text("HP: " + this.hp, this.x - 23, this.y + 60);
        text("Attack: " + this.attack, this.x - 27.5, this.y + 75);
    }

    updatePosTo(playerX, playerY) {
        // Calculate direction vector from enemy to player
        let dx = playerX - this.x;
        let dy = playerY - this.y;

        // Normalize direction vector
        let magnitude = sqrt(dx*dx + dy*dy);
        dx /= magnitude;
        dy /= magnitude;

        // Move enemy towards player at defined speed
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    }


}

function preload() {
    /*for (let i = 1; i <= 10; i++) {
        enemyImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
    }*/
}

