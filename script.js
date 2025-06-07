const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator__button');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    switch (value) {
      case 'C':
        currentInput = '';
        break;
      case '⌫':
        currentInput = currentInput.slice(0, -1);
        break;
      case '%':
        if (currentInput) {
          try {
            currentInput = (eval(currentInput) / 100).toString();
          } catch (e) {
            currentInput = 'Ошибка';
          }
        }
        break;
      case '+/-':
        if (currentInput) {
          try {
            let val = eval(currentInput);
            currentInput = (-val).toString();
          } catch (e) {
            currentInput = 'Ошибка';
          }
        }
        break;
      case '=':
        try {
          currentInput = eval(currentInput).toString();
        } catch (e) {
          currentInput = 'Ошибка';
        }
        break;
      default:
        currentInput += value;
        break;
    }

    updateDisplay();
  });
});