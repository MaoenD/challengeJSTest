class Ally {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.lifetime = tier * 10 + 10; // Example lifetime
        this.tier = tier;
        this.image = allyImages[tier]; // Select image based on tier
    }

    display() {
        image(this.image, this.x, this.y, 30, 30); // Adjust dimensions as needed
    }

    update() {
        this.lifetime--;
        if (this.lifetime <= 0) {
            let index = allies.indexOf(this);
            if (index > -1) {
                allies.splice(index, 1); // Remove the ally from the game
            }
        }
    }
}
