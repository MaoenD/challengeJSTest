class Ally {
    constructor(tier, x, y) {
        this.x = x;
        this.y = y;
        this.hp = tier * 10;
        this.attack = tier - 1;
        this.tier = tier;
        this.speed = 11 - tier;
        this.image = alliesImages[tier]; // Select image based on tier
    }

    display() {
        //image(this.image, this.x - 25, this.y - 25, 40, 40);
        fill(0, 255, 0);
        rect(this.x - 25, this.y - 25, 40, 40);
        text("ALLY", this.x - 20, this.y + 30);
        text("HP: " + this.hp, this.x - 23, this.y + 60);
    }

    updatePosTo(playerX, playerY) {
        let dx = playerX - this.x;
        let dy = playerY - this.y;

        let magnitude = sqrt(dx*dx + dy*dy);
        dx /= magnitude;
        dy /= magnitude;

        let nextX = this.x + dx * this.speed;
        let nextY = this.y + dy * this.speed;

        if (nextX < 0 || nextX > mapWidth || nextY < 0 || nextY > mapHeight) {
            return;
        }

        // Move ally towards player at defined speed
        this.x = nextX;
        this.y = nextY;
    }
}

function preload() {
    /*for (let i = 1; i <= 10; i++) {
        alliesImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
    }*/
}