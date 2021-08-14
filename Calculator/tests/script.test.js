const functions = require('../script');

describe('Calculator - validacao da obtencao de informacoes', () => {
  test('printToDisplay - Verifica se o valor passado por argumento e uma string', () => {
    const mockPrintToDisplay = jest.fn(string => {
      if (typeof string !== "string") throw Error('Argumento invalido: not a string');
    });

    const arg1 = 'string';
    const arg2 = '';
    const arg3 = 45;

    expect(() => mockPrintToDisplay(arg1)).not.toThrow();
    expect(() => mockPrintToDisplay(arg2)).not.toThrow();
    expect(() => mockPrintToDisplay(arg3)).toThrow('Argumento invalido: not a string');
  })

  test('onNumberPressed - Verifica se o valor passado por argumento e valido', () => {
    const mockOnNumberPressed = jest.fn(object => {
      if (!object.value) throw Error('Botao numerico retorna valor invalido!');
    })

    let botaoMock = { 'value': '7' };

    expect(() => mockOnNumberPressed(botaoMock)).not.toThrow();

    botaoMock = { 'v': '7' };

    expect(() => mockOnNumberPressed(botaoMock)).toThrow('Botao numerico retorna valor invalido!');
  })

  test('onSymbolPressed - Verifica se o valor passado por argumento e valido', () => {
    const mockOnSymbolPressed = jest.fn(object => {
      if (!object.value) throw Error('Botao de simbolo retorna valor invalido!');
    })

    let botaoMock = { 'value': '*' };

    expect(() => mockOnSymbolPressed(botaoMock)).not.toThrow();

    botaoMock = { 'v': '*' };

    expect(() => mockOnSymbolPressed(botaoMock)).toThrow('Botao de simbolo retorna valor invalido!');
  });

  test('validateStringToDisplay - Verifica se a funcao retorna espacos entre simbolos e se rejeita valores invalidos', () => {
    const mockValidateStringToDisplay = jest.fn(string => {
      if (typeof string !== "string") throw Error('Argumento invalido: not a string');

      if (string.length === 1) {
        if (string === '*' || string === '/' || string === '+') {
          return '';
        };
        return string;
      };

      switch (string[string.length - 1]) {
        case '-':
          let caseMinus = '';
          if (string[0] === '-') {
            caseMinus = '-';
            string = string.slice(1, string.length)
          };
          if ((/(?<=\d)\-/g).test(string) === false) {
            string = caseMinus + string;
            return string.substring(0, string.length - 1);
          }
          string = string.replace(/(?<=\d)\-/g, ' - ');
          string = caseMinus + string;
          break;
        case '+':
          if ((/(?<=\d)\+/g).test(string) === false) {
            return string.substring(0, string.length - 1);
          }
          string = string.replace(/(?<=\d)\+/g, ' + ');
          break;
        case '*':
          if ((/(?<=\d)\*/g).test(string) === false) {
            return string.substring(0, string.length - 1);
          }
          string = string.replace(/(?<=\d)\*/g, ' * ');
          break;
        case '/':
          if ((/(?<=\d)\//g).test(string) === false) {
            return string.substring(0, string.length - 1);
          }
          string = string.replace(/(?<=\d)\//g, ' / ');
          break;
      };

      return string;
    });
    
    const argumentos = [23, 'string', '123+', '-123', '/', '*', '+'];

    expect(() => mockValidateStringToDisplay(argumentos[0])).toThrow('Argumento invalido: not a string');
    expect(mockValidateStringToDisplay(argumentos[1])).toBe('string');
    expect(mockValidateStringToDisplay(argumentos[2])).toBe('123 + ');
    expect(mockValidateStringToDisplay(argumentos[3])).toBe('-123');
    expect(mockValidateStringToDisplay(argumentos[4])).toBe('');
    expect(mockValidateStringToDisplay(argumentos[5])).toBe('');
    expect(mockValidateStringToDisplay(argumentos[6])).toBe('');
  });

  test('onEqualsPressed - Verifica se o resultado retornado e compativel com a operacao passada', () => {
    const { onEqualsPressed } = functions;

    
  });

})
