// add javascript here
const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

document.getElementById('playBtn').addEventListener("click", play);
document.getElementById('guessBtn').addEventListener("click", makeGuess);


function play(){
    score = 0;
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;

    answer = Math.floor(Math.random()*level)+1;
    msg.innerHTML = "Guess a #1-" + level;
    guess.placeholder = answer;

}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess == ""){
        msg.innerHTML="Please enter a valid number";
        return;
    }
    score++;
    if(userGuess < answer)
        msg.innerHTML = "Too low, try again.";
    else if(userGuess > answer)
        msg.textContent = "Too high, try again.";
    else{
        msg.textConent = "Correct! It took " + guessCount + " tries.";
        scoreArr.push(score);
        updateScore();
        reset();
    }
}   

function updateScore(){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; // sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

scores.sort(function(a,b){return a-b;});

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textConent = scores[i];
        }
    }
}

function reset(){
    guess.disabled = true;
    guessBtn.disabled = true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length;i++)


}