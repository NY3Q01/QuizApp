

// Subject-based questions
const allQuizzes = {
  Coding: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Transfer Markup Language"], answer: 0 },
    { question: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django", "Bootstrap"], answer: 0 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Syntax"], answer: 0 }
  ],
  Math: [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the square root of 9?", options: ["1", "3", "9", "6"], answer: 1 },
    { question: "What is 10 / 2?", options: ["2", "5", "10", "20"], answer: 1 }
  ],
  Science: [
    { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answer: 2 },
    { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 1 }
  ],
  History: [
    { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: 1 },
    { question: "In which year did World War II end?", options: ["1945", "1939", "1918", "1950"], answer: 0 },
    { question: "What ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Chinese"], answer: 2 }
  ],
  "Language Arts": [
    { question: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
    { question: "Which is a noun?", options: ["Run", "Blue", "Cat", "Quickly"], answer: 2 },
    { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childen"], answer: 1 }
  ],
  Technology: [
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Computer Processing Utility"], answer: 0 },
    { question: "What is the main function of RAM?", options: ["Storage", "Processing", "Memory", "Display"], answer: 2 },
    { question: "Which is an input device?", options: ["Monitor", "Keyboard", "Printer", "Speaker"], answer: 1 }
  ],
  Cybersecurity: [
    { question: "What is phishing?", options: ["A type of malware", "A hacking technique", "A scam to steal information", "A firewall"], answer: 2 },
    { question: "What does VPN stand for?", options: ["Virtual Private Network", "Very Personal Network", "Verified Protected Network", "Virtual Public Node"], answer: 0 },
    { question: "What is a strong password?", options: ["123456", "password", "Qw!7x$2P", "abcdef"], answer: 2 }
  ]
};

let quizData = [];
let current = 0, score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  const subject = document.getElementById("subject").value;
  quizData = JSON.parse(JSON.stringify(allQuizzes[subject])); // Deep copy
  // Shuffle questions
  shuffleArray(quizData);
  // Shuffle options for each question
  quizData.forEach(q => {
    const correctText = q.options[q.answer];
    shuffleArray(q.options);
    q.answer = q.options.indexOf(correctText);
  });
  current = 0;
  score = 0;
  incorrectAnswers = [];
  document.getElementById("subject-select").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("quiz-container").innerHTML = `
    <div id=\"question\"></div>
    <div id=\"options\"></div>
    <button id=\"next-btn\" style=\"display:none;\">Next</button>
    <p id=\"score\"></p>
  `;
  loadQuiz();
}

function loadQuiz() {
  document.getElementById("question").textContent = quizData[current].question;
  document.getElementById("score").textContent = `Question ${current + 1} of ${quizData.length}`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  // 2x2 grid for options
  const grid = document.createElement("div");
  grid.className = "options-grid";
  quizData[current].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option";
    btn.onclick = () => {
      if (i === quizData[current].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[current].question,
          selected: opt,
          correct: quizData[current].options[quizData[current].answer]
        });
      }
      current++;
      if (current < quizData.length) loadQuiz();
      else showResults();
    };
    grid.appendChild(btn);
  });
  optionsDiv.appendChild(grid);
}

function showResults() {
  let resultHtml = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
  if (score === quizData.length) {
    resultHtml += `<p>Congratulations! You scored 100%!</p>`;
    resultHtml += `<button onclick=\"restartQuiz()\">Try another set in this topic</button> <button onclick=\"changeTopic()\">Choose another subject</button>`;
  } else {
    if (incorrectAnswers.length) {
      resultHtml += `<h3>Review Incorrect Answers:</h3><ul>`;
      incorrectAnswers.forEach(item => {
        resultHtml += `<li><strong>Q:</strong> ${item.question}<br><strong>Your answer:</strong> ${item.selected}<br><strong>Correct answer:</strong> ${item.correct}</li>`;
      });
      resultHtml += `</ul>`;
    }
    resultHtml += `<h3>Tips to Improve:</h3><ul>
      <li>Review the concepts for each incorrect answer.</li>
      <li>Practice with more quizzes on this topic.</li>
      <li>Use flashcards and spaced repetition.</li>
      <li>Read official documentation and tutorials.</li>
    </ul>`;
    resultHtml += `<button onclick=\"restartQuiz()\">Try Again</button>`;
  }
  document.getElementById("quiz-container").innerHTML = resultHtml;
}

function restartQuiz() {
  current = 0;
  score = 0;
  incorrectAnswers = [];
  document.getElementById("quiz-container").innerHTML = `
    <div id=\"question\"></div>
    <div id=\"options\"></div>
    <button id=\"next-btn\" style=\"display:none;\">Next</button>
    <p id=\"score\"></p>
  `;
  loadQuiz();
}

function changeTopic() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("subject-select").style.display = "block";
}
