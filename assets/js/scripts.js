// Define global variableslet scoreBox = document.querySelector("#score-value");
let startForm = document.getElementById("start-form");
let questionForm = document.getElementById("question-form");
let initialsForm = document.getElementById("initials-form");
let scoreForm = document.getElementById("score-form");

let answerListItem = document.querySelector("#answers");
let questionItem = document.querySelector("#question");
let scoreBox = document.querySelector("#score-value");

let currentScore = 0;
let highScores = {};

//Code for timer
//  start timer
//  display timer remianing on screen span - timer_coutdown


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
    }

    loadQuestion();
});




// document.getElementsByClassName("answer").addEventListener("click", function(){
//     console.log(this);
// });

//Score form
//  show final score in span - final_score
//  listen for click in save button
//  verify initials are entered
//  save initials and score to local storage
//  hide score form
//  show score board


//Score Board
//  Retrieve values from local storage
//  sort records by score descending
//  dynamically build li values and write values to ol
//  listen for click on close button
//  close score board
//  open start form

document.getElementById("score-board").addEventListener("click", function(){
    startForm.style.display="none";
    questionForm.style.display="none";
    initialsForm.style.display="none";
    scoreForm.style.display="flex";

});

document.getElementById("btn-close").addEventListener("click", function(){
    startForm.style.display="flex";
    questionForm.style.display="none";
    initialsForm.style.display="none";
    scoreForm.style.display="none";

});



