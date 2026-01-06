// ================= REGISTER =================
function registerUser() {
  let i = document.querySelectorAll("input");

  let user = {
    name: i[0].value,
    username: i[1].value,
    password: i[5].value
  };

  if (!user.username || !user.password) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem(user.username, JSON.stringify(user));
  alert("Registration successful");
  location.href = "login.html";
}

// ================= LOGIN =================
function loginUser() {
  let i = document.querySelectorAll("input");
  let u = JSON.parse(localStorage.getItem(i[0].value));

  if (u && u.password === i[1].value) {
    localStorage.setItem("currentUser", u.username);
    location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ================= DASHBOARD =================
function loadDashboardData() {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    window.location.href = "login.html";
    return;
  }

  const score = Number(localStorage.getItem("score")) || 0;
  const level =
    score < 40 ? "Beginner" :
    score < 70 ? "Intermediate" :
    "Advanced";

  document.getElementById("usernameDisplay").innerText = "Welcome, " + username;
  document.getElementById("userFullName").innerText = username;
  document.getElementById("greetingName").innerText = username;
  document.getElementById("userLevel").innerText = level;
  document.getElementById("currentLevel").innerText = level;
  document.getElementById("avgScore").innerText = score + "%";
  document.getElementById("quizzesCount").innerText =
    JSON.parse(localStorage.getItem("completedQuizzes") || "[]").length;
}

// ================= TOPICS =================
function loadTopics() {
  const topics = ["Java", "Python", "DSA"];
  const grid = document.getElementById("topicsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  topics.forEach(t => {
    grid.innerHTML += `
      <div class="topic-card" onclick="startQuiz('${t}')">
        <h4>${t}</h4>
      </div>
    `;
  });
}

// // ================= START QUIZ =================
// function startQuiz(topic) {
//   localStorage.setItem("selectedTopic", topic);
//   localStorage.setItem("currentQuestion", 0);
//   localStorage.setItem("quizScore", 0);
//   window.location.href = "quiz.html";
// }

// ================= QUIZ DATA =================
const quizData = {
  Java: [
    { q: "What is JVM?", o: ["Java Virtual Machine", "Java Variable Method", "Java Visual Model", "None"], a: 0 },
    { q: "Which keyword is used to inherit a class?", o: ["this", "super", "extends", "implements"], a: 2 },
    { q: "Which is not OOP concept?", o: ["Inheritance", "Encapsulation", "Compilation", "Polymorphism"], a: 2 },
    { q: "Which method is entry point?", o: ["main()", "start()", "run()", "init()"], a: 0 },
    { q: "Java is ___ language", o: ["Low level", "Assembly", "High level", "Machine"], a: 2 },
    { q: "Which is wrapper class?", o: ["int", "Integer", "float", "char"], a: 1 },
    { q: "Which package has Scanner?", o: ["java.io", "java.util", "java.lang", "java.net"], a: 1 },
    { q: "Which is not primitive?", o: ["int", "float", "String", "char"], a: 2 },
    { q: "Which operator compares value?", o: ["=", "==", "!=", "&&"], a: 1 },
    { q: "Java supports multiple inheritance using?", o: ["Class", "Object", "Interface", "Constructor"], a: 2 }
  ],

  Python: [
    { q: "Python is ___ typed language", o: ["Static", "Dynamic", "Strong", "Weak"], a: 1 },
    { q: "Which symbol for comment?", o: ["//", "#", "/*", "--"], a: 1 },
    { q: "Which is mutable?", o: ["tuple", "string", "list", "int"], a: 2 },
    { q: "Which keyword for function?", o: ["fun", "define", "def", "function"], a: 2 },
    { q: "Output of len([1,2,3])?", o: ["2", "3", "4", "Error"], a: 1 },
    { q: "Which is loop?", o: ["repeat", "for", "iterate", "scan"], a: 1 },
    { q: "Which file extension?", o: [".java", ".py", ".c", ".js"], a: 1 },
    { q: "Which keyword exits loop?", o: ["stop", "break", "exit", "end"], a: 1 },
    { q: "Which creates range?", o: ["list()", "range()", "loop()", "seq()"], a: 1 },
    { q: "Python developed by?", o: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne"], a: 1 }
  ],

  DSA: [
    { q: "Which is LIFO?", o: ["Queue", "Stack", "Array", "Tree"], a: 1 },
    { q: "Which is FIFO?", o: ["Stack", "Queue", "Tree", "Graph"], a: 1 },
    { q: "Binary search works on?", o: ["Any array", "Sorted array", "Linked list", "Tree"], a: 1 },
    { q: "Time complexity of binary search?", o: ["O(n)", "O(log n)", "O(n²)", "O(1)"], a: 1 },
    { q: "Which uses recursion?", o: ["DFS", "BFS", "Queue", "Array"], a: 0 },
    { q: "Which is non-linear?", o: ["Array", "Stack", "Tree", "Queue"], a: 2 },
    { q: "Which sorting is fastest avg?", o: ["Bubble", "Selection", "Quick", "Insertion"], a: 2 },
    { q: "Heap is?", o: ["Tree", "Graph", "Array", "List"], a: 0 },
    { q: "Which uses hash?", o: ["Array", "HashMap", "Stack", "Queue"], a: 1 },
    { q: "Worst case of quick sort?", o: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], a: 2 }
  ]
};

