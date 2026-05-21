const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
date = time();

function time(){
  return new Date();
}

function play() {
score = 0;
for (let i = 0; i < levelArr.length; i++) {
if (levelArr[i].checked) {
level = levelArr[i].value;
}
levelArr[i].disabled = true;
}
playBtn.disabled = false;
guess.disabled = false;
guessBtn.disabled = false;
giveUpBtn.disabled = false;

answer = Math.floor(Math.random() * level) + 1;
msg.innerHTML = "Guess a number 1 through " + level;
guess.placeholder = answer;
}

function makeGuess() {
let userGuess = parseInt(guess.value);

if (isNaN(userGuess) || guess.value === "") {
msg.innerHTML = "Invalid guess, a number 1 through " + level;
return;
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