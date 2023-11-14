var bodyEl = document.body;
var headerEL = document.getElementsByName("header");
var buttonEl = document.getElementsByClassName("btn");
var startButtonEl = document.querySelector("#btn-start");
var questionEl = document.querySelector("#question");
var timerEl = document.querySelector(".time");
var button = document.querySelector("#buttons");
var msgEl = document.querySelector(".msg");
var form = document.getElementsByClassName("form");


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
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else if (timeLeft == -50) {
            timerEl.textContent = '';
            clearInterval(timeInterval);

        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            endGame();
            // Needs to be taken to prompt to enter score. 
        }
    }, 1000);
}


//function for showing first question and answers
function showQuestion() {
    // Clear existing buttons
    button.innerHTML = '';
    if (currentQuestionI > questions.length) {
        return
    };
    var currentQuestion = questions[currentQuestionI];
    questionEl.innerHTML = currentQuestion.question;
    //this is creating my button elements and appending them to the buttons div as child emelents 
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

//my function for checking if the user selected answer is the correct answer. If so do something with the time. show correct message when answer is selected
function checkAnswer(selectedButton) {
    var selectedAnswerText = selectedButton.innerText;
    var correctAnswerText = getCurrentQuestionCorrectAnswer();

    if (selectedAnswerText === correctAnswerText) {
        timeLeft += 10;
        userScore += 10;
        msgEl.classList.add("msg");
        msgEl.innerHTML = "Correct!";
    } else {
        timeLeft -= 10;
        msgEl.innerHTML = "Incorrect!";
    }
    currentQuestionI++;

    if (currentQuestionI < questions.length) {
        showQuestion();
    } else {
        timeLeft = -50;
        endGame();
        // show the user's score and ask for their initials
    }
}
//this function is getting the correct answer for the current question 
function getCurrentQuestionCorrectAnswer() {
    var currentQuestion = questions[currentQuestionI];
    // Correctly find the correct answer text
    var correctAnswerText = currentQuestion.answers.find(answer => answer.correct).text;
    return correctAnswerText;
}

// Short circuiting: LOOK THIS UP
var highScoresList = JSON.parse(localStorage.getItem('highscores')) || []

function addHighScores(userInfo) {
    highScoresList.push(userInfo);
    localStorage.setItem('highscores', JSON.stringify(highScoresList))
}

function redirect() {
    window.location.href = "./highscores.html";
}

function displayHighScores() {
    var displayedScores = document.createElement("h2");
    if (highScoresList.length == 0) {
        highscoresSection.innerHTML = "No socres yet.";
        console.log(highScoresList);
        console.log(highscoresSection);
        displayedScores.innerHTML = "this is a test";
    }

}

function endGame() {
    var intialsForm = document.createElement("form");
    var initialLable = document.createElement("label");
    var initialInput = document.createElement("input");
    var initialSubmit = document.createElement("input");
    initialSubmit.setAttribute("type", "submit");
    initialSubmit.setAttribute("value", "submit");
    initialInput.setAttribute("placeholder", "Initials")
    initialLable.innerHTML = "Enter initials here: ";
    initialSubmit.innerHTML = "Submit";
    initialSubmit.addEventListener("click", function (event) {
        event.preventDefault();

        addHighScores({ initials: initialInput.value, score: userScore });
        redirect();


    });
    intialsForm.append(initialLable);
    intialsForm.append(initialInput);
    intialsForm.append(initialSubmit);
    intialsForm.classList.add("form");

    questionEl.innerHTML = "You scored a " + userScore + "."
    button.innerHTML = "";
    msgEl.innerHTML = "";
    bodyEl.appendChild(intialsForm);


};

