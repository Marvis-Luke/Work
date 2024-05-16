const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.getElementById('start-container');
const resultContainer = document.getElementById('result-container');
const questionContainer = document.getElementById('question-container');
const timerDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let time = 1800; // 30 minutes in seconds
let timer;

const questions = [
    { question: 'What is the capital of France?', answers: [ { text: 'a) Berlin', correct: false }, { text: 'b) Madrid', correct: false }, { text: 'c) Paris', correct: true } ] },
    { question: 'What is 2 + 2?', answers: [ { text: 'a) 3', correct: false }, { text: 'b) 4', correct: true }, { text: 'c) 5', correct: false } ] },
    { question: 'What is the largest planet in our solar system?', answers: [ { text: 'a) Earth', correct: false }, { text: 'b) Jupiter', correct: true }, { text: 'c) Mars', correct: false } ] },
    { question: 'Who wrote "To Kill a Mockingbird"?', answers: [ { text: 'a) Harper Lee', correct: true }, { text: 'b) Mark Twain', correct: false }, { text: 'c) J.K. Rowling', correct: false } ] },
    { question: 'What is the smallest prime number?', answers: [ { text: 'a) 0', correct: false }, { text: 'b) 1', correct: false }, { text: 'c) 2', correct: true } ] },
    { question: 'What is the speed of light?', answers: [ { text: 'a) 299,792 km/s', correct: true }, { text: 'b) 150,000 km/s', correct: false }, { text: 'c) 1,080,000 km/s', correct: false } ] },
    { question: 'Who painted the Mona Lisa?', answers: [ { text: 'a) Vincent van Gogh', correct: false }, { text: 'b) Pablo Picasso', correct: false }, { text: 'c) Leonardo da Vinci', correct: true } ] },
    { question: 'What is the chemical symbol for water?', answers: [ { text: 'a) H2O', correct: true }, { text: 'b) CO2', correct: false }, { text: 'c) O2', correct: false } ] },
    { question: 'Which planet is known as the Red Planet?', answers: [ { text: 'a) Venus', correct: false }, { text: 'b) Mars', correct: true }, { text: 'c) Saturn', correct: false } ] },
    { question: 'What is the hardest natural substance on Earth?', answers: [ { text: 'a) Gold', correct: false }, { text: 'b) Iron', correct: false }, { text: 'c) Diamond', correct: true } ] },
    { question: 'Who developed the theory of relativity?', answers: [ { text: 'a) Isaac Newton', correct: false }, { text: 'b) Albert Einstein', correct: true }, { text: 'c) Galileo Galilei', correct: false } ] },
    { question: 'What is the capital of Japan?', answers: [ { text: 'a) Beijing', correct: false }, { text: 'b) Seoul', correct: false }, { text: 'c) Tokyo', correct: true } ] },
    { question: 'What is the largest ocean on Earth?', answers: [ { text: 'a) Atlantic Ocean', correct: false }, { text: 'b) Indian Ocean', correct: false }, { text: 'c) Pacific Ocean', correct: true } ] },
    { question: 'Who wrote "Pride and Prejudice"?', answers: [ { text: 'a) Charles Dickens', correct: false }, { text: 'b) Jane Austen', correct: true }, { text: 'c) William Shakespeare', correct: false } ] },
    { question: 'What is the tallest mountain in the world?', answers: [ { text: 'a) K2', correct: false }, { text: 'b) Kangchenjunga', correct: false }, { text: 'c) Mount Everest', correct: true } ] }
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    time = 1800; // Reset to 30 minutes in seconds
    startTimer();
    setNextQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        updateTimerDisplay();
        if (time <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionElement = document.createElement('div');
    questionElement.innerText = question.question;
    questionContainer.appendChild(questionElement);

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        questionContainer.appendChild(button);
    });
}

function resetState() {
    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
    }
    nextBtn.classList.add('hide');
}

function selectAnswer(button, correct) {
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        clearInterval(timer);
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreDisplay.innerText = `${score}/${questions.length}`;
}
