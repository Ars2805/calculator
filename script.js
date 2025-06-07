const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator__button');

let currentInput = '';
let history = [];

function updateDisplay() {
  display.value = currentInput;
  display.scrollLeft = display.scrollWidth;
}

function calculate() {
  try {
    const result = eval(currentInput).toString();
    addToHistory(currentInput, result);
    currentInput = result.length > 12 ? Number(result).toExponential(6) : result;
  } catch {
    currentInput = 'Ошибка';
  }
  updateDisplay();
}

function handleInput(value) {
  if (currentInput === 'Ошибка') {
    currentInput = '';
  }

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
          const result = (eval(currentInput) / 100).toString();
          addToHistory(`${currentInput} %`, result);
          currentInput = result;
        } catch {
          currentInput = 'Ошибка';
        }
      }
      break;
    case '+/-':
      if (currentInput) {
        try {
          const result = (-eval(currentInput)).toString();
          addToHistory(`${currentInput} +/-`, result);
          currentInput = result;
        } catch {
          currentInput = 'Ошибка';
        }
      }
      break;
    case '=':
      calculate();
      return;
    default:
      if (currentInput === '0' && value === '0') {
        return; // не добавляем второй 0
      } else if (currentInput === '0' && value.match(/\d/)) {
        currentInput = value; // заменяем 0 на новую цифру
      } else {
        currentInput += value;
      }
      // Автокоррекция ведущих нулей
      currentInput = currentInput.replace(/(^|[^.\d])0+(\d)/g, '$1$2');
      break;
  }
  updateDisplay();
}

function addToHistory(expression, result) {
  history.unshift({ expression, result });
  if (history.length > 10) history.pop();
  renderHistoryPopup();
}

function renderHistoryPopup() {
  const historyPopup = document.getElementById('historyPopup');
  if (!historyPopup) return;

  historyPopup.innerHTML = '';
  if (history.length === 0) {
    historyPopup.textContent = 'История пуста';
    return;
  }

  history.forEach(item => {
    const div = document.createElement('div');
    div.className = 'calculator__history-item';
    div.textContent = `${item.expression} = ${item.result}`;
    div.addEventListener('click', () => {
      currentInput = item.expression;
      updateDisplay();
    });
    historyPopup.appendChild(div);
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.textContent);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

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