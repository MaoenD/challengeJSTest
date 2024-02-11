class Ally {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.lifetime = tier * 10 + 10; // e.g., T1: 20 seconds
        this.tier = tier;
    }

    display() {
        // Placeholder for ally display
        ellipse(this.x, this.y, 20 + this.tier * 5, 20 + this.tier * 5);
    }

    update() {
        this.lifetime--;
        if (this.lifetime <= 0) {
            // Remove the ally from the game
        }
    }
}
