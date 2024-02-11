class Ally {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.lifetime = tier * 10 + 10; // T1: 20 seconds
        this.tier = tier;
        this.image = allyImages[tier];
    }

    display() {
        // Placeholder for ally display
        image(this.image, this.x, this.y, imageWidth, imageHeight);
    }

    update() {
        this.lifetime--;
        if (this.lifetime <= 0) {
            // Remove the ally from the game
        }
    }
}
