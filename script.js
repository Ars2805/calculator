const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator__button');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
  display.scrollLeft = display.scrollWidth;
}

function calculate() {
  try {
    let res = eval(currentInput).toString();
    if (res.length > 12) {
      res = Number(res).toExponential(6);
    }
    currentInput = res;
  } catch {
    currentInput = 'Ошибка';
  }
  updateDisplay();
}

function handleInput(value) {
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
        } catch {
          currentInput = 'Ошибка';
        }
      }
      break;
    case '+/-':
      if (currentInput) {
        try {
          let val = eval(currentInput);
          currentInput = (-val).toString();
        } catch {
          currentInput = 'Ошибка';
        }
      }
      break;
    case '=':
      calculate();
      return;
    default:
      currentInput += value;
      break;
  }
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.textContent);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Разрешённые клавиши: цифры, операторы и точки
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/'];

  if (allowedKeys.includes(key)) {
    handleInput(key);
    e.preventDefault();
  } else if (key === 'Enter') {
    handleInput('=');
    e.preventDefault();
  } else if (key === 'Backspace') {
    handleInput('⌫');
    e.preventDefault();
  } else if (key === 'Escape') {
    handleInput('C');
    e.preventDefault();
  } else if (key === '%') {
    handleInput('%');
    e.preventDefault();
  }
});