
var bodyEl = document.querySelector("body")
var quizSubjects = ['js', 'css', 'html']
var highScore = 'high-score'
var start = 'start'
var startOver = 'start-over'
var views = {
    welcome: document.querySelector('#welcome-view'),
    start: document.querySelector('#start-view'),
    quiz: document.querySelector('#quiz-view'),
    result: document.querySelector('#result-view'),
    highest: document.querySelector('#high-score-view')
}
var subject
var questions

// listening to the clicked event button and li 
bodyEl.addEventListener('click', function (event) {
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
        }
        else if (dataAttr === highScore) {
            displayView(views.highest, true)
            displayView(views.welcome, false)
            displayView(views.result, false)

        } else if (dataAttr === start) {
            displayView(views.start, false)
            displayView(views.quiz, true)
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
})

function displayView(view, option) {
    console.log(view)
    if (option) {
        view.setAttribute('style', 'display: block;')
    }
    else {
        view.setAttribute('style', 'display: none;')
    }

}