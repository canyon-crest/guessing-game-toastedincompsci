const answerState = {
  answer: 0,
  range: 0,
  guessCount: 0,
};

const scores = [];
const msg = document.getElementById("msg");
const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const playBtn = document.getElementById("playBtn");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const easyLevel = document.getElementById("e");
const medLevel = document.getElementById("m");
const hardLevel = document.getElementById("h");
const levelRadios = document.getElementsByName("level");

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

defaultReset();

function play(){
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

function makeGuess(){
  const guess = parseInt(guessInput.value, 10);
  if (isNaN(guess)) {
    msg.textContent = "Please enter a valid number.";
    return;
  }

  if (guess < 1 || guess > answerState.range) {
    msg.textContent = "Enter a number between 1 and " + answerState.range + ".";
    return;
  }

  answerState.guessCount++;

  if (guess === answerState.answer) {
    msg.textContent = "Correct! It took " + answerState.guessCount + " tries.";
    updateScore(answerState.guessCount);
    defaultReset("Select a Level");
    return;
  }

  if (guess < answerState.answer) {
    msg.textContent = "Too low, try again.";
  } else {
    msg.textContent = "Too high, try again.";
  }
}

function giveUp(){
  if (answerState.answer === 0 || answerState.range === 0) {
    msg.textContent = "No game in progress. Choose a level and click Play.";
    return;
  }

  msg.textContent = "You gave up. The answer was " + answerState.answer + ".";
  defaultReset("You gave up. The answer was " + answerState.answer + ".");
}

function updateScore(score) {
  scores.push(score);
  wins.textContent = "Total wins: " + scores.length;

  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(1);

  scores.sort(function (a, b) {
    return a - b;
  });

  const lb = document.getElementsByName("leaderboard");
  for (let i = 0; i < lb.length; i++) {
    lb[i].textContent = i < scores.length ? scores[i] : "";
  }
}

function defaultReset(message = "Select a Level") {
  guessInput.value = "";
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  playBtn.disabled = false;
  easyLevel.disabled = false;
  medLevel.disabled = false;
  hardLevel.disabled = false;
  msg.textContent = message;
}
