
var bodyEl = document.querySelector("body")
var userName = document.querySelector('#user-name')
var userNameDisplay = document.querySelector('#user-name-display')
var ulEl = document.querySelector('#multi-choices')
var timerDisplay = document.querySelector("#timer")
var quizSubjects = ['js', 'css', 'html']
var HIGH_SCORE = 'high-score'
var START = 'start'
var START_OVER = 'start-over'
var NEXT = 'next'
var TOTAL_TIME = 50
var userInfo = {
    name: '',
    score: 0
}
var highestScore = document.querySelector('#highest-score')
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
// turn on and off, to display the views 
function displayView(view, option) {
    if (option) {
        view.setAttribute('style', 'display: block;')
    }
    else {
        view.setAttribute('style', 'display: none;')
    }
}
// inital the page: adding the questions
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
// handling uer name and its validation
function start(subject) {
    if (userName.value == '' || userName.value == null || userName.value == undefined || userName.value.length == 0) {
        state = false
        for (; !state;) {
            var tmp = prompt("Please enter your name, it is required to start!")
            if (tmp.length > 0) {
                state = true
            }
            userInfo.name = tmp
        }
    } else {
        userInfo.name = userName.value
    }
    quizLocalStorage("userInfo", userInfo, 'w')
    userNameDisplay.textContent = userInfo.name
    displayView(views.start, false)
    displayView(views.quiz, true)
    nextQuestion()
    setTime()
}
// back to welcom view to start again
function startOver(subject) {
    userInfo.name = ''
    userInfo.score = 0
    userName.textContent = ''
    userNameDisplay.textContent = ''
    displayView(views.result, false)
    displayView(views.highest, false)
    displayView(views.welcome, true)
}
// display the top 5 high score
function scoreHistory(subject) {
    displayView(views.highest, true)
    displayView(views.welcome, false)
    displayView(views.result, false)
    // quizLocalStorage("highScores", highScores, 'r')
    sortList()
    views.highest.children[1].innerHTML = ''
    var tag
    for (var i = 0; i < highScores.length; i++) {
        tag = document.createElement('li');
        tag.textContent = highScores[i].name + " : " + highScores[i].score
        views.highest.children[1].appendChild(tag)
        if (i > 3) { break }
    }
}
// handling wirte and read data to local srorage
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
// display the questions and handle the navigate between
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
        highScores.push(userInfo)
        quizLocalStorage("highScores", highScores, 'w')
        answredQuestion.length = 0
        sortList()
        console.log(highScores[0])
        highestScore.textContent = highScores[0].name + " : " + highScores[0].score
        TOTAL_TIME = 1
    }
}
// checking the state of question and manipulate the display
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
                    choiceLock(choice, questions[i].answer, currentEle.parentElement)
                }
            }
        }
        next.disabled = false
    }
}
// timer
function setTime() {

    var timerInterval = setInterval(function () {
        TOTAL_TIME--;
        timerDisplay.textContent = 'Time: ' + TOTAL_TIME + " seconds";

        if (TOTAL_TIME === 0) {
            clearInterval(timerInterval);
            displayView(views.quiz, false)
            displayView(views.result, true)
            TOTAL_TIME = 50
            timerDisplay.textContent = 'Time: ' + TOTAL_TIME + " seconds";
            highestScore.textContent = highScores[0].name + " : " + highScores[0].score
        }
    }, 1000);
}
// manipulate the display
function choiceLock(choice, correct, parentEle) {
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
    // parentEle.removeEventListener('click', viewHandler, true)
    // console.log(parentEle.children)
    // parentEle.removeEventListener("click", viewHandler, false);
}
// sort the high score
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
}


