
var bodyEl = document.querySelector("body")
var quizSubjects = ['js', 'css', 'html']
var highScore = 'high-score'
var start = 'start'
var startOver = 'start-over'
var userInfo = {
    name: '',
    score: ''
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
    answer: document.querySelector('#final-answer')

}
var subject
var questions

// listening to the clicked event button and li 
// and navigeting between the views
bodyEl.addEventListener('click', viewHandler)
function viewHandler(event) {
    var ele = event.target
    var dataAttr
    questions = []
    subject = ''

    if (ele.matches('button')) {
        dataAttr = ele.getAttribute('data-btn')
        if (quizSubjects.includes(dataAttr)) {
            subject = dataAttr
            if (subject == quizSubjects[0]) {
                questions = jsQuestions
            }
            if (subject == quizSubjects[1]) {
                questions = cssQuestions
            }
            if (subject == quizSubjects[2]) {
                questions = htmlQuestions
            }
            displayView(views.start, true)
            displayView(views.welcome, false)
            nextQuestion()
        }
        else if (dataAttr === highScore) {
            displayView(views.highest, true)
            displayView(views.welcome, false)
            displayView(views.result, false)

        } else if (dataAttr === start) {
            displayView(views.start, false)
            displayView(views.quiz, true)
            nextQuestion()
        } else if (dataAttr === startOver) {
            displayView(views.result, false)
            displayView(views.highest, false)
            displayView(views.welcome, true)
        } else { return }
    }
    if (ele.matches('li')) {
        dataAttr = ele.getAttribute('data-multi-choice')
        displayView(views.quiz, false)
        displayView(views.result, true)
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

function nextQuestion() {
    if (answredQuestion.length < questions.length) {
        questionTemplate.question.textContent = questions[0].question
        questionTemplate.choice1.textContent = questions[0].a
        questionTemplate.choice2.textContent = questions[0].b
        questionTemplate.choice3.textContent = questions[0].c
        questionTemplate.choice4.textContent = questions[0].d
    } else {
        displayView(views.quiz, false)
        displayView(views.result, true)
    }
}