const buttons = document.querySelectorAll("button");
const numberDisplays = document.querySelectorAll(".number-display");
const turns = document.getElementById("clock");
let turnsLeft = 7;
let currentDisplay = 0;

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

buttons.forEach((button) => {
  if (button.textContent === "Clear") {
    button.addEventListener("click", clearNumbers);
    return;
  }

  button.addEventListener("click", () => {
    addNumber(button.textContent);
  });
});
