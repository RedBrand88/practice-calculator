const secondaryDisplay = document.getElementById("secondary-display");
const mainDisplay = document.getElementById("main-display");

function calculate(expression) {
  const expressionArray = expression.split(" ");
  const loop = expressionArray.length;
  let total = Number(expressionArray[0]);
  for(let i = 1; i + 1 < loop; i += 2) {

    const operator = expressionArray[i];
    const num2 = expressionArray[i+1];

    switch (operator) {
      case "+":
        total += Number(num2);
        break;
      case "-":
        total -= Number(num2);
        break;
      case "x":
        total *= Number(num2);
        break;
      case "/":
        total = num2 === 0 ? NaN : total / num2;
        break;
      default:
        return "Error";
    }
  }
  return total;
};

function isOperatorHanging(expression) {
  const operators = ['+', '-', 'x', '/'];
  const lastChar = expression.length - 1;
  return !operators.includes(expression[lastChar]);
}

function isOperatorEqual(expression, operator) {
  const lastChar = expression.length - 1;
  return expression[lastChar] === operator;
}

document.querySelectorAll(".button-container button").forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.value) {
      mainDisplay.textContent += btn.dataset.value;
    }
    if (btn.dataset.operator) {
      if (isOperatorHanging(mainDisplay.textContent.trim())) {
        mainDisplay.textContent += " " + btn.dataset.operator + " ";
      } else if (!isOperatorEqual(mainDisplay.textContent.trim(), btn.dataset.operator)){
        const lastChar = mainDisplay.textContent.length - 2;
        mainDisplay.textContent = mainDisplay.textContent.slice(0, lastChar) + btn.dataset.operator + " ";
      }
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
