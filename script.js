const answerState = {
  answer: 0,
  range: 0,
  guessCount: 0,
  startTime: 0,
};

const scoreHistory = [];
const timeHistory = [];
let timerInterval = null;
let liveTimeInterval = null;

const msg = document.getElementById("msg");
const guessInput = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const playBtn = document.getElementById("playBtn");
const gamesCompleted = document.getElementById("gamesCompleted");
const avgScore = document.getElementById("avgScore");
const fastestTime = document.getElementById("fastest");
const avgTime = document.getElementById("avgTime");
const easyLevel = document.getElementById("e");
const medLevel = document.getElementById("m");
const hardLevel = document.getElementById("h");
const levelRadios = document.getElementsByName("level");
const playerNameInput = document.getElementById("playerName");
const currentDate = document.getElementById("currentDate");
const liveTime = document.getElementById("liveTime");
const roundTimer = document.getElementById("roundTimer");

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);

setCurrentDate();
startLiveClock();
defaultReset();

function getPlayerName() {
  const name = playerNameInput.value.trim();
  return name === "" ? "Player" : name;
}

function setCurrentDate() {
  const now = new Date();
  currentDate.textContent = `${formatMonthName(now)} ${formatDayWithSuffix(now)}, ${now.getFullYear()}`;
}

function formatMonthName(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.getMonth()];
}

function formatDayWithSuffix(date) {
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function startLiveClock() {
  updateLiveTime();
  liveTimeInterval = setInterval(updateLiveTime, 1000);
}

function updateLiveTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  liveTime.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
  setCurrentDate();
}

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
  answerState.startTime = Date.now();

  msg.textContent = `${getPlayerName()}, guess a number 1-${range}.`;
  guessInput.value = "";

  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;

  startRoundTimer();
}

function startRoundTimer() {
  updateRoundTimer();
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(updateRoundTimer, 1000);
}

function stopRoundTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateRoundTimer() {
  if (!answerState.startTime) {
    roundTimer.textContent = "Round Time: 00:00";
    return;
  }
  const elapsedSeconds = Math.floor((Date.now() - answerState.startTime) / 1000);
  roundTimer.textContent = `Round Time: ${formatDuration(elapsedSeconds)}`;
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function makeGuess() {
  const guess = parseInt(guessInput.value, 10);
  if (isNaN(guess)) {
    msg.textContent = "Please enter a valid number.";
    return;
  }

  if (guess < 1 || guess > answerState.range) {
    msg.textContent = `Enter a number between 1 and ${answerState.range}.`;
    return;
  }

  answerState.guessCount++;
  const diff = Math.abs(guess - answerState.answer);

  if (guess === answerState.answer) {
    const durationSeconds = Math.floor((Date.now() - answerState.startTime) / 1000);
    msg.textContent = `${getPlayerName()}, correct! It took ${answerState.guessCount} guess${answerState.guessCount === 1 ? "" : "es"} and ${formatDuration(durationSeconds)}.`;
    updateScore(answerState.guessCount, durationSeconds);
    endRound();
    return;
  }

  const direction = guess < answerState.answer ? "Too low" : "Too high";
  const proximity = getProximityMessage(diff, answerState.range);
  msg.textContent = `${getPlayerName()}, ${direction}. ${proximity} Try again.`;
}

function giveUp() {
  if (answerState.answer === 0 || answerState.range === 0) {
    msg.textContent = "No game in progress. Choose a level and click Play.";
    return;
  }

  const durationSeconds = Math.floor((Date.now() - answerState.startTime) / 1000);
  msg.textContent = `${getPlayerName()}, you gave up. The answer was ${answerState.answer}. Score set to ${answerState.range}.`;
  updateScore(answerState.range, durationSeconds);
  endRound();
}

function getProximityMessage(diff, range) {
  const hotThreshold = Math.max(1, Math.ceil(range * 0.05));
  const warmThreshold = Math.max(2, Math.ceil(range * 0.15));

  if (diff <= hotThreshold) {
    return "Hot!";
  }
  if (diff <= warmThreshold) {
    return "Warm.";
  }
  return "Cold.";
}

function updateScore(score, durationSeconds) {
  scoreHistory.push(score);
  timeHistory.push(durationSeconds);

  gamesCompleted.textContent = `Games Completed: ${scoreHistory.length}`;

  const totalScore = scoreHistory.reduce((sum, item) => sum + item, 0);
  avgScore.textContent = `Average Score: ${(totalScore / scoreHistory.length).toFixed(1)}`;

  const bestDuration = Math.min(...timeHistory);
  fastestTime.textContent = `Fastest Game: ${formatDuration(bestDuration)}`;

  const totalSeconds = timeHistory.reduce((sum, item) => sum + item, 0);
  const averageSeconds = Math.round(totalSeconds / timeHistory.length);
  avgTime.textContent = `Average Time: ${formatDuration(averageSeconds)}`;

  const sortedScores = [...scoreHistory].sort((a, b) => a - b);
  const lb = document.getElementsByName("leaderboard");
  for (let i = 0; i < lb.length; i++) {
    lb[i].textContent = i < sortedScores.length ? sortedScores[i] : "";
  }
}

function endRound() {
  stopRoundTimer();
  defaultReset("Select a Level");
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
  answerState.answer = 0;
  answerState.range = 0;
  answerState.guessCount = 0;
  answerState.startTime = 0;
  roundTimer.textContent = "Round Time: 00:00";
}
