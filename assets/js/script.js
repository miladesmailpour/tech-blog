
var bodyEl = document.querySelector("body")
var userName = document.querySelector('#user-name')
var userNameDisplay = document.querySelector('#user-name-display')
var ulEl = document.querySelector('#multi-choices')
var quizSubjects = ['js', 'css', 'html']
var HIGH_SCORE = 'high-score'
var START = 'start'
var START_OVER = 'start-over'
var NEXT = 'next'
var userInfo = {
    name: '',
    score: 0
}
var highScores = []
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
    index: mChoice.children[4]
}
var next = document.querySelector('#next-question')
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
            scoreHistory(dataAttr)

        } else if (dataAttr === START) {
            start(dataAttr)

        } else if (dataAttr === START_OVER) {
            startOver(dataAttr)
        } else if (dataAttr === NEXT) {
            nextQuestion()
        } else { return }
    }
    if (ele.matches('li')) {

        selectorHandler(ele)
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
    // console.log('inital' + questions)
    // console.log('inital' + jsQuestions[0])
    quizLocalStorage("questions", questions, 'w')

    displayView(views.start, true)
    displayView(views.welcome, false)
}

function start(subject) {
    userInfo.name = userName.value
    state = false
    for (; !state;) {
        var tmp = prompt("Please enter your name, it is required to start!")
        if (tmp.length > 0) {
            state = true
        }
        userInfo.name = tmp
    }
    quizLocalStorage("userInfo", userInfo, 'w')
    userNameDisplay.textContent = userInfo.name
    displayView(views.start, false)
    displayView(views.quiz, true)
    nextQuestion()
}

function startOver(subject) {
    userInfo.name = ''
    userInfo.score = 0
    displayView(views.result, false)
    displayView(views.highest, false)
    displayView(views.welcome, true)
}

function scoreHistory(subject) {
    displayView(views.highest, true)
    displayView(views.welcome, false)
    displayView(views.result, false)
    quizLocalStorage("highScores", highScores, 'r')
    sortList()
    views.highest.children[1].innerHTML = ''
    var tag
    for (var i = 0; i < 5; i++) {
        tag = document.createElement('li');
        tag.textContent = highScores[i].name + " : " + highScores[i].score
        views.highest.children[1].appendChild(tag)
    }
}

function quizLocalStorage(name, store, state) {
    var quizzes = JSON.parse(localStorage.getItem('quizzes'))
    if (quizzes == null) {
        quizzes = { questions: [], userInfo: {}, highScores: [] }
    }
    quizzes[name] = store
    // console.log(quizzes)
    if (state == 'w') {

        localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
    if (state == 'r') {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
        if (quizzes != null) {
            questions = quizzes.questions
            userInfo = quizzes.userInfo
            highScores = quizzes.highScores
        }
    }
    else { return }

}

function nextQuestion() {
    next.disabled = true
    for (var i = 0; i < 4; i++) {
        views.quiz.children[1].children[i].setAttribute("style", "background-color: var(--font-dark); color: var(--font-light);")
    }


    quizLocalStorage("questions", questions, 'r')
    if (questions === null) {
        return
    }
    // console.log(answredQuestion.length, questions.length)

    if (answredQuestion.length < questions.length) {
        var currentQuestion = questions[answredQuestion.length]
        answredQuestion.push(questions[answredQuestion.length])

        questionTemplate.question.textContent = currentQuestion.question
        questionTemplate.choice1.textContent = currentQuestion.a
        questionTemplate.choice2.textContent = currentQuestion.b
        questionTemplate.choice3.textContent = currentQuestion.c
        questionTemplate.choice4.textContent = currentQuestion.d
        questionTemplate.index.textContent = currentQuestion.index
    }
    else {
        displayView(views.quiz, false)
        displayView(views.result, true)

        views.result.children[1].textContent = userInfo.name + ": " + userInfo.score
        console.log(highScores)
        highScores.push(userInfo)
        quizLocalStorage("highScores", highScores, 'w')
        console.log(highScores)
        answredQuestion.length = 0
    }
}

function selectorHandler(currentEle) {

    var choice = currentEle.dataset.multiChoice
    var index = currentEle.parentElement.lastElementChild.dataset.multiChoice

    quizLocalStorage("questions", questions, 'r')

    // console.log("+" + choice, index, questions)
    if (index = 'index') {
        index = currentEle.parentElement.lastElementChild.textContent
        // console.log(index)
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].index == index) {
                if (choice == questions[i].answer) {
                    // console.log("correct " + choice, questions[i].answer)
                    quizLocalStorage("userInfo", userInfo, 'r')
                    userInfo.score++
                    quizLocalStorage("userInfo", userInfo, 'w')
                    // console.log(userInfo)
                    choiceLock(choice, questions[i].answer)
                }
                else {
                    // console.log("wrong " + choice, questions[i].answer)
                    choiceLock(choice, questions[i].answer)
                }
            }
        }
        next.disabled = false

    }

}

function choiceLock(choice, correct) {
    // console.log(choice, correct)
    if (correct != choice) {
        for (var i = 0; i < 4; i++) {
            if (views.quiz.children[1].children[i].getAttribute('data-multi-choice') == correct) {
                views.quiz.children[1].children[i].setAttribute("style", "background-color: green;")
            }
            else if (views.quiz.children[1].children[i].getAttribute('data-multi-choice') == choice) {
                views.quiz.children[1].children[i].setAttribute("style", "background-color: red;")
            }
            else {
                views.quiz.children[1].children[i].setAttribute("style", "background-color: grey; color: var(--font-light);")
            }
        }
    } else {
        for (var i = 0; i < 4; i++) {
            if (views.quiz.children[1].children[i].getAttribute('data-multi-choice') == correct) {
                views.quiz.children[1].children[i].setAttribute("style", "background-color: green;")
            }
            else {
                views.quiz.children[1].children[i].setAttribute("style", "background-color: grey; color: var(--font-light);")
            }
        }
    }

}
function sortList() {
    highScores.sort(function (a, b) {
        var first = parseInt(a.score)
        var second = parseInt(b.score)
        if (first > second) {
            return -1;
        }
        if (first < second) {
            return 1;
        }
        return 0;
    });
    console.log(highScores)
}

