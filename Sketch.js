let character;
let enemies = [];
let allies = [];
let enemySpawnRate = 1000; // Time (in milliseconds) between enemy spawns
let lastSpawnTime = 0;
let maxEnemies = 10;

function setup() {
    createCanvas(800, 600);
    character = new Character();
}

function draw() {
    background(220);

    let currentTime = millis();
    if (enemies.length < maxEnemies && currentTime - lastSpawnTime > enemySpawnRate) {
        enemies.push(new Enemy(Math.ceil(random(1, 10)))); // Random tier between 1 and 10
        lastSpawnTime = currentTime;
    }

    character.move();
    character.display();

    // Handle enemy logic
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        enemy.update();
        enemy.display();
        if (enemy.hp <= 0) {
            enemies.splice(i, 1); // Remove enemy if defeated
        }
    }

    // Handle ally logic
    for (let i = allies.length - 1; i >= 0; i--) {
        let ally = allies[i];
        ally.update();
        ally.display();
        if (ally.lifetime <= 0) {
            allies.splice(i, 1); // Remove ally if lifetime is over
        }
    }

    // Collision detection for attacks and summoning
    enemies.forEach((enemy, index) => {
        if (dist(character.x, character.y, enemy.x, enemy.y) < 50) { // Example attack range
            enemy.hp -= character.attack; // Character attacks enemy
            if (enemy.hp <= 0) {
                enemies.splice(index, 1); // Remove enemy if defeated
            }
        }

        // Enemy aggro and attack logic
        if (dist(character.x, character.y, enemy.x, enemy.y) < 100) { // Aggro range
            enemy.attackCharacter(character);
        }
    });

    allies.forEach(ally => {
        enemies.forEach((enemy, index) => {
            if (dist(ally.x, ally.y, enemy.x, enemy.y) < 30) { // Ally attack range
                enemy.hp -= 1; // Simplified ally attack
                if (enemy.hp <= 0) {
                    enemies.splice(index, 1); // Remove enemy if defeated by ally
                }
            }
        });
    });
}

function keyPressed() {
    if (keyCode === 96) { // Numpad 0 for summoning an ally
        if (enemies.length > 0) {
            let tier = enemies[0].tier; // Example: summon the first defeated enemy's tier
            allies.push(new Ally(tier));
        }
    }
}
