'use strict';

const dom = {
  calculatorDisplay: document.querySelector('#calculatorDisplay'),
  numbersBtn: document.querySelectorAll('[data-number]'),
  operatorsBtn: document.querySelectorAll('[data-operator]'),
  equalsBtn: document.querySelector('#equalsBtn'),
  allClearBtn: document.querySelector('#allClearBtn'),
  decimalPointBtn: document.querySelector('#decimalPointBtn'),
  backspaceBtn: document.querySelector('#backspaceBtn'),
  determineDisplayOutput() {
    this.calculatorDisplay.textContent = calculator.operandA;
    if (calculator.operator) {
      this.calculatorDisplay.textContent += ' ' + calculator.operator;
      if (calculator.operandB) {
        this.calculatorDisplay.textContent += ' ' + calculator.operandB;
      }
    }
  },
};

const calculator = {
  operandA: '',
  operandB: '',
  operator: null,
  resultIsDisplayed: false,
  operate() {
    const a = parseFloat(this.operandA);
    const b = parseFloat(this.operandB);
    switch (this.operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
    }
  },
  inputNumber(numberStr) {
    if (this.resultIsDisplayed) {
      this.inputAllClear();
    }
    const targetOperand = this.operator === null ? 'operandA' : 'operandB';
    if (this[targetOperand] === '0') {
      this[targetOperand] = numberStr;
    } else {
      this[targetOperand] += numberStr;
    }

    dom.determineDisplayOutput();
  },
  inputOperator(operator) {
    if (this.operator === null) {
      if (this.operandA === '') {
        if (operator === '-') {
          this.operandA = '-';
        } else {
          this.operandA = '0';
          this.operator = operator;
        }
      } else if (this.operandA === '-') {
        return;
      } else {
        this.operator = operator;
      }
    } else {
      if (this.operandB === '' && operator === '-') {
        this.operandB = '-';
      } else if (this.operandB === '-') {
        return;
      } else {
        this.inputEquals();
        if (dom.calculatorDisplay.textContent === 'Error') {
          return;
        } else {
          this.operator = operator;
        }
      }
    }
    this.resultIsDisplayed = false;
    dom.determineDisplayOutput();
  },
  inputEquals() {
    if (this.operandB === '-') {
      return;
    }

    function roundNumber(value, decimals) {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    }

    if (this.operator && this.operandB) {
      const result = this.operate();
      if (Number.isNaN(result)) {
        this.inputAllClear();
        dom.calculatorDisplay.textContent = 'Error';
      } else {
        this.operandA = roundNumber(result, 11).toString();
        this.operandB = '';
        this.operator = null;
        dom.determineDisplayOutput();
        this.resultIsDisplayed = true;
      }
    }
  },
  inputAllClear() {
    dom.calculatorDisplay.textContent = '0';
    this.operandA = '';
    this.operandB = '';
    this.operator = null;
    this.resultIsDisplayed = false;
  },
  inputDecimalPoint() {
    const targetOperand = this.operator === null ? 'operandA' : 'operandB';
    if (this[targetOperand].includes('.')) {
      return;
    }

    if (this.resultIsDisplayed) {
      this.inputAllClear();
    }
    if (this[targetOperand] === '') {
      this[targetOperand] = '.';
    } else {
      this[targetOperand] += '.';
    }
    dom.determineDisplayOutput();
  },
  inputBackspace() {
    if (this.operandA === '' || calculator.resultIsDisplayed) {
      this.inputAllClear();
      return;
    }

    if (this.operandB !== '') {
      this.operandB = this.operandB.slice(0, -1);
    } else if (this.operator) {
      this.operator = null;
    } else if (this.operandA.length === 1) {
      this.inputAllClear();
      return;
    } else if (this.operandA !== '') {
      this.operandA = this.operandA.slice(0, -1);
    }
    dom.determineDisplayOutput();
  },
};

function addEventListeners() {
  for (const numberBtn of dom.numbersBtn) {
    numberBtn.addEventListener('click', (e) =>
      calculator.inputNumber(e.currentTarget.dataset.number)
    );
  }

  for (const operatorBtn of dom.operatorsBtn) {
    operatorBtn.addEventListener('click', (e) =>
      calculator.inputOperator(e.currentTarget.dataset.operator)
    );
  }

  dom.equalsBtn.addEventListener('click', () => calculator.inputEquals());
  dom.allClearBtn.addEventListener('click', () => calculator.inputAllClear());
  dom.decimalPointBtn.addEventListener('click', () =>
    calculator.inputDecimalPoint()
  );
  dom.backspaceBtn.addEventListener('click', () => calculator.inputBackspace());

  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/\d/.test(key)) {
      calculator.inputNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      calculator.inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
      calculator.inputEquals();
    } else if (key === '.') {
      calculator.inputDecimalPoint();
    } else if (key === 'Backspace') {
      calculator.inputBackspace();
    }
  });
}

addEventListeners();
