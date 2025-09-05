const secondaryDisplay = document.getElementById("secondary-display");
const mainDisplay = document.getElementById("main-display");

function calculate(expression) {
  const expressionArray = expression.split(" ");
  const num1 = expressionArray[0];
  const num2 = expressionArray[2];
  const operator = expressionArray[1];

  switch (operator) {
    case "+":
      return Number(num1) + Number(num2);
    case "-":
      return Number(num1) - Number(num2);
    case "x":
      return Number(num1) * Number(num2);
    case "/":
      return Number(num1) / Number(num2);
    default:
      return "Error";
  }
};

document.querySelectorAll(".button-container button").forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.value) {
      mainDisplay.textContent += btn.dataset.value;
    }
    if (btn.dataset.operator) {
      mainDisplay.textContent += " " + btn.dataset.operator + " ";
    }
    if (btn.dataset.action === "=") {
      secondaryDisplay.textContent = mainDisplay.textContent;
      mainDisplay.textContent = calculate(mainDisplay.textContent.trim()).toString();
    }
    if (btn.dataset.action === "C") {
      secondaryDisplay.textContent = "";
      mainDisplay.textContent = "";
    }
  })
})
