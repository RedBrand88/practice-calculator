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

function replaceLastChar(expression, replacement, number = true) {
  const lastChar = expression.length - 1;
  if (number) {
    return expression.slice(0, lastChar) + replacement + " ";
  } else {
    return expression.slice(0, lastChar + 1) + replacement + " ";
  }
}

function calcPercent(expression) {
  const operands = expression.split(" ");
  const newOperands = operands.map((op) => {
    if (op.includes("%")) {
      const num = op.split("%");
      const perc = num[0] / 100;
      return perc;
    } else {
      return op
    }
  });
  const num1 = Number(newOperands[0]);
  const operator = newOperands[1];
  const num2 = Number(newOperands[2]);

  if (!newOperands[1]) {
    return num1;
  }
  
  switch(operator) {
    case "+":
      return num1 + (num1 * num2);
    case "-":
      return num1 - (num1 * num2);
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "ERROR";
  }
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
        mainDisplay.textContent = replaceLastChar(mainDisplay.textContent.trim(), btn.dataset.operator);
      }
    }
    if (btn.dataset.action === "=") {
      secondaryDisplay.textContent = mainDisplay.textContent;
      if (mainDisplay.textContent.includes("%")) {
        mainDisplay.textContent = calcPercent(mainDisplay.textContent.trim()).toString();
      } else {
        mainDisplay.textContent = calculate(mainDisplay.textContent.trim()).toString();
      }
    }
    if (btn.dataset.action === "C") {
      secondaryDisplay.textContent = "";
      mainDisplay.textContent = "";
    }
    if (btn.dataset.action === "%") {
      mainDisplay.textContent = replaceLastChar(mainDisplay.textContent.trim(), btn.dataset.action, false);
    }
  })
})
