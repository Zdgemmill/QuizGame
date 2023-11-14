

// Short circuiting: LOOK THIS UP
var highScoresList = JSON.parse(localStorage.getItem('highscores')) || []

var highscoresSection = document.querySelector("#highscores");

function displayHighScores() {
    if (highScoresList.length == 0) {
        highscoresSection.innerHTML = "No scores yet.";
    } else {
        highScoresList.sort((a, b) => b.score - a.score); // Sort scores in descending order

        for (let i = 0; i < highScoresList.length; i++) {
            var scoreItem = document.createElement("div");
            scoreItem.classList.add("score-item");

            var initials = document.createElement("span");
            initials.textContent = highScoresList[i].initials + ": ";
            scoreItem.appendChild(initials);

            var score = document.createElement("span");
            score.textContent = highScoresList[i].score;
            scoreItem.appendChild(score);

            highscoresSection.appendChild(scoreItem);
        }
    }
}

displayHighScores();
