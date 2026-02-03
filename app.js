const menu = document.getElementById("menu");
const game = document.getElementById("game");
const playBtn = document.getElementById("playBtn");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const highScoreEl = document.getElementById("highScore");

const gameOverBox = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

const colors = ["green", "red", "yellow", "blue"];

let gameSeq = [];
let userSeq = [];
let level = 0;
let score = 0;
let gameActive = false;

let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreEl.textContent = highScore;

// EVENT LISTENERS
playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

document.querySelectorAll(".btn").forEach(btn =>
  btn.addEventListener("click", handleClick)
);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameActive) {
    startGame();
  }
});

// START GAME
function startGame() {
  menu.classList.remove("active");
  game.classList.add("active");

  gameOverBox.classList.add("hidden");

  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
  gameActive = true;

  scoreEl.textContent = 0;
  levelEl.textContent = 0;

  nextLevel();
}

// NEXT LEVEL
function nextLevel() {
  userSeq = [];
  level++;
  levelEl.textContent = level;

  const color = colors[Math.floor(Math.random() * 4)];
  gameSeq.push(color);

  playSequence();
}

// PLAY SEQUENCE
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flash(document.getElementById(gameSeq[i]));
    i++;
    if (i >= gameSeq.length) clearInterval(interval);
  }, 600);
}

// FLASH EFFECT
function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

// HANDLE USER CLICK
function handleClick() {
  if (!gameActive) return; // block clicks after game over

  const color = this.id;
  userSeq.push(color);
  flash(this);

  const idx = userSeq.length - 1;

  // WRONG INPUT
  if (userSeq[idx] !== gameSeq[idx]) {
    gameActive = false;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreEl.textContent = highScore;
    }

    gameOverBox.classList.remove("hidden");
    return;
  }

  // LEVEL COMPLETE
  if (userSeq.length === gameSeq.length) {
    score += 10;
    scoreEl.textContent = score;
    setTimeout(nextLevel, 800);
  }

}


