const scoresButton = document.getElementById("scores-button");
const scoreboard = document.getElementById("scoreboard");
const closeScoreboardButton = document.getElementById("close-scoreboard");

function displayScoreboard() {
    scoreboard.style.display = "block";
    scoreboard.style.position = "fixed";
    scoreboard.style.top = "60%";
    scoreboard.style.left = "50%";
    scoreboard.style.transform = "translate(-50%, -50%)";
    scoreboard.style.width = "50vw";
    scoreboard.style.height = "50vh";
    scoreboard.style.backgroundColor = "white";
    scoreboard.style.color = "black";
    scoreboard.style.border = "6px solid black";
    scoreboard.style.borderRadius = "10px";
    scoresButton.style.display = "none";
}


function toggleScoreboard(displayStatus) {
    scoreboard.style.display = displayStatus ? "block" : "none";
    scoresButton.style.display = displayStatus ? "none" : "block";
    if (!displayStatus) {
        closeScoreboardButton.style.position = "relative";
    }
}

scoresButton.addEventListener("click", () => toggleScoreboard(true));
closeScoreboardButton.addEventListener("click", () => toggleScoreboard(false));


function centerScoresButton() {
    scoresButton.style.display = "block";
    scoresButton.style.position = "fixed";
    scoresButton.style.left = "10%";
    scoresButton.style.top = "390%";
    scoresButton.style.transform = "translate(-50%, -50%)";
}