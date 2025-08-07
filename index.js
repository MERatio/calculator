'use strict';

const calculator = {
  operandA: null,
  operandB: null,
  operator: null,
  add(operandA, operandB) {
    return operandA + operandB;
  },
  subtract(operandA, operandB) {
    return operandA - operandB;
  },
  multiply(operandA, operandB) {
    return operandA * operandB;
  },
  divide(operandA, operandB) {
    return operandA / operandB;
  },
  operate(operandA, operandB, operator) {
    switch (operator) {
      case '+':
        return this.add(operandA, operandB);
      case '-':
        return this.subtract(operandA, operandB);
      case '*':
        return this.multiply(operandA, operandB);
      case '/':
        return this.divide(operandA, operandB);
    }
  },
};
