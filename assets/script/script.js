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
    //l ist of Criteria to ask
    var questions = [
        "Please enter the length of the password!",
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
            if (!isNaN(userInput) && userInput > 0) {
                criteria[0] = userInput
                inValidLength = false
            }
        }
        // store user input "Criteras"
        for (var i = 1; i < questions.length; i++) {
            criteria[i] = confirm(questions[i])
            console.log(criteria[i])
        }
        console.log(criteria[i])
        if (criteria.includes(true)) {
            inValidCriteria = false
        } else {
            confirm("You should choose at least one of the Critera, Le's do it again!")
        }
    }
    return criteria
}

console.log(criteriaSelector())