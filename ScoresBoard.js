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


function closeScoreboard() {
    scoreboard.style.display = "none";
    scoresButton.style.display = "block";
}

function closeScores() {
    scoreboard.style.display = "none";
    scoresButton.style.display = "block";
    closeScoreboardButton.style.position = "relative";
}


scoresButton.addEventListener("click", displayScoreboard);
closeScoreboardButton.addEventListener("click", closeScoreboard);
