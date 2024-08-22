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
        question: "¿Quién tiene mejór desarrollo de personaje?",
        answers: [
            { text: "Goku", correct: false },
            { text: "Saitama", correct: false },
            { text: "Naruto", correct: false },
            { text: "Gon", correct: true }
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
        question: "¿Cómo se llama el profesor de JS?",
        answers: [
            { text: "Roberto", correct: false },
            { text: "Daniel", correct: true },
            { text: "Lautaro", correct: false },
            { text: "Juan", correct: false }
        ]
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
            { text: "Nilo", correct: false },
            { text: "Amazonas", correct: true },
            { text: "Yangtsé", correct: false },
            { text: "Mississippi", correct: false }
        ]
    },
    {
        question: "¿Quién escribió 'Don Quijote de la Mancha'?",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Miguel de Cervantes", correct: true },
            { text: "Gabriel García Márquez", correct: false },
            { text: "Pablo Neruda", correct: false }
        ]
    },
    {
        question: "¿Qué elemento químico tiene el símbolo 'O'?",
        answers: [
            { text: "Oro", correct: false },
            { text: "Oxígeno", correct: true },
            { text: "Osmio", correct: false },
            { text: "Oxalato", correct: false }
        ]
    },
    {
        question: "¿En qué continente se encuentra Egipto?",
        answers: [
            { text: "Asia", correct: false },
            { text: "África", correct: true },
            { text: "Europa", correct: false },
            { text: "Oceanía", correct: false }
        ]
    },
    {
        question: "¿En qué año se lanzó League of legends?",
        answers: [
            {text: "2010", corrrect: false},
            {text: "2008", correct: false},
            {text: "2009", correct: true},
            {text: "2011", correct: false},
        ]
    },
    {
        question: "¿Cómo se llama la última película de Jurassic World",
        answers: [
            {text: "Jurassic World Mundo Caído", correct: false},
            {text: "Jurassic World ", correct: false},
            {text: "Jurassic World 4", correct: false},
            {text: "Jurassic World Dominion", correct: true},
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