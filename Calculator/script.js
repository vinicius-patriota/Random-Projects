let str = '';
let strToVerify = '';
let lastButtonWasASymbol = false;
let lastButtonWasAnEqual = false;

const printToDisplay = (string) => {
  if (typeof string !== "string") throw Error('Argumento invalido: not a string');
  validateStringToDisplay(string);
};

const validateStringToDisplay = (string) => {
  const inputDisplay = document.getElementById('input-display');

  if (string.length === 1) {
    if (string === '*' || string === '/' || string === '+' || string === '.') {
      inputDisplay.value = '';
      str = '';
      return;
    };
    inputDisplay.value = string;
    str = string;
    return;
  };

  if (lastButtonWasASymbol === false && string[string.length - 1] !== '.') {
    inputDisplay.value = string;
    str = string;
    return;
  }

  switch (string[string.length - 1]) {
    case '-':
      let caseMinus = '';
      if (string[0] === '-') {
        caseMinus = '-';
        string = string.slice(1, string.length)
      };
      if ((/(?<=\d)\-/g).test(string) === false) {
        string = caseMinus + string;
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      string = string.replace(/(?<=\d)\-/g, ' - ');
      string = caseMinus + string;
      break;
    case '+':
      if ((/(?<=\d)\+/g).test(string) === false) {
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      string = string.replace(/(?<=\d)\+/g, ' + ');
      break;
    case '*':
      if ((/(?<=\d)\*/g).test(string) === false) {
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      string = string.replace(/(?<=\d)\*/g, ' * ');
      break;
    case '/':
      if ((/(?<=\d)\//g).test(string) === false) {
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      string = string.replace(/(?<=\d)\//g, ' / ');
      break;
    case '.':
      if (string[string.length - 2] === '.' || string[string.length - 2] === ' ') {
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      let listaStr = str.split(' ');
      if ((/\./).test(listaStr[listaStr.length - 1])) {
        inputDisplay.value = string.substring(0, string.length - 1);
        str = string.substring(0, string.length - 1);
        return;
      }
      break;
  };

  inputDisplay.value = string;
  str = string;
};

const onNumberPressed = (object) => {
  if (!object.value) throw Error('Botao numerico retorna valor invalido!')
  lastButtonWasASymbol = false;

  if (lastButtonWasAnEqual) str = '';
  strToVerify = str;
  strToVerify += object.value;
  printToDisplay(strToVerify);
  lastButtonWasAnEqual = false;
};

const onSymbolPressed = (object) => {
  if (!object.value) throw Error('Botao de simbolo retorna valor invalido!')
  lastButtonWasASymbol = true;

  strToVerify = str;
  strToVerify += object.value;
  printToDisplay(strToVerify);
  lastButtonWasAnEqual = false;
};

const onEqualsPressed = () => {
  if (str === '' || str === '-') return;
  if (!(/[\-\+\/\*]/).test(str)) return;
  if ((/ /).test(str[str.length - 1])) str = str.substring(0, str.length - 3);

  let listaStr = str.split(' ');

  let listaMultDiv = [];
  if ((/[\*\/]/).test(str)) {
    let lastWasMult = false;
    let lastWasDiv = false;
    for (let i = 0; i < listaStr.length; i += 1) {
      if (listaStr[i] === '*') {
        if (lastWasMult) {
          listaMultDiv.push(parseFloat(listaStr[i - 1]) * parseFloat(listaStr[i + 1]) - parseFloat(listaStr[i - 1]));
        } else {
          listaMultDiv.push(parseFloat(listaStr[i - 1]) * parseFloat(listaStr[i + 1]));
        }
        listaStr[i + 1] = parseFloat(listaStr[i - 1]) * parseFloat(listaStr[i + 1]);
        listaStr[i - 1] = 0;
        listaStr[i] = 0;
        lastWasMult = true;
        lastWasDiv = false;
      };
      if (listaStr[i] === '/') {
        if (lastWasDiv) {
          listaMultDiv.push(parseFloat(listaStr[i - 1]) / parseFloat(listaStr[i + 1]) - parseFloat(listaStr[i - 1]));
        } else {
          listaMultDiv.push(parseFloat(listaStr[i - 1]) / parseFloat(listaStr[i + 1]));
        }
        listaStr[i + 1] = parseFloat(listaStr[i - 1]) / parseFloat(listaStr[i + 1]);
        listaStr[i - 1] = 0;
        listaStr[i] = 0;
        lastWasMult = false;
        lastWasDiv = true;
      };
    };
  };

  listaStr = listaStr.filter((value) => (value !== 0));
  if (listaStr.length === 0) listaStr.push(0);

  let listaSumSub = [];
  if ((/[\-\+]/).test(str) && listaStr.length > 1) {
    for (let i = 0; i < listaStr.length; i += 1) {
      if (listaStr[i] === '+') {
        listaSumSub.push(parseFloat(listaStr[i - 1]) + parseFloat(listaStr[i + 1]));
        listaStr[i - 1] = 0;
        listaStr[i] = 0;
        listaStr[i + 1] = 0;
      };
      if (listaStr[i] === '-') {
        listaSumSub.push(parseFloat(listaStr[i - 1]) - parseFloat(listaStr[i + 1]));
        listaStr[i - 1] = 0;
        listaStr[i] = 0;
        listaStr[i + 1] = 0;
      };
    };
  } else {
    listaSumSub = listaStr;
  }

  const result = listaSumSub.reduce((acc, cur) => acc + cur);

  const inputDisplay = document.getElementById('input-display');
  inputDisplay.value = result;
  str = result;
  lastButtonWasAnEqual = true;
};

module.exports = {
  printToDisplay,
  validateStringToDisplay,
  onNumberPressed,
  onSymbolPressed,
};
