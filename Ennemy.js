class Enemy {
    constructor(tier) {
        this.x = random(width);
        this.y = random(height);
        this.hp = tier;
        this.attack = tier - 1;
        this.tier = tier;
    }

    display() {
        // Placeholder for enemy display
        ellipse(this.x, this.y, 30 + this.tier * 5, 30 + this.tier * 5);
    }

    attackCharacter(character) {
        if (this.attack > 0 && frameCount % 60 === 0) { // Attack once per second
            character.hp -= this.attack;
        }
    }
}
