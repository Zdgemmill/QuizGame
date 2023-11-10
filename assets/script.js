var bodyEl = document.body;
var headerEL = document.getElementsByName("header");
var buttonEl = document.getElementsByClassName("btn");
var startButtonEl = document.querySelector("#btn-start");
var questionEl = document.querySelector("#question");
var timerEl = document.querySelector(".time");
var button = document.querySelector("#buttons");
var msgEl = document.querySelector(".msg");

var userScore = 0;

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
            { text: "< h1 >", correct: true },
            { text: "heading", correct: false },
            { text: "< h6 >", correct: false },
            { text: "< head >", correct: false },
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "< js >", correct: false },
            { text: "< javascript >", correct: false },
            { text: "< scripting >", correct: false },
            { text: "< script >", correct: true },
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
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
    }
    showQuestion();
    countdown();
});


//need to create a function that will show questions one by one
var timeLeft = 30;
function countdown() {
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            // Needs to be taken to prompt to enter score. 
        }
    }, 1000);
}


//shows first question 
function showQuestion() {
    // Clear existing buttons
    button.innerHTML = '';

    var currentQuestion = questions[currentQuestionI];
    questionEl.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var answerButton = document.createElement("button");
        answerButton.innerHTML = answer.text;
        answerButton.classList.add("btn");
        button.appendChild(answerButton);

        // Add event listener to each button
        answerButton.addEventListener("click", function (e) {
            checkAnswer(e.target);
        });
    });
}
var currentQuestionI = 0;


function checkAnswer(selectedButton) {
    var selectedAnswerText = selectedButton.innerText;
    var correctAnswerText = getCurrentQuestionCorrectAnswer();

    console.log("Selected Answer: " + selectedAnswerText);
    console.log("Correct Answer: " + correctAnswerText);

    if (selectedAnswerText === correctAnswerText) {
        timeLeft += 10;
        userScore += 10;
        msgEl.innerHTML = "Correct!";
    } else {
        timeLeft -= 10;
        msgEl.innerHTML = "Incorrect!";
    }
    currentQuestionI++;

    if (currentQuestionI < questions.length) {
        showQuestion();
    } else {
        console.log("End of the quiz!");
        // show the user's score and ask for their initials
    }
}

function getCurrentQuestionCorrectAnswer() {
    var currentQuestion = questions[currentQuestionI];
    // Correctly find the correct answer text
    var correctAnswerText = currentQuestion.answers.find(answer => answer.correct).text;
    return correctAnswerText;
}

//needs to create an answer checker some how