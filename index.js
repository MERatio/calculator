'use strict';

const dom = {
  numbersBtn: document.querySelectorAll('[data-number]'),
  operatorsBtn: document.querySelectorAll('[data-operator]'),
  equalsBtn: document.querySelector('#equalsBtn'),
  determineDisplayOutput() {
    const calculatorDisplay = document.querySelector('#calculatorDisplay');
    calculatorDisplay.textContent = calculator.operandA;
    if (calculator.operator) {
      calculatorDisplay.textContent += ' ' + calculator.operator;
      if (calculator.operandB) {
        calculatorDisplay.textContent += ' ' + calculator.operandB;
      }
    }
  },
};

const calculator = {
  operandA: '0',
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
    if (this.operator === null) {
      if (this.operandA === '0') {
        this.operandA = numberStr;
      } else {
        this.operandA += numberStr;
      }
    } else {
      if (this.operandB === '0') {
        this.operandB = numberStr;
      } else {
        this.operandB += numberStr;
      }
    }
    dom.determineDisplayOutput();
  },
  handleOperatorClick(e) {
    const operator = e.currentTarget.dataset.operator;
    if (this.operator === null) {
      this.operator = operator;
    } else {
      if (this.operandB === '') {
        return;
      } else {
        this.handleEqualsClick();
        this.operator = operator;
      }
    }
    dom.determineDisplayOutput();
  },
  handleEqualsClick() {
    if (this.operator && this.operandB) {
      this.operandA = this.operate().toString();
      this.operandB = '';
      this.operator = null;
      dom.determineDisplayOutput();
    }
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
}

dom.determineDisplayOutput();
addEventListeners();
