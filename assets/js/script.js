
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
    // console.log(quizzes)
    if (state == 'w') {

        localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
    if (state == 'r') {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
        questions = quizzes.questions
        userInfo = quizzes.userInfo
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


// Questions: Array of Javascript Object which each includes question, multiple choices, and correct answer 

var jsQuestions = [
    {
        question: "Which of the following is a valid way to declare a variable in JavaScript?",
        a: "var myVar = 10;",
        b: "let myVar = 10;",
        c: "const myVar = 10;",
        d: "All of the above",
        answer: "d",
        index: "1"
    },
    {
        question: "What is the result of the following expression: '5' + 3?",
        a: "8",
        b: "'53'",
        c: "5 + 3",
        d: "None of the above",
        answer: "b",
        index: "2"
    },
    {
        question: "Which of the following is not a primitive data type in JavaScript?",
        a: "Number",
        b: "String",
        c: "Boolean",
        d: "Object",
        answer: "d",
        index: "3"
    },
    {
        question: "Which of the following is not a looping structure in JavaScript?",
        a: "foreach loop",
        b: "while loop",
        c: "do-while loop",
        d: "for loop",
        answer: "a",
        index: "4"
    },
    {
        question: "What is the result of the following expression: 10 % 3?",
        a: "3",
        b: "1",
        c: "0",
        d: "10",
        answer: "b",
        index: "5"
    },
    {
        question: "Which of the following is a correct way to define a function in JavaScript?",
        a: "function myFunction() {}",
        b: "const myFunction = function() {}",
        c: "const myFunction = () => {}",
        d: "All of the above",
        answer: "d",
        index: "6"
    },
    {
        question: "What is the result of the following expression: 'Hello'.charAt(2)?",
        a: "'H'",
        b: "'e'",
        c: "'l'",
        d: "'l'",
        answer: "c",
        index: "7"
    },
    {
        question: "Which of the following is not a comparison operator in JavaScript?",
        a: "==",
        b: "===",
        c: "!=",
        d: "%",
        answer: "d",
        index: "8"
    },
    {
        question: "Which of the following is a correct way to create an array in JavaScript?",
        a: "let myArray = [1, 2, 3];",
        b: "let myArray = new Array(1, 2, 3);",
        c: "let myArray = Array.from([1, 2, 3]);",
        d: "All of the above",
        answer: "a",
        index: "9"
    },
    {
        question: "What is the result of the following expression: typeof undefined?",
        a: "'undefined'",
        b: "'null'",
        c: "'object'",
        d: "'number'",
        answer: "a",
        index: "10"
    }
]
var cssQuestions = [{
    question: "Which property is used to change the background color of an element?",
    a: "color",
    b: "background-color",
    c: "background",
    d: "text-color",
    answer: "b",
    index: "1"
}, {
    question: "Which property is used to change the font of an element?",
    a: "font-size",
    b: "text-font",
    c: "font-family",
    d: "font-style",
    answer: "c",
    index: "2"
}, {
    question: "Which property is used to add space between elements?",
    a: "margin",
    b: "padding",
    c: "border",
    d: "space",
    answer: "a",
    index: "3"
}, {
    question: "Which property is used to change the size of an element's border?",
    a: "border",
    b: "border-color",
    c: "border-width",
    d: "border-style",
    answer: "c",
    index: "4"
}, {
    question: "Which property is used to change the position of an element?",
    a: "position",
    b: "top",
    c: "left",
    d: "all of the above",
    answer: "d",
    index: "5"
}, {
    question: "Which property is used to change the text color of an element?",
    a: "color",
    b: "text-color",
    c: "background-color",
    d: "font-color",
    answer: "a",
    index: "6"
}, {
    question: "Which property is used to change the opacity of an element?",
    a: "color",
    b: "opacity",
    c: "visibility",
    d: "background",
    answer: "b",
    index: "7"
}, {
    question: "Which property is used to add rounded corners to an element?",
    a: "border-radius",
    b: "border-style",
    c: "border-width",
    d: "border-color",
    answer: "a",
    index: "8"
}, {
    question: "Which property is used to change the text alignment of an element?",
    a: "justify",
    b: "align",
    c: "text-align",
    d: "all of the above",
    answer: "c",
    index: "9"
}, {
    question: "Which property is used to add a shadow to an element?",
    a: "box-shadow",
    b: "text-shadow",
    c: "shadow",
    d: "element-shadow",
    answer: "a",
    index: "10"
}]
var htmlQuestions = [{
    question: "Which of the following is not a valid HTML tag?",
    a: "<div>",
    b: "<span>",
    c: "<body>",
    d: "<javascript>",
    answer: "d",
    index: "1"
}, {
    question: "Which of the following is the correct way to include an external CSS file in an HTML document?",
    a: "<link rel='stylesheet' href='style.css'>",
    b: "<style src='style.css'></style>",
    c: "<link href='style.css'>",
    d: "<style>style.css</style>",
    answer: "a",
    index: "2"
}, {
    question: "Which of the following is not a valid HTML attribute?",
    a: "class",
    b: "src",
    c: "value",
    d: "color",
    answer: "d",
    index: "3"
}, {
    question: "What does the HTML tag <br> do?",
    a: "It creates a new paragraph.",
    b: "It inserts a line break.",
    c: "It creates a horizontal rule.",
    d: "It creates a link.",
    answer: "b",
    index: "4"
}, {
    question: "Which of the following is the correct HTML tag for inserting an image?",
    a: "<picture src='image.jpg'>",
    b: "<image src='image.jpg'>",
    c: "<img src='image.jpg'>",
    d: "<img href='image.jpg'>",
    answer: "c",
    index: "5"
}, {
    question: "Which of the following is the correct HTML tag for creating a hyperlink?",
    a: "<a href='https://www.example.com'>example</a>",
    b: "<link href='https://www.example.com'>example</link>",
    c: "<url href='https://www.example.com'>example</url>",
    d: "<a src='https://www.example.com'>example</a>",
    answer: "a",
    index: "6"
}, {
    question: "What does the HTML tag <ol> do?",
    a: "It creates an ordered list.",
    b: "It creates an unordered list.",
    c: "It creates a definition list.",
    d: "It creates a navigation list.",
    answer: "a",
    index: "7"
}, {
    question: "What does the HTML tag <em> do?",
    a: "It creates a bold text.",
    b: "It creates a italic text.",
    c: "It creates a highlighted text.",
    d: "It creates a subscript text.",
    answer: "b",
    index: "8"
}, {
    question: "Which of the following is the correct HTML tag for creating a table?",
    a: "<table>",
    b: "<tab>",
    c: "<tr>",
    d: "<td>",
    answer: "a",
    index: "9"
}, {
    question: "Which of the following is the correct HTML tag for creating a form?",
    a: "<form>",
    b: "<input>",
    c: "<label>",
    d: "<button>",
    answer: "a",
    index: "10"
}]