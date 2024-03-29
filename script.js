const buttons = document.querySelectorAll("button");
const restartButton = document.getElementById("restart");
const numberDisplays = document.querySelectorAll(".number-display");
const turns = document.getElementById("turns-display");
const logger = document.getElementById("logs");
const gameStatus = document.getElementById("game-status");

let currentDisplay = 0;
let turnsLeft;
let code;

const logLine = () => {
  const userCode = getUserCode();
  const logLine = document.createElement("li");

  if (userCode - code > 0) {
    logLine.innerText = `Guessed ${userCode}, Code is lower`;
  } else if (userCode - code < 0) {
    logLine.innerText = `Guessed ${userCode}, Code is higher`;
  }
  logger.appendChild(logLine);
};

const getUserCode = () => {
  let userInputCode = "";
  numberDisplays.forEach((display) => {
    userInputCode += display.textContent;
  });
  return userInputCode;
};

const generateCode = () => {
  let builder = "";
  for (i = 0; i < 3; i++) {
    const randomDigit = Math.floor(Math.random() * 3 + 1);
    builder += randomDigit;
  }
  return builder;
};

const endGame = () => {
  buttons.forEach((button) => {
    button.disabled = button.id !== "restart";
  });
  restartButton.style.display = "block";
};

const restartGame = () => {
  logger.innerHTML = null;
  buttons.forEach((button) => {
    button.disabled = false;
  });
  clearNumbers();
  startGame();
};

const updateTurns = () => {
  turnsLeft--;

  if (turnsLeft === 0) {
    gameStatus.style.color = "red";
    gameStatus.innerHTML = "GAME OVER! :(";
    const logLine = document.createElement("li");
    logLine.innerText = `Game over, code was: ${code}`;
    logger.appendChild(logLine);
    endGame();
  }
  turns.innerText = `Turns: ${turnsLeft}`;
};

const addNumber = (number) => {
  if (currentDisplay === 2) {
    // Makes sure that the last digit is added to numberDisplays
    numberDisplays[currentDisplay].textContent = number;

    if (getUserCode() === code) {
      gameStatus.style.color = "green";
      gameStatus.innerHTML = "You win! :)";
      endGame();
    } else {
      setTimeout(() => {
        clearNumbers();
        updateTurns();
      }, 100);
      logLine();
    }
  }
  numberDisplays[currentDisplay].textContent = number;
  currentDisplay++;
};

const clearNumbers = () => {
  currentDisplay = 0;
  numberDisplays.forEach((display) => (display.textContent = null));
};

const startGame = () => {
  turnsLeft = 7;
  turns.innerText = `Turns: ${turnsLeft}`;
  restartButton.style.display = "none";
  gameStatus.innerHTML = null;
  code = generateCode();
};
