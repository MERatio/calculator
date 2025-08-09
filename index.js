'use strict';

const dom = {
  calculatorDisplay: document.querySelector('#calculatorDisplay'),
  numbersBtn: document.querySelectorAll('[data-number]'),
  operatorsBtn: document.querySelectorAll('[data-operator]'),
  equalsBtn: document.querySelector('#equalsBtn'),
  allClearBtn: document.querySelector('#allClearBtn'),
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
  handleNumbersBtnClick(e) {
    const numberStr = e.currentTarget.dataset.number;
    const targetOperand = this.operator === null ? 'operandA' : 'operandB';
    if (this[targetOperand] === '0') {
      this[targetOperand] = numberStr;
    } else {
      this[targetOperand] += numberStr;
    }

    dom.determineDisplayOutput();
  },
  handleOperatorClick(e) {
    const operator = e.currentTarget.dataset.operator;
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
        this.handleEqualsClick();
        this.operator = operator;
      }
    }
    dom.determineDisplayOutput();
  },
  handleEqualsClick() {
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
        this.handleAllClearClick();
        dom.calculatorDisplay.textContent = 'Error';
      } else {
        this.operandA = roundNumber(result, 11).toString();
        this.operandB = '';
        this.operator = null;
        dom.determineDisplayOutput();
      }
    }
  },
  handleAllClearClick() {
    dom.calculatorDisplay.textContent = '0';
    this.operandA = '';
    this.operandB = '';
    this.operator = null;
  },
};

function addEventListeners() {
  for (const numberBtn of dom.numbersBtn) {
    numberBtn.addEventListener('click', (e) =>
      calculator.handleNumbersBtnClick(e)
    );
  }

  for (const operatorBtn of dom.operatorsBtn) {
    operatorBtn.addEventListener('click', (e) =>
      calculator.handleOperatorClick(e)
    );
  }

  dom.equalsBtn.addEventListener('click', () => calculator.handleEqualsClick());
  dom.allClearBtn.addEventListener('click', () =>
    calculator.handleAllClearClick()
  );
}

addEventListeners();
