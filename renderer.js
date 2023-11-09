const { ipcRenderer } = require('electron');

function findNumbers() {
  console.log('Button clicked');
  const inputText = document.getElementById('inputText');
  const results = document.getElementById('results');
  const text = inputText.value;
  let numbers = text.match(/\d+(\.\d+)?/g);

  results.innerText = '';

  if (numbers && numbers.length > 0) {
    results.innerText = 'Найденные числа:\n';
    numbers.forEach((number, index) => {
      results.innerText += `${index + 1}. ${number}\n`;
    });
  } else {
    results.innerText = 'В тексте не найдено чисел.';
  }
}