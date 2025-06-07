const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator__button');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      try {
        currentInput = eval(currentInput).toString();
      } catch (e) {
        currentInput = 'Ошибка';
      }
    } else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});
