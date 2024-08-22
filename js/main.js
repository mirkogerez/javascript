const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        answers: [
            { text: "Madrid", correct: false },
            { text: "París", correct: true },
            { text: "Berlín", correct: false },
            { text: "Roma", correct: false }
        ]
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: [
            { text: "Marte", correct: false },
            { text: "Júpiter", correct: true },
            { text: "Saturno", correct: false },
            { text: "Neptuno", correct: false }
        ]
    },
    {
        question: "¿En qué año llegó el hombre a la luna?",
        answers: [
            { text: "1965", correct: false },
            { text: "1969", correct: true },
            { text: "1971", correct: false },
            { text: "1967", correct: false }
        ]
    }
];
startButton.addEventListener('click', startGame);
function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    resultElement.classList.add('hide');
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}
function endGame() {
    questionContainer.classList.add('hide');
    resultElement.classList.remove('hide');
    resultElement.innerText = `Juego terminado. Tu puntaje es: ${score} de ${questions.length}`;
    startButton.innerText = 'Reiniciar Juego';
    startButton.classList.remove('hide');
}