// ================= LOAD ONE QUESTION =================

// ================= START QUIZ (FROM TOPIC PAGE) =================
function startQuizFromSelect() {
  const topic = document.getElementById("topic").value;

  if (!topic) {
    alert("Please select a topic");
    return;
  }

  localStorage.setItem("selectedTopic", topic);
  localStorage.setItem("currentQuestion", 0);
  localStorage.setItem("quizScore", 0);

  window.location.href = "quiz.html";
}

// ================= LOAD QUESTION =================
function loadQuizQuestion() {
  const topic = localStorage.getItem("selectedTopic");

  if (!topic || !quizData[topic]) {
    alert("Please select topic first");
    window.location.href = "topic.html";
    return;
  }

  const index = Number(localStorage.getItem("currentQuestion"));
  const questions = quizData[topic];

  if (index >= questions.length) {
    finishQuiz();
    return;
  }

  document.getElementById("questionText").innerText = questions[index].q;
  document.getElementById("qNo").innerText =
    (index + 1) + "/" + questions.length;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questions[index].o.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    div.onclick = () => {
      document.querySelectorAll(".option")
        .forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
      localStorage.setItem("selectedOption", i);
    };

    optionsDiv.appendChild(div);
  });

  document.getElementById("progressFill").style.width =
    ((index + 1) / questions.length) * 100 + "%";
}

// ================= NEXT BUTTON =================
function nextQuestion() {
  const topic = localStorage.getItem("selectedTopic");
  const index = Number(localStorage.getItem("currentQuestion"));
  const selected = localStorage.getItem("selectedOption");
  const questions = quizData[topic];

  if (selected === null) {
    alert("Select an option");
    return;
  }

  let score = Number(localStorage.getItem("quizScore"));

  if (Number(selected) === questions[index].a) {
    score++;
  }

  localStorage.setItem("quizScore", score);
  localStorage.setItem("currentQuestion", index + 1);
  localStorage.removeItem("selectedOption");

  loadQuizQuestion();
}

// ================= FINISH QUIZ =================
function finishQuiz() {
  const score = Number(localStorage.getItem("quizScore"));
  const topic = localStorage.getItem("selectedTopic");
  const total = quizData[topic].length;

  const percent = Math.round((score / total) * 100);
  localStorage.setItem("score", percent);

  window.location.href = "result.html";
}

// ================= AUTO LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("quiz.html")) {
    loadQuizQuestion();
  }
});

