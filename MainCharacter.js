class Character {
    constructor() {
        this.x = mapWidth / 2;
        this.y = mapHeight / 2;
        this.hp = maxHealth;
        this.image = mainCharacterImg;
        this.level = 1;
        this.speed = 5;
        this.lastDashTime = 0;
    }

    getAttack() {
        return 2 * this.level;
    }

    summon(){
        if(keyIsDown(O)) {
            let ally = new Ally(1);
            allies.push(ally);
        }
    }

    reset() {
        this.x = mapWidth / 2;
        this.y = mapHeight / 2;
        character.hp = maxHealth;
        character.level = 1;
        character.speed = 5;
        this.lastDashTime = 0;
    }

    updatePos() {
        let newX = this.x;
        let newY = this.y;
        let finalSpeed = this.speed

        let currentTime = millis() / 1000;
        let timeSinceLastDash = currentTime - this.lastDashTime;
        let canDash = timeSinceLastDash >= 4;

        if (canDash && keyIsDown(SHIFT)) {
            finalSpeed = this.speed + 150
            this.lastDashTime = currentTime;
        }

        if (keyIsDown(LEFT_ARROW)) {
            newX = this.x - finalSpeed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            newX = this.x + finalSpeed;
        }
        if (keyIsDown(UP_ARROW)) {
            newY = this.y - finalSpeed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            newY = this.y + finalSpeed;
        }

        if (newX >= 0 && newX <= mapWidth) {
            this.x = newX;
        }
        if (newY >= 0 && newY <= mapHeight) {
            this.y = newY;
        }
    }

    show() {
        //image(this.image, this.x - 25, this.y - 25, 50, 50);
        fill(0, 0, 255);
        rect(this.x - 25, this.y - 25, 50, 50);
    }
}
