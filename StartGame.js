const startGameButton = document.getElementById("start-game-button");
const startDiv = document.getElementById("start");

function startGame() {
    startDiv.style.display = "block";
    startDiv.style.position = "fixed";
    startDiv.style.top = "50%";
    startDiv.style.left = "50%";
    startDiv.style.transform = "translate(-50%, -50%)";
    startDiv.style.width = "40vw";
    startDiv.style.height = "20vh";
    startDiv.style.backgroundColor = "white";
    startDiv.style.color = "black";
    startDiv.style.border = "6px solid black";
    startDiv.style.borderRadius = "10px";
    startGameButton.style.display = "none";
}

function submitUsername() {
    username = document.getElementById("username").value.trim();
    if (username !== "") {
        console.log("Username:", username);
        playerName = username;
        startDiv.style.display = "none";
        launchGame();
    } else {
        alert("Please enter your name!");
    }
}

function launchGame() {
    let mainPage = document.getElementById("main-page");
    mainPage.style.display = 'none';
    canvas.style.display = 'block';
    character = new Character();
    inGame = true;
}

function cancelGame() {
    startDiv.style.display = "none";
    startGameButton.style.display = "block";
}
