const startBtn = document.getElementById("start-btn");
const rulesBox = document.querySelector(".rules-box");
const quizBox = document.querySelector(".quiz-box");
const startScreen = document.querySelector(".start-screen");
const exitBtn = document.getElementById("exit-btn");
const continueBtn = document.getElementById("continue-btn");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const timeText = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const questionCount = document.getElementById("question-count");

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;
let answered = false;

const questions = [
  { q: "What does CPU stand for?", a: ["Central Processing Unit", "Control Process Utility", "Computer Program Unit", "Central Power Unit"], correct: 0 },
  { q: "What is the full form of CSS?", a: ["Cascading Style Sheet", "Colorful Style Sheet", "Common Style Sheet", "Computer Style Sheet"], correct: 0 },
  { q: "What does HTML stand for?", a: ["Hypertext Markup Language", "Hyperloop Markup Language", "Hyperlink Text Module", "None"], correct: 0 },
  { q: "Which language is used for web apps?", a: ["PHP", "Python", "Javascript", "All"], correct: 3 },
  { q: "What does RAM stand for?", a: ["Random Access Memory", "Read Access Memory", "Run Accept Memory", "None"], correct: 0 },
  { q: "Which is not a programming language?", a: ["Python", "HTML", "C++", "Java"], correct: 1 },
  { q: "Which structure uses FIFO?", a: ["Queue", "Stack", "Heap", "Graph"], correct: 0 },
  { q: "What does SQL stand for?", a: ["Structured Query Language", "Style Question Language", "Statement Question List", "None"], correct: 0 },
  { q: "Which is an input device?", a: ["Monitor", "Mouse", "Speaker", "Projector"], correct: 1 },
  { q: "What is an OS?", a: ["Operating System", "Open Software", "Ordered System", "None"], correct: 0 }
];

startBtn.onclick = () => {
  startScreen.classList.add("hide");
  rulesBox.classList.remove("hide");
};

exitBtn.onclick = () => location.reload();

continueBtn.onclick = () => {
  rulesBox.classList.add("hide");
  quizBox.classList.remove("hide");
  loadQuestion();
};

nextBtn.onclick = () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    quizBox.innerHTML = `<h2>Quiz Finished</h2><p>Your Score: ${score} / ${questions.length}</p>`;
  }
};

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  answered = false;
  timeText.textContent = timeLeft;
  timer = setInterval(countdown, 1000);
  nextBtn.classList.add("hide");
  const q = questions[currentQ];
  questionText.textContent = `${currentQ + 1}. ${q.q}`;
  questionCount.textContent = `${currentQ + 1} of ${questions.length} Questions`;
  optionsBox.innerHTML = "";
  q.a.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(div, index);
    optionsBox.appendChild(div);
  });
}

function countdown() {
  timeLeft--;
  timeText.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    disableOptions();
  }
}

function selectOption(selected, index) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const q = questions[currentQ];
  const allOptions = optionsBox.querySelectorAll(".option");
  allOptions.forEach(opt => opt.classList.add("disabled"));
  if (index === q.correct) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("wrong");
    allOptions[q.correct].classList.add("correct");
  }
  nextBtn.classList.remove("hide");
}

function disableOptions() {
  const q = questions[currentQ];
  const allOptions = optionsBox.querySelectorAll(".option");
  allOptions.forEach((opt, index) => {
    opt.classList.add("disabled");
    if (index === q.correct) opt.classList.add("correct");
  });
  nextBtn.classList.remove("hide");
}
