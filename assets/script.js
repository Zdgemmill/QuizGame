var bodyEl = document.body;
var headerEL = document.getElementsByName("header");
var buttonEl = document.getElementsByClassName("btn");
var startButtonEl = document.querySelector("#btn-start");
var questionEl = document.querySelector("#question");
var timerEl = document.querySelector(".time");

var questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Homie Took My Lunch", correct: false },
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "<h1>", correct: true },
            { text: "heading", correct: false },
            { text: "<h6>", correct: false },
            { text: "<head>", correct: false },
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<scripting>", correct: false },
            { text: "<script>", correct: true },
        ]
    },
    {
        question: "sHow do you create a function in JavaScript",
        answers: [
            { text: "function:myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "function = myFunction()", correct: false },
            { text: "def function myFunction()", correct: false },
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5", correct: false },
            { text: "if i  = 5 then", correct: false },
            { text: "if i ==5 then", correct: false },
            { text: "if (i==5)", correct: true },
        ]
    }
];


//need to add listener to start the quiz
startButtonEl.addEventListener("click", function (e) {
    for (var i = 0; i < headerEL.length; i++) {
        headerEL[i].style.display = "none";
        showQuestion();
    }
    countdown();
});


//need to create a function that will show questions one by one

function countdown() {
    var timeLeft = 30;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            // take to highscores

        }
    }, 1000);
}

function startQuiz() {

}


function showQuestion() {
    questionEl.innerHTML = questions[0].question;
    showAnswers();
}


function showAnswers() {

}
//needs to create an answer checker some how



