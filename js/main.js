const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultElement = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "París", correct: true },
      { text: "Berlín", correct: false },
      { text: "Roma", correct: false },
    ],
  },
  {
    question: "¿Quién tiene mejor desarrollo de personaje?",
    answers: [
      { text: "Goku", correct: false },
      { text: "Saitama", correct: false },
      { text: "Naruto", correct: false },
      { text: "Gon", correct: true },
    ],
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answers: [
      { text: "Marte", correct: false },
      { text: "Júpiter", correct: true },
      { text: "Saturno", correct: false },
      { text: "Neptuno", correct: false },
    ],
  },
  {
    question: "¿Quién escribió 'Don Quijote de la Mancha'?",
    answers: [
      { text: "William Shakespeare", correct: false },
      { text: "Miguel de Cervantes", correct: true },
      { text: "Gabriel García Márquez", correct: false },
      { text: "Pablo Neruda", correct: false },
    ],
  },
];

localStorage.setItem('triviaQuestions', JSON.stringify(questions));

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");

  shuffledQuestions = JSON.parse(localStorage.getItem('triviaQuestions')).sort(() => Math.random() - 0.5);
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
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  resultElement.classList.add("hide");
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
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
  questionContainer.classList.add("hide");
  resultElement.classList.remove("hide");
  resultElement.innerText = `Juego terminado. Tu puntaje es: ${score} de ${shuffledQuestions.length}`;
  startButton.innerText = "Reiniciar Juego";
  startButton.classList.remove("hide");
  startButton.addEventListener("click", startGame);
}
