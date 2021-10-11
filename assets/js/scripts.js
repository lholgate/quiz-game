// Define global variableslet scoreBox = document.querySelector("#score-value");
const startForm = document.getElementById("start-form");
const questionForm = document.getElementById("question-form");
const initialsForm = document.getElementById("initials-form");
const scoreForm = document.getElementById("score-form");
const initialBox = document.getElementById("initials");
const finalScore = document.getElementById("final-score");
const timerDisplay = document.getElementById("timer");
const timeDisplay = document.getElementById("timer-countdown");

let answerListItem = document.querySelector("#answers");
let questionItem = document.querySelector("#question");
let scoreBox = document.querySelector("#score-value");
let scoreList = document.querySelector("#top-scores");
let newScore = [];
  


let currentScore = 0;
let timeRemaining = 60;
let highScores = [];

//Code for timer
//  start timer - Done
//  display timer remianing on screen span - timer_coutdown - Done
function startTimer() {
    
    intervalID = setInterval(function () {
      timeRemaining--;
  
      timeDisplay.innerText = timeRemaining + "s";
  
      if (timeRemaining <= 0) {
        stopTimer();
      }
      else if (timeRemaining < 10) {
        timerDisplay.style.background = "red";
        timerDisplay.classList.add("blink");
      }
      else if (timeRemaining < 30)  {
        timerDisplay.style.background = "yellow";
      }
    }, 1000);
  }
  
function stopTimer() {
    clearInterval(intervalID);
    timerDisplay.classList.remove("blink");
    timerDisplay.style.background = "white";
    finalScore.innerHTML=currentScore;
    questionForm.style.display="none";
    initialsForm.style.display="flex";
  }


//Loading screen:
//Shows start message
//on-click event <start button> 
//      hide start form
//      show question form
//      start timer

document.getElementById("btn-start").addEventListener("click", function(e){
    startForm.style.display="none";
    questionForm.style.display="flex";
    initialsForm.style.display="none";
    scoreForm.style.display="none";
    currentScore = 0;
    timeRemaining = 60;
    timerDisplay.style.background = "green";
    startTimer();
    loadQuestion();
});

//Question form
//  generate random number from 0 to length of question array - Done
//  retrieve questions from array - Done
//  set p-question values to question - Done
//  dynamically generate ol for answers for questions (mark data element true/false for each answer) - Done
//  listen for slick event on each li in ol object -Done
//  use hover to change color of answers background - Done
//  on click: -Done
//      check data element on clicked object -Done
//          if true: display "CORRECT" message, increment score by 2, move to next question -DOne
//          if false: display "INCORRECT" message, decrement score by 1, remove 5 seconds from timer, move to next question
//  continue until timer = 0
//  hide question form
//  show score form

var createAnswerList = function(answerList) {
    answerListItem.innerHTML = "";

    for (let i = 0; i < answerList.length; i++) {
   
        var questionAnswer = document.createElement("li");
        questionAnswer.className = "answer";
        questionAnswer.id = "answerItem";
        questionAnswer.setAttribute("data-correct-answer", Object.values(answerList[i]));
        questionAnswer.textContent = Object.keys(answerList[i]);
    
        answerListItem.append(questionAnswer);

    }
}

var loadAnswers = function(){
    var answerList = questions[1].Answers;
    createAnswerList(answerList);
}

var loadQuestion = function(){

    let rndNumner = Math.floor(Math.random() * questions.length);

    questionItem.textContent = questions[rndNumner].Question;
    var answerList = questions[rndNumner].Answers;
    createAnswerList(answerList);
}

document.getElementById("answers").addEventListener("click", function(e){

    if (e.target.dataset.correctAnswer === "true") {
        currentScore = currentScore + 2;
        scoreBox.innerHTML=currentScore;
    }
    else {
        currentScore = currentScore - 1;
        scoreBox.innerHTML=currentScore;
        timeRemaining -= 5;
        timeDisplay.innerText = timeRemaining + "s";
    }

    loadQuestion();
});


//Score form
//  show final score in span - final_score
//  listen for click in save button - Done
//  verify initials are entered - Done 
//  save initials and score to local storage - Done
//  hide score form - Done
//  show score board - Done
document.getElementById("btn-save").addEventListener("click", function(){

    if (initialBox.value) {
        highScores = JSON.parse(localStorage.getItem('highScores'));
        newScore = {score:finalScore.innerText,initials:initialBox.value.toUpperCase()};
        if (highScores === null) {
            highScores = [];
        } 
            
        highScores.push(newScore);

        localStorage.setItem("highScores",JSON.stringify(highScores));
        loadScores();
        initialBox.value="";
    }
    else {
        alert("Please enter your Initials!");
    }
});

//Score Board
//  Retrieve values from local storage - Done
//  sort records by score descending - Done
//  dynamically build li values and write values to ol - Done
//  listen for click on close button - Done
//  close score board - Done
//  open start form - Done 

function loadScores(){
    startForm.style.display="none";
    questionForm.style.display="none";
    initialsForm.style.display="none";
    scoreForm.style.display="flex";
    localStorage.setItem("highScores",JSON.stringify(highScores));

    scoreList.innerHTML="";
    highScores = JSON.parse(localStorage.getItem('highScores'));

    highScores.sort((a, b) => b.score - a.score);

    for (let i = 0; i < highScores.length; i++) {
   
        var hScore = document.createElement("li");
        hScore.className = "score";
        hScore.textContent = highScores[i].initials + " " + highScores[i].score;
    
        scoreList.append(hScore);
    }
}

document.getElementById("score-board").addEventListener("click", function(){
    highScores = JSON.parse(localStorage.getItem('highScores'));
    if (highScores === null) {
        highScores = [];
    } 
    loadScores();
});

document.getElementById("btn-clear").addEventListener("click", function(){
    highScores = [];
    localStorage.setItem("highScores",JSON.stringify(highScores));
    loadScores();
});


document.getElementById("btn-close").addEventListener("click", function(){
    startForm.style.display="flex";
    questionForm.style.display="none";
    initialsForm.style.display="none";
    scoreForm.style.display="none";

});



