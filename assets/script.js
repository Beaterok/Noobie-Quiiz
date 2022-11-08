/*GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score */

var GameStart = document.querySelector("#start-game");
var timeEl = document.querySelector("#countdown");
var Choices = document.querySelector("#Choices");
var Question = document.querySelector("#Questions");
var Correct = document.querySelector('#ifCorrect')
var timerInterval;

var secondsLeft = 50;
var index = 0; 

var questions = [
    {
        question: "What is a header element?",
        choices: ["<h>", "<p>", "<header>", "<head>"],
        answer: "<header>",
    },
    {
        question: "What is paragraph element?",
        choices: ["<h>", "<p>", "<header>", "<head>"],
        answer: "<p>",
    },
    {
        question: "What method is used to find random number in js?",
        choices: [".random", ".floor", ".rand", ".number"],
        answer: ".random",
    },
    {
        question: "How do you make css styling object for id card?",
        choices: ["card{}", ".card{}", "#card{}", "div{}"],
        answer: "#card{}",
    },
    {
        question: "How do you access an object inside the array",
        choices: ["arr{obj}", "arr[obj]", "arr(obj)", "arr.obj"],
        answer: "arr[obj]",
    }
];

var qst = questions[index];

var allStats = [];

var stats = {
    name: "",
    correct: 0,
    score: 50
};


//starts the quiz 
var startGame = function () {
    document.getElementById("Initial-screen").remove();
    startTimer();
    getQuestions();
};
// timer
var startTimer = function () {

    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left.";

        if (secondsLeft === 0 || index == questions.length - 1) {
            // Stops execution of action at set interval

            clearInterval(timerInterval);

        }

    }, 1000);

};
// creates first question and choices 
var getQuestions = function () {


    console.log("getQuestions()");
    //displays a Question on HTML screen
    Question.textContent = questions[index].question;

    for (let i = 0; i < questions[index].choices.length; i++) {

        var btn = document.createElement('button');
        btn.setAttribute('id', 'new-btn')
        btn.textContent = qst.choices[i];
        Choices.appendChild(btn);
        onClick(btn);

    }

};
// on click of the answer buttons adds index, score, time and tells if there's more questions or not
var onClick = function (event) {


    event.addEventListener("click", function (event) {
        var onClick = event.target;
        index++;
        if (index == questions.length) {
            nextQuestion();
            Question.textContent = "You are all done with the quiz! Please enter your name to save your score!"
            var nameInput = document.createElement('input');
            var btn = document.createElement('button');
            btn.textContent= "Submit"
            Question.appendChild(nameInput);
            Question.appendChild(btn);
            submitName(btn);
            Correct.textContent = "";
        } else {
            if (onClick.textContent == qst.answer) {
                console.log("correct!");
                stats.correct++;
                Correct.textContent = "Correct!"

                nextQuestion();
            } else {
                console.log("incorrect!");
                Correct.textContent = "Incorrect!"
                secondsLeft = secondsLeft - 10;
                nextQuestion();
            }
        }
    });
}


//removes old buttons and creates new buttons with new question 
var nextQuestion = function () {

    qst = questions[index];
    for (let i = 0; i < questions[index - 1].choices.length; i++) {

        var old = document.getElementById('new-btn');
        old.remove();
        console.log("removed");
    }
    if (index < questions.length){
    Question.textContent = questions[index].question;
    for (let i = 0; i < questions[index].choices.length; i++) {

        var btn = document.createElement('button');
        btn.setAttribute('id', 'new-btn')
        btn.textContent = qst.choices[i];
        Choices.appendChild(btn);
        onClick(btn);
        console.log("created");
    }
}
}

// saves name and score into local storage
var submitName = function(event){
    disScores();
    event.addEventListener("click", function () {
    var nameInput = document.querySelector('input');
    stats.name = nameInput.value;
    console.log(stats.name);
    stats.score = secondsLeft;
    allStats.push(stats);
    localStorage.setItem("stats", JSON.stringify(allStats));
    window.localStorage.setItem("stats", JSON.stringify(allStats));
    var btn =document.querySelector('button');
    btn.remove();
    var btn = document.createElement('button');
    Question.textContent = "View the Score board!";
    btn.textContent = "View";
    Choices.appendChild(btn);
    viewScore(btn);
    disScores();
    });
    
}

//displays score in a popup window
var viewScore = function (event){
    console.log("ScoreBoard");
    event.addEventListener('click', function(){
    let newObject = window.localStorage.getItem("stats");
    var stat = JSON.parse(newObject);
    for (let i = 0; i < allStats.length; i++){

        window.alert("Name: "+ allStats[i].name + " \nCorrect: " + allStats[i].correct + " \nScore: " + allStats[i].score);
     
    }
    
   });
}
var disScores = function(){
    if (allStats !== null) {
        for (var i = 0; i < allStats.length; i++) {
            console.log("stats");
            var createLi = document.createElement("li");
            createLi.textContent = "Name: " + allStats[i].name + " Score: " + allStats[i].score;
            Correct.appendChild(createLi);
        }
    }
}


//function the starts the game on click of the button
GameStart.addEventListener("click", function () {
    startGame();
});
