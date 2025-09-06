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
