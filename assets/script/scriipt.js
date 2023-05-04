// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// collect and defind the selected criteria by user
function criteriaSelector() {
    // list of Criteria to ask
    var questions = [
        "Please enter the length of the password!\nMust be a number, 8 is a min and 128 max128 .",
        "Do you want Lowercase character in password?",
        "How about the Uppercase?",
        "is there any number in you password?",
        "Special charater makes it stronger, do you want it?"
    ]
    var criteria = []
    var userInput = ""
    var inValidCriteria = true
    var inValidLength = true
    // collect, evaluate and store the user input 
    for (; inValidCriteria;) {
        // store the length
        for (; inValidLength;) {
            userInput = prompt(questions[0])
            if (!isNaN(userInput) && (userInput > 7 && userInput <= 128)) {
                criteria[0] = userInput
                inValidLength = false
            }
        }
        // store user input "Criteras"
        for (var i = 1; i < questions.length; i++) {
            criteria[i] = confirm(questions[i])
        }
        if (criteria.includes(true)) {
            inValidCriteria = false
        } else {
            confirm("You should choose at least one of the Critera, Le's do it again!")
        }
    }
    return criteria
}

// Password generator
function generatePassword() {
    var userinput = criteriaSelector()
    var len = userinput[0]
    var criteria = []
    var usedCriteria = []
    var randomCriteria
    var randomChar
    var passwordArray = []
    // defind the criteria
    if (userinput[1]) { criteria.push('l') }
    if (userinput[2]) { criteria.push('u') }
    if (userinput[3]) { criteria.push('n') }
    if (userinput[4]) { criteria.push('s') }

    // Generate the password
    for (var i = 0; i <= len; i++) {
        randomCriteria = randomCharacter(criteria.length, "none")
        // kepp travking of applied criteria
        if (!usedCriteria.includes(criteria[randomCriteria])) {
            usedCriteria.push(criteria[randomCriteria])
        }
        // checking for all criteria to apply at least once
        if (criteria.length === i && usedCriteria.length < criteria.length) {
            for (var i = 0; i < criteria.length; i++) {
                if (!usedCriteria.includes(criteria[i])) {
                    randomCriteria = i
                    usedCriteria.push(criteria[i])
                }
            }
        }
        randomChar = randomCharacter(0, criteria[randomCriteria])
        passwordArray.push(randomChar)
    }
    return passwordArray.join("")
}

// Random Character maker
function randomCharacter(num, option) {
    var max = num
    var randomNum = 0
    var specialChar = ["~", "!", "@", "#", "$", "%", "&", "*", "(", ")",
        "_", "-", "+", "<", ">", "?", "/", "\\", "{", "}", "[", "]"]

    if (option == "none") {
        return Math.floor(Math.random() * max)
    }
    // lowercase char
    if (option == "l") {
        max = 25
        randomNum = Math.floor(Math.random() * max)
        randomNum += 97
        return String.fromCharCode(randomNum)
    }
    // uppercase char
    if (option == "u") {
        max = 25
        randomNum = Math.floor(Math.random() * max)
        randomNum += 65
        return String.fromCharCode(randomNum)
    }
    // number
    if (option == "n") {
        max = 9
        randomNum = Math.floor(Math.random() * max)
        randomNum += 48
        return String.fromCharCode(randomNum)
    }
    // special char
    if (option == "s") {
        max = specialChar.length
        randomNum = Math.floor(Math.random() * max)
        return specialChar[randomNum]
    }
}

