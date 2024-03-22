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

function setup() {
    createCanvas(windowWidth, windowHeight);
    canvas = document.querySelector('canvas');
    canvas.style.display = 'none';
}

function startGame() {
    let mainPage = document.getElementById("main-page");
    mainPage.style.display = 'none';
    canvas.style.display = 'block';
    character = new Character();
    inGame = true;
}

function draw() {
    if (inGame) {
        background(220);
        text("Ennemies: " + enemies.length, 25, 30);
        text("Allies: " + allies.length, 25, 50);
        text("enemySpawnRate: " + enemySpawnRate, 25, 70);
        text("lastSpawnTime: " + lastSpawnTime, 25, 90);
        text("Level: " + character.level, 25, 130);
        text("HP: " + character.hp, 25, 150);
        text("Attack: " + character.getAttack(), 25, 170);

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
        drawMainMenu();
    }
}

function drawMainMenu() {

}

function preload() {
    console.log("Preloading Character")
    mainCharacterImg = loadImage('image/MC.png');
    for (let i = 1; i <= 10; i++) {
        enemyImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
        alliesImages[i] = loadImage(`image/enemies/demonTier${i}.png`);
    }
}

