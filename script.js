const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
date = timer();
let timerId;
let startTime;


function play() {
let range = 0;
  for (let i = 0; i < levelRadios.length; i++) {
    if (levelRadios[i].checked) {
      range = parseInt(levelRadios[i].value, 10);
    }
    levelRadios[i].disabled = true;
  }

  if (range <= 0) {
    msg.textContent = "Please select a difficulty level.";
    return;
  }

  answerState.range = range;
  answerState.answer = Math.floor(Math.random() * range) + 1;
  answerState.guessCount = 0;

  msg.textContent = "Guess a number 1-" + range;
  guessInput.value = "";

  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;
}

score++;

if (userGuess < answer) {
msg.innerHTML = "Too low, guess a number 1 through " + level;
} else if (userGuess > answer) {
msg.innerHTML = "Too high, guess a number 1 through " + level;
} else {
msg.innerHTML = "Correct! You win. It took " + score + " tries.";
scoreArr.push(score);
updateScore();
 reset();
}
}


function updateScore() {
wins.innerHTML = "Total wins: " + scoreArr.length;

let lb = document.getElementsByName("leaderboard");
scoreArr.sort((a, b) => a - b);

let sum = 0;
for (let i = 0; i < scoreArr.length; i++) {
if (i < lb.length) {
lb[i].innerHTML = scoreArr[i];
}
sum += scoreArr[i];
}

let avg = sum / scoreArr.length;
avgScore.innerHTML = "Average score: " + avg.toFixed(2);
}

function giveUp() {
  if (!answer || !level) {
    msg.innerHTML = "No game in progress. Choose a level and click Play.";
    return;
  }

  msg.innerHTML = "You gave up. The answer was " + answer + ".";
  reset();
}




function reset() {
guess.disabled = true;
guessBtn.disabled = true;
playBtn.disabled = false;
giveUpBtn.disabled = true;


for (let i = 0; i < levelArr.length; i++) {
levelArr[i].disabled = false;
}

guess.value = "";
guess.placeholder = "";
}