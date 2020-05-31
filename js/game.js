const btnChoices = document.querySelectorAll(".button-choice");
const gameTable = document.querySelector(".game-table");

const gameResult = document.querySelector(".game-result");
const gameResultTitle = document.querySelector(".result");
const btnRestart = document.querySelector(".restart");

let userChoiceArea = document.querySelector(".user-choice");
let compChoiceArea = document.querySelector(".comp-choice");

const showResult = document.querySelector(".show-result");
const preview = document.querySelector(".preview");

let scoreValue = document.querySelector(".score");
scoreValue.textContent = 0;
let score = 0;

let btnValues = ["paper", "rock", "scissors"];
let random = getRandom();
let userChoice, compChoice;

let winnerBlock = document.createElement("div");
winnerBlock.classList.add("winner");
winnerBlock.innerHTML = `
    <div class="winner-wrapper">
        <div class="winner-wave winner-wave1"></div>
        <div class="winner-wave winner-wave2"></div>
        <div class="winner-wave winner-wave3"></div>
        <div class="winner-wave winner-wave4"></div>
    <div>
`;

function getRandom() {
  return parseInt(Math.random() * btnValues.length);
}

function checkWinner() {
  setTimeout(() => {
    showResult.style.display = "flex";
    winnerBlock.style.display = "flex";

    switch (true) {
      case userChoice === compChoice:
        gameResultTitle.textContent = "Tie Game";
        console.log("Tie Game");
        break;
      case (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "scissors" && compChoice === "paper"):
        gameResultTitle.textContent = "You Win";
        score += 1;
        scoreValue.textContent = score;
        break;
      default:
        gameResultTitle.textContent = "You Lose";
        score -= 1;
        scoreValue.textContent = score;
    }
  }, 1000);
}

function waitCompChoice(choice) {
  gameTable.style.display = "none";
  gameResult.style.display = "flex";

  compChoice = btnValues[random];

  setTimeout(() => {
    preview.style.display = "none";

    compChoiceArea.innerHTML = `
    <div class="${compChoice}">
      <div class="button-main">
        <a href="javascript:void(0)" class="button-${compChoice}">
        <img src="img/icon-${compChoice}.svg" alt="${compChoice}">
        </a>
      </div>
    </div>`;
  }, 800);
  checkWinner(choice, compChoice);
}

function getUserChoice(choice) {
  userChoiceArea.innerHTML = `
  <div class="${choice}">
  <div class="button-main">
      <a href="javascript:void(0)" class="button-${choice}">
      <img src="img/icon-${choice}.svg" alt="${choice}">
      </a>
  </div>
  </div>
`;
  waitCompChoice(choice);
}

function restartGame() {
  gameTable.style.display = "flex";

  compChoiceArea.innerHTML = "";
  preview.style.display = "block";
  compChoiceArea.appendChild(preview);

  gameResult.style.display = "none";
  showResult.style.display = "none";

  random = getRandom();
}

// Mandamos a llamar a todas las funciones

btnChoices.forEach((button) => {
  button.addEventListener("click", () => {
    userChoice = button.getAttribute("data-item");
    getUserChoice(userChoice);
  });
});

btnRestart.addEventListener("click", () => {
  console.log("restart");
  restartGame();
});
