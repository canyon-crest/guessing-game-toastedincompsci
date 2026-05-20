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
for (let i = 0; i < levelArr.length; i++) {
if (levelArr[i].checked) {
level = levelArr[i].value;
}
levelArr[i].disabled = true;
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
scoreArr.push(score);
updateScore();
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

function reset() {
guess.disabled = true;
guessBtn.disabled = true;
playBtn.disabled = false;

for (let i = 0; i < levelArr.length; i++) {
levelArr[i].disabled = false;
}

guess.value = "";
guess.placeholder = "";
}