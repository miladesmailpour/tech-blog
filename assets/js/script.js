
var bodyEl = document.querySelector("body")
var userName = document.querySelector('#user-name')
var userNameDisplay = document.querySelector('#user-name-display')
var quizSubjects = ['js', 'css', 'html']
var HIGH_SCORE = 'high-score'
var START = 'start'
var START_OVER = 'start-over'
var NEXT = 'next'
var userInfo = {
    name: '',
    score: 0
}
var mChoice = document.querySelector('#multi-choices')
var views = {
    welcome: document.querySelector('#welcome-view'),
    start: document.querySelector('#start-view'),
    quiz: document.querySelector('#quiz-view'),
    result: document.querySelector('#result-view'),
    highest: document.querySelector('#high-score-view')
}
var answredQuestion = []
var questionTemplate = {
    question: document.querySelector('#question'),
    choice1: mChoice.children[0],
    choice2: mChoice.children[1],
    choice3: mChoice.children[2],
    choice4: mChoice.children[3],

}

var questions

// listening to the clicked event button and li 
// and navigeting between the views
bodyEl.addEventListener('click', viewHandler)
function viewHandler(event) {
    event.preventDefault();
    var ele = event.target
    var dataAttr
    questions = []

    if (ele.matches('button')) {
        dataAttr = ele.getAttribute('data-btn')
        if (quizSubjects.includes(dataAttr)) {
            inital(dataAttr)

        }
        else if (dataAttr === HIGH_SCORE) {
            displayView(views.highest, true)
            displayView(views.welcome, false)
            displayView(views.result, false)

        } else if (dataAttr === START) {
            start(dataAttr)

        } else if (dataAttr === START_OVER) {
            startOver(dataAttr)
        } else if (dataAttr === NEXT) {
            nextQuestion()
        } else { return }
    }
    if (ele.matches('li')) {
        dataAttr = ele.getAttribute('data-multi-choice')
        console.log(dataAttr, questions)
        quizLocalStorage("questions", questions, 'r')
        console.log(dataAttr, questions)

    }
}

function displayView(view, option) {
    if (option) {
        view.setAttribute('style', 'display: block;')
    }
    else {
        view.setAttribute('style', 'display: none;')
    }
}

function inital(subject) {
    if (subject == quizSubjects[0]) {
        questions = jsQuestions
    }
    if (subject == quizSubjects[1]) {
        questions = cssQuestions
    }
    if (subject == quizSubjects[2]) {
        questions = htmlQuestions
    }
    quizLocalStorage("questions", questions, 'w')

    displayView(views.start, true)
    displayView(views.welcome, false)
}

function start(subject) {
    userInfo.name = userName.value
    quizLocalStorage("userInfo", userInfo, 'w')
    userNameDisplay.textContent = userInfo.name
    displayView(views.start, false)
    displayView(views.quiz, true)
    nextQuestion()
}

function startOver(subject) {
    displayView(views.result, false)
    displayView(views.highest, false)
    displayView(views.welcome, true)
}

function quizLocalStorage(name, store, state) {
    var quizzes = JSON.parse(localStorage.getItem('quizzes'))
    quizzes[name] = store
    console.log(quizzes)
    if (state == 'w') {

        localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
    if (state == 'r') {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
        questions = quizzes.questions
    }
    else { return }

}

function nextQuestion() {
    quizLocalStorage("questions", questions, 'r')
    if (questions === null) {
        return
    }
    console.log(answredQuestion.length, questions.length)
    if (answredQuestion.length < questions.length) {
        var currentQuestion = questions[answredQuestion.length]
        answredQuestion.push(questions[answredQuestion.length])

        questionTemplate.question.textContent = currentQuestion.question
        questionTemplate.choice1.textContent = currentQuestion.a
        questionTemplate.choice2.textContent = currentQuestion.b
        questionTemplate.choice3.textContent = currentQuestion.c
        questionTemplate.choice4.textContent = currentQuestion.d
    }
    else {
        displayView(views.quiz, false)
        displayView(views.result, true)
        answredQuestion.length = 0
    }
}