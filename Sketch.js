let character;
let enemies = [];
let allies = [];
let enemySpawnRate = 1000; // Time ms between enemy spawns
let lastSpawnTime = 0;
let maxEnemies = 10;
let mainCharacterImg;
const enemyImages = [];
const alliesImages = [];
let maxHealth = 50;
let inGame = false;
let username = "";

let mapWidth = 800;
let mapHeight = 600;
let cameraX = 0;
let cameraY = 0;

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 15);
    canvas = document.querySelector('canvas');
    canvas.style.display = 'none';
}

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 15);
}

function draw() {
    if (inGame) {

        background(50);

        character.update();

        cameraX = character.x - width / 2;
        cameraY = character.y - height / 2;

        translate(-cameraX, -cameraY);

        fill(150); // Gray
        rect(0, 0, mapWidth, mapHeight);

        fill(255);
        text("Player Position: (" + character.x + ", " + character.y + ")", 10 - -cameraX, 20 - -cameraY);
        text("Player: " + username, 10 - -cameraX, 40 - -cameraY);
        text("Ennemies: " + enemies.length, 10 - -cameraX, 60 - -cameraY);
        text("Allies: " + allies.length, 10 - -cameraX, 80 - -cameraY);
        text("enemySpawnRate: " + enemySpawnRate, 10 - -cameraX, 100 - -cameraY);
        text("lastSpawnTime: " + lastSpawnTime, 10 - -cameraX, 120 - -cameraY);
        text("Level: " + character.level, 10 - -cameraX, 140 - -cameraY);
        text("HP: " + character.hp, 10 - -cameraX, 160 - -cameraY);
        text("Attack: " + character.getAttack(), 10 - -cameraX, 180 - -cameraY);

        character.show();

        let currentTime = millis();
        if (enemies.length < maxEnemies && currentTime - lastSpawnTime > enemySpawnRate) {
            enemies.push(new Enemy(Math.ceil(random(1, 10)))); // Random tier between 1 and 10
            lastSpawnTime = currentTime;
        }

        // Handle enemy logic
        for (let i = enemies.length - 1; i >= 0; i--) {
            let enemy = enemies[i];
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
                allies.splice(i, 1); // Remove ally if time over
            }
        }

        // Collision detection summon
        enemies.forEach((enemy, index) => {
            //text("HP: " + enemy.hp, enemy.x, enemy.y + 20);
            if (dist(character.x, character.y, enemy.x, enemy.y) < 50) { // attack range
                character.hp -= enemy.attack;
                enemy.hp -= character.getAttack(); // Character attacks enemy
                if (enemy.hp <= 0) {
                    enemies.splice(index, 1); // Remove enemy if defeated
                    character.hp = maxHealth;
                    character.level++;
                }
                if (character.hp <= 0) {
                    character.reset();
                    enemies = []
                }
            }

            // Enemy aggro and attack logic
            /*if (dist(character.x, character.y, enemy.x, enemy.y) < 100) { // Aggro range
                enemy.attackCharacter(character);
            }*/
        });

        allies.forEach(ally => {
            enemies.forEach((enemy, index) => {
                if (dist(ally.x, ally.y, enemy.x, enemy.y) < 30) { // Ally attack range
                    enemy.hp -= ally.tier; // Assuming ally's tier is its attack power
                    if (enemy.hp <= 0) {
                        enemies.splice(index, 1); // Remove enemy if defeated by ally
                    }
                }
            });
        });
    } else {
        clear();
    }
}

function randomPositionInsideMap() {
    let x = random(0, mapWidth);
    let y = random(0, mapHeight);
    return { x, y };
}



function preload() {
    console.log("Preloading Character")
    mainCharacterImg = loadImage('image/MC.png');
    for (let i = 1; i <= 10; i++) {
        enemyImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
        alliesImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
    }
}

