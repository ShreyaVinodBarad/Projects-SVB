const questions = [
    {
        question: "Which is the largest animal in the World?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the World?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            { text: "Yuri Gagarin", correct: false },
            { text: "Buzz Aldrin", correct: false },
            { text: "Michael Collins", correct: false },
            { text: "Neil Armstrong", correct: true }
        ]
    }
];
/*
👆
=> An array of objects where:
question = question text.
answers = an array of possible answers.
- Each answer has:
text: Answer option. 
correct: true if correct, else false.
*/
const questionAsked = document.getElementById("question");
const answersBtn = document.getElementById("answerButtons");
const nextBtn = document.getElementById("next-btn");
/*
👆
Stores references to HTML elements so we can update them.
*/
let currentQuestionIndex = 0;
let score = 0;
/*
👆
currentQuestionIndex → Tracks which question number we are on.
score → Tracks correct answers.
*/
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
/*
👆
- Resets variables to start fresh.
- Changes Next button text back to "Next".
- Calls showQuestion() to display the first question.
*/
function showQuestion() {
    // Displaying Question: 👇
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionAsked.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    nextBtn.style.display = "none";
    /*
    👆
    - Gets the current question from the array.
    - Displays question number + text.
    - Hides the Next button until the user answers.
    */
    // Displaying Answers for the Question: 👇
    btnForAnswer = "";
    let answerNo = 1;
    currentQuestion.answers.forEach(answer => {
        btnForAnswer += `<button type="button" class="btn btn-light w-100 my-1 text-start fs-5" onclick = "selectAnswer(this,${answer.correct})">
                    ${answerNo}. ${answer.text}
                </button>`
        answerNo++;
    })
    answersBtn.innerHTML = btnForAnswer;
    /*
    👆
    - Loops through each answer, creates an HTML button for it.
    - Uses onclick to call selectAnswer() when clicked.
    - Inserts all buttons into answersBtn.
    */
}
function selectAnswer(button, isCorrect) {
    let allBtns = document.querySelectorAll("#answerButtons button");
    if (isCorrect) {
        button.classList.remove("btn-light");
        button.classList.add("btn", "btn-success");
        allBtns.forEach(btn => btn.disabled = true);
        score++;
    }
    else {
        button.classList.remove("btn-light");
        button.classList.add("btn", "btn-danger");

        allBtns.forEach(btn => {
            if (btn.getAttribute("onclick").includes("true")) {
                btn.classList.remove("btn-light");
                btn.classList.add("btn", "btn-success");
            }
        });
        allBtns.forEach(btn => btn.disabled = true);
    }
    nextBtn.style.display = "block";
}
/*
👆
1) If correct:
- Turns the clicked button green (btn-success).
- Disables all other buttons.
- Increases score.
2) If wrong:
- Turns clicked button red (btn-danger).
- Finds the correct one and turns it green.
- Disables all buttons.
3) Shows the Next button after answering.
*/
function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
/*
👆
Moves to the next question or shows the final score.
*/

function showScore() {
    questionAsked.innerHTML = `Congrates! The score you secured is ${score} out of ${questions.length}!`;
    answersBtn.innerHTML = "";
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
/*
👆
- Shows final score.
- Clears the answer buttons.
- Changes Next button to "Play Again".
*/
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})
/*
👆
- If quiz not finished → go to next question.
- If quiz finished → restart the quiz.
*/
startQuiz();
/*
👆
- Runs the quiz when the page loads.
*/ 