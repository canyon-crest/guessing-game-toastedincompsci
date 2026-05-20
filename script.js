const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

date.innerHTML = time();

function time(){
  let d = new Date();
  return d;
}

function play() {
score = 0;
for (let i = 0; i < levelArray.length; i++) {
if (levelArray[i].checked) {
level = levelArray[i].value;
}
levelArray[i].disabled = true;
}
playBtn.disabled = true;
guess.disabled = false;
guessBtn.disabled = false;

answer = Math.floor(Math.random() * level) + 1;
MSG.innerHTML = "Guess a number 1 through " + level;
guess.placeholder = answer;
}

function makeGuess() {
let userGuess = parseInt(guess.value);

if (isNaN(userGuess) || guess.value === "") {
MSG.innerHTML = "Invalid guess, a number 1 through " + level;
return;
}

score++;

if (userGuess < answer) {
MSG.innerHTML = "Too low, guess a number 1 through " + level;
} else if (userGuess > answer) {
MSG.innerHTML = "Too high, guess a number 1 through " + level;
} else {
MSG.innerHTML = "Correct! You win. It took " + score + " tries.";
scoreArray.push(score);
updateScore();
}
}

function updateScore() {
wins.innerHTML = "Total wins: " + scoreArray.length;

let lb = document.getElementsByName("leaderboard");
scoreArray.sort((a, b) => a - b);

let sum = 0;
for (let i = 0; i < scoreArray.length; i++) {
if (i < lb.length) {
lb[i].innerHTML = scoreArray[i];
}
sum += scoreArray[i];
}

let avg = sum / scoreArray.length;
AVG_score.innerHTML = "Average score: " + avg.toFixed(2);
}

function reset() {
guess.disabled = true;
guessBTN.disabled = true;
playBTN.disabled = false;

for (let i = 0; i < levelArray.length; i++) {
levelArray[i].disabled = false;
}

guess.value = "";
guess.placeholder = "";
}