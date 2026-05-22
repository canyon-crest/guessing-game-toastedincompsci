const levelArr = document.getElementsByName("level");
let level, answer, score, range;
const scoreArr = [];


const timeArr = []; 


const rawName = prompt("What is your name?");
const playerName = rawName 
  ? rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase() 
  : "Player";


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);


document.getElementById("date").innerHTML = time();
setInterval(function() {
  document.getElementById("date").innerHTML = time();
}, 1000);

let startTime; 

function time() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const seconds = date.getSeconds();
  
  let suffix = 'th';
  if (day < 11 || day > 13) {
    switch (day % 10) {
      case 1: suffix = 'st'; break;
      case 2: suffix = 'nd'; break;
      case 3: suffix = 'rd'; break;
    }
  }
  return `${month} ${day}${suffix}, ${year} ${seconds}s`;
}

function play() {
  score = 0;
  for (let i = 0; i < levelArr.length; i++) {
    if (levelArr[i].checked) {
      range = levelArr[i].value;
    }
    levelArr[i].disabled = true;
  }
  playBtn.disabled = true;
  guess.disabled = false;
  guessBtn.disabled = false;
  giveUpBtn.disabled = false;

  answer = Math.floor(Math.random() * range) + 1;
  

  startTime = new Date().getTime();

  msg.innerHTML = playerName + ", guess a number 1 through " + range;
  guess.placeholder = answer;
}

function makeGuess() {
  let userGuess = parseInt(guess.value);

  if (isNaN(userGuess) || guess.value === "") {
    msg.innerHTML = "Invalid guess, a number 1 through " + range;
    return;
  }

  score++;

  if (userGuess === answer) {
    msg.innerHTML = "Correct! You win, " + playerName + ". It took " + score + " tries.";
    
    const endMs = new Date().getTime();
    updateTimers(endMs);

    scoreArr.push(score);
    updateScore();
    reset();
    return;
  }

  let diff = Math.abs(userGuess - answer);
  let tempMessage = "";

  if (diff <= 2) {
    tempMessage = "You're hot! ";
  } else if (diff <= 5) {
    tempMessage = "You're warm. ";
  } else {
    tempMessage = "You're cold. ";
  }

 
  if (userGuess < answer) {
    msg.innerHTML = tempMessage + "Too low, guess a number 1 through " + range;
  } else if (userGuess > answer) {
    msg.innerHTML = tempMessage + "Too high, guess a number 1 through " + range;
  }
}


function updateTimers(endMs) {
  const elapsedSeconds = (endMs - startTime) / 1000;
  timeArr.push(elapsedSeconds);


  const fastestTime = Math.min(...timeArr);
  document.getElementById("fastest").innerHTML = fastestTime.toFixed(2);

  let totalTime = 0;
  for (let i = 0; i < timeArr.length; i++) {
    totalTime += timeArr[i];
  }
  const avgRoundTime = totalTime / timeArr.length;
  document.getElementById("avgTime").innerHTML = avgRoundTime.toFixed(2);
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
  if (!answer || !range) {
    msg.innerHTML = "No game in progress. Choose a level and click Play.";
    return;
  }

  msg.innerHTML = "You gave up. The answer was " + answer + ".";
  
  
  const endMs = new Date().getTime();
  updateTimers(endMs);

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
