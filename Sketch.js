let character;
let enemies = [];
let allies = [];
let enemySpawnRate = 1000;
let lastSpawnTime = 0;
let maxEnemies = 10;
let mainCharacterImg;
const enemyImages = [];
const alliesImages = [];
let maxHealth = 50;
let inGame = false;
let isGameOver = false;
let backButton;
let username = "";
let startButtonX, startButtonY;
let mapWidth = 1600;
let mapHeight = 1400;
let cameraX = 0;
let cameraY = 0;

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 15);
    canvas = document.querySelector('canvas');
    canvas.style.display = 'none';

    backButton = createButton('Exit');
    backButton.position(windowWidth - 75, 20);
    backButton.style('background-color', 'red');
    backButton.style('color', 'white');
    backButton.style('border-radius', '5px');
    backButton.style('font-size', '16px');
    backButton.style('padding', '10px');
    backButton.style('border', 'none');

    backButton.mousePressed(returnToMainPage);
}

function setupGame() {
    document.getElementById("main-page").style.display = 'none';
    canvas.style.display = 'block';
    inGame = true;
    isGameOver = false;
    enemies = [];  
    allies = [];  
    character = new Character();
    loop();
}

function windowResized() {
    backButton.position(windowWidth - 75, 20);
    resizeCanvas(windowWidth - 15, windowHeight - 15);
}

function draw() {
    if (!inGame) {
        clear();
        backButton.hide();
        return;
    }

    if (isGameOver) {
        displayGameOverScreen();
        return;
    }

    updateBackground();
    updateCharacterPosition();
    manageCamera();
    handleEnemySpawning();
    processEnemies();
    processAllies();
    checkCollisions();
    displayGameInfo();
    backButton.show();
}

function updateBackground() {
    background(50);
    fill(150);
    rect(0, 0, mapWidth, mapHeight);
}

function updateCharacterPosition() {
    character.updatePos();
    fill(255);
    character.show();
}

function manageCamera() {
    cameraX = character.x - width / 2;
    cameraY = character.y - height / 2;
    translate(-cameraX, -cameraY);
}

function handleEnemySpawning() {
    let currentTime = millis();
    if (enemies.length < maxEnemies && currentTime - lastSpawnTime > enemySpawnRate) {
        enemies.push(new Enemy(Math.ceil(random(0, 10))));
        lastSpawnTime = currentTime;
    }
}

function processEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.updatePosTo(character.x, character.y);
        enemy.display();
    });
}

function processAllies() {
    allies.forEach(ally => {
        let result = closestEnemy(ally.x, ally.y);
        if (result) {
            if (result.distance < 500) {
                ally.updatePosTo(result.enemy.x, result.enemy.y);
            } else {
                randomMoveAlly(ally);
            }
        }
        ally.display();
    });
}

function randomMoveAlly(ally) {
    let direction = Math.floor(Math.random() * 4) + 1;
    switch (direction) {
        case 1: ally.updatePosTo(ally.x, ally.y + 5); break;
        case 2: ally.updatePosTo(ally.x + 5, ally.y); break;
        case 3: ally.updatePosTo(ally.x, ally.y - 5); break;
        case 4: ally.updatePosTo(ally.x - 5, ally.y); break;
    }
}

function checkCollisions() {
    checkEnemyCollisions();
    checkAllyCollisions();
}

function checkEnemyCollisions() {
    enemies.forEach((enemy, index) => {
        let charLeft = character.x - 25;
        let charRight = character.x + 25;
        let charTop = character.y - 25;
        let charBottom = character.y + 25;

        let enemyLeft = enemy.x - 20;
        let enemyRight = enemy.x + 20;
        let enemyTop = enemy.y - 20;
        let enemyBottom = enemy.y + 20;

        if (charRight > enemyLeft &&
            charLeft < enemyRight &&
            charBottom > enemyTop &&
            charTop < enemyBottom) {
            processCollisionWithEnemy(enemy, index);
        }
    });
}

function checkAllyCollisions() {
    allies.forEach((ally, allyIndex) => {
        let allyLeft = ally.x - 20;
        let allyRight = ally.x + 20;
        let allyTop = ally.y - 20;
        let allyBottom = ally.y + 20;

        enemies.forEach((enemy, enemyIndex) => {
            let enemyLeft = enemy.x - 20;
            let enemyRight = enemy.x + 20;
            let enemyTop = enemy.y - 20;
            let enemyBottom = enemy.y + 20;

            if (allyRight > enemyLeft &&
                allyLeft < enemyRight &&
                allyBottom > enemyTop &&
                allyTop < enemyBottom) {
                processCollisionWithAlly(ally, enemy, allyIndex, enemyIndex);
            }
        });
    });
}

function processCollisionWithEnemy(enemy, index) {
    character.hp -= enemy.attack;
    enemy.hp -= character.getAttack();
    if (enemy.hp <= 0) {
        enemies.splice(index, 1);
        character.hp = maxHealth;
        character.level++;
        allies.push(new Ally(enemy.tier, enemy.x, enemy.y));
    }
    if (character.hp <= 0) {
        resetGame();
    }
}

function processCollisionWithAlly(ally, enemy, allyIndex, enemyIndex) {
    ally.hp -= enemy.attack;
    enemy.hp -= ally.attack;
    if (enemy.hp <= 0) {
        allies.push(new Ally(enemy.tier));
        enemies.splice(enemyIndex, 1);
    }
    if (ally.hp <= 0) {
        allies.splice(allyIndex, 1);
    }
}

function resetGame() {
    character.reset();
    enemies = [];
    allies = [];
    isGameOver = true; 
    backButton.hide();
}

function displayGameInfo() {
    text("Allies: " + allies.length, 10 - -cameraX, 80 - -cameraY);
    text("HP: " + character.hp, 10 - -cameraX, 160 - -cameraY);
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

function closestEnemy(targetX, targetY) {
    let closestEnemy = null;
    let shortestDistance = Infinity;
    for (let enemy of enemies) {
        let distance = dist(targetX, targetY, enemy.x, enemy.y);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestEnemy = enemy;
        }
    }
    return { enemy: closestEnemy, distance: shortestDistance };
}


function returnToMainPage() {
    inGame = false;
    canvas.style.display = "none";
    
    document.getElementById("main-page").style.display = "block";
    centerStartButton();
    centerScoresButton();
}

function displayGameOverScreen() {
    background(0);
    fill(255); 
    textSize(32); 
    textAlign(CENTER, CENTER); 
    text("Game Over", width / 2, height / 2); 
    text("Press 'R' to Restart", width / 2, height / 2 + 50);
    if (keyIsPressed && key === 'r') {
        restartGame();
    }
}

function restartGame() {
    character.hp = maxHealth;
    enemies = [];
    allies = [];
    isGameOver = false;
    inGame = true;
    character.reset(); 
    lastSpawnTime = 0; 
    backButton.show();
}

function keyPressed() {
    if (isGameOver && key === 'R') {
        restartGame();
    }
}