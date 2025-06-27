// main.js - Gerador de senha autoral por Fabiano Neras

const lengthValue = document.getElementById('length-value');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const passwordField = document.getElementById('password');
const checkboxes = {
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  numbers: document.getElementById('numbers'),
  symbols: document.getElementById('symbols'),
};
const strengthBar = document.getElementById('strength-bar');

let passwordLength = 12;

// Atualiza o valor exibido e gera nova senha
function updateLength(value) {
  passwordLength = value;
  lengthValue.textContent = passwordLength;
  generatePassword();
}

decreaseBtn.addEventListener('click', () => {
  if (passwordLength > 4) updateLength(passwordLength - 1);
});
increaseBtn.addEventListener('click', () => {
  if (passwordLength < 20) updateLength(passwordLength + 1);
});

// Conjunto de caracteres disponíveis
const chars = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*?'
};

// Gera senha com base nas opções selecionadas
function generatePassword() {
  let availableChars = '';

  if (checkboxes.uppercase.checked) availableChars += chars.uppercase;
  if (checkboxes.lowercase.checked) availableChars += chars.lowercase;
  if (checkboxes.numbers.checked) availableChars += chars.numbers;
  if (checkboxes.symbols.checked) availableChars += chars.symbols;

  if (!availableChars) {
    passwordField.value = '';
    updateStrength(0);
    return;
  }

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const index = Math.floor(Math.random() * availableChars.length);
    password += availableChars[index];
  }
  passwordField.value = password;
  updateStrength(passwordLength, availableChars.length);
}

// Atualiza a barra de força da senha
function updateStrength(length, poolSize) {
  let strengthPercent = 0;
  if (!length || !poolSize) {
    setStrengthBar(0, '#ff4c4c'); // vermelho - fraca
    return;
  }

  // Simples cálculo de entropia para força
  const entropy = length * Math.log2(poolSize);

  if (entropy < 40) {
    setStrengthBar(33, '#ff4c4c'); // fraca - vermelho
  } else if (entropy < 70) {
    setStrengthBar(66, '#ffd60a'); // média - amarelo
  } else {
    setStrengthBar(100, '#00ff85'); // forte - verde
  }
}

function setStrengthBar(percent, color) {
  strengthBar.style.setProperty('--strength-width', `${percent}%`);
  strengthBar.style.width = `${percent}%`;
  strengthBar.style.backgroundColor = color;
}

// Adiciona eventos para gerar senha quando opções mudam
Object.values(checkboxes).forEach((checkbox) => {
  checkbox.addEventListener('change', generatePassword);
});

// Inicializa
updateLength(passwordLength);
generatePassword();
