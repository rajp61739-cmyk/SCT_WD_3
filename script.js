const questions = [

  {
    type: "single",
    question: "Which language is used for web page styling?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: "CSS"
  },

  {
    type: "multi",
    question: "Select JavaScript Frameworks:",
    options: ["React", "Laravel", "Vue", "Django"],
    answer: ["React", "Vue"]
  },

  {
    type: "fill",
    question: "Fill in the blank: HTML stands for ________ Markup Language.",
    answer: "HyperText"
  },

  {
    type: "single",
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape"
  },

  {
    type: "single",
    question: "Which tag is used to link JavaScript file?",
    options: ["<js>", "<javascript>", "<script>", "<link>"],
    answer: "<script>"
  }

];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const fillBlankBox = document.getElementById("fill-blank-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const questionCount = document.getElementById("question-count");
const progress = document.querySelector(".progress");

loadQuestion();

function loadQuestion() {

  selectedAnswers = [];

  const q = questions[currentQuestion];

  questionEl.innerText = q.question;

  optionsEl.innerHTML = "";
  fillBlankBox.innerHTML = "";

  questionCount.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;

  progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  if(q.type === "single") {

    q.options.forEach(option => {

      const btn = document.createElement("button");

      btn.classList.add("option-btn");
      btn.innerText = option;

      btn.onclick = () => {

        document.querySelectorAll(".option-btn").forEach(btn => {
          btn.classList.remove("selected");
        });

        btn.classList.add("selected");

        selectedAnswers = [option];
      }

      optionsEl.appendChild(btn);
    });
  }

   else if(q.type === "multi") {

    q.options.forEach(option => {

      const btn = document.createElement("button");

      btn.classList.add("option-btn");
      btn.innerText = option;

      btn.onclick = () => {

        btn.classList.toggle("selected");

        if(selectedAnswers.includes(option)) {
          selectedAnswers = selectedAnswers.filter(item => item !== option);
        }
        else {
          selectedAnswers.push(option);
        }
      }

      optionsEl.appendChild(btn);
    });
  }

  else if(q.type === "fill") {

    fillBlankBox.innerHTML = `
      <input type="text" id="fillInput" placeholder="Type your answer here...">
    `;
  }
}

nextBtn.addEventListener("click", () => {

  checkAnswer();

  currentQuestion++;

  if(currentQuestion < questions.length) {
    loadQuestion();
  }
  else {
    showResult();
  }

});

function checkAnswer() {

  const q = questions[currentQuestion];

  if(q.type === "single") {

    if(selectedAnswers[0] === q.answer) {
      score++;
    }
  }

  else if(q.type === "multi") {

    const correct = q.answer.sort().join(',');
    const user = selectedAnswers.sort().join(',');

    if(correct === user) {
      score++;
    }
  }

  else if(q.type === "fill") {

    const input = document.getElementById("fillInput").value.trim();

    if(input.toLowerCase() === q.answer.toLowerCase()) {
      score++;
    }
  }
}

function showResult() {

  document.getElementById("quiz-container").classList.add("hide");

  resultBox.classList.remove("hide");

  let message = "";

  if(score === questions.length) {
    message = "🏆 Outstanding Performance!";
  }
  else if(score >= 3) {
    message = "🔥 Great Job!";
  }
  else {
    message = "💡 Keep Practicing!";
  }

scoreText.innerHTML = `
    You scored <b>${score}</b> out of <b>${questions.length}</b><br><br>
    ${message}
  `;
}

function restartQuiz() {

  currentQuestion = 0;
  score = 0;

  resultBox.classList.add("hide");

  document.getElementById("quiz-container").classList.remove("hide");

  loadQuestion();
}