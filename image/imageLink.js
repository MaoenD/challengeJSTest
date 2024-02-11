let enemyImages = [];
let allyImages = [];
let mainCharacterImage;

function preload() {
    for (let i = 1; i <= 10; i++) {
        mainCharacterImage = loadImage('assets/mainCharacter.png');
        allyImages[i] = loadImage(`assets/allyTier${i}.png`);
        //etc
        enemyImages[i] = loadImage(`assets/tier${i}.png`);
        // etc
    }
}