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
      const result = this.operate();
      if (Number.isNaN(result)) {
        this.handleAllClearClick();
        dom.calculatorDisplay.textContent = 'Error';
      } else {
        this.operandA = result.toString();
        this.operandB = '';
        this.operator = null;
        dom.determineDisplayOutput();
      }
    }
  },
  handleAllClearClick() {
    this.operandA = '0';
    this.operandB = '';
    this.operator = null;
    dom.determineDisplayOutput();
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

dom.determineDisplayOutput();
addEventListeners();
