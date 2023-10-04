const buttons = document.querySelectorAll("button");
const numberDisplays = document.querySelectorAll(".number-display");
const turns = document.getElementById("clock");

let currentDisplay = 0;
let turnsLeft;
let code;

const codeIsCorrect = () => {
  let userInputCode = "";

  numberDisplays.forEach((display) => {
    userInputCode += display.textContent;
  });
  return userInputCode === code;
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
    button.disabled = true;
  });
};

const updateTurns = () => {
  turnsLeft--;

  if (turnsLeft === 0) {
    console.log("Game over");
    endGame();
  }
  turns.innerText = `Clock: ${turnsLeft}`;
};

const addNumber = (number) => {
  if (currentDisplay === 2) {
    numberDisplays[currentDisplay].textContent = number;

    if (codeIsCorrect()) {
      endGame();
    }

    setTimeout(() => {
      clearNumbers();
      updateTurns();
    }, 100);
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
  code = generateCode();

  console.log(code);

  buttons.forEach((button) => {
    if (button.textContent === "Clear") {
      button.addEventListener("click", clearNumbers);
      return;
    }

    button.addEventListener("click", () => {
      addNumber(button.textContent);
    });
  });
};
