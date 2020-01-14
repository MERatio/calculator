import React from 'react';
import ReactDOM from 'react-dom'
import './css/style.css';

function Buttons(props) {
  return (
    <div id="buttons-container">
      <button
        className="button"
        id="clear"
        value="AC"
        onClick={props.init}
      >
        AC
      </button>
      <button
        className="button"
        id="delete"
        value="CE"
        onClick={props.handleDelete}
      >
        CE
      </button>
      <button
        className="button"
        id="divide"
        value="/"
        onClick={props.handleOperators}
      >
        /
      </button>
      <button
        className="button"
        id="multiply"
        value="x"
        onClick={props.handleOperators}
      >
        x
      </button>
      <button
        className="button"
        id="seven"
        value="7"
        onClick={props.handleNumbers}
      >
        7
      </button>
      <button
        className="button"
        id="eight"
        value="8"
        onClick={props.handleNumbers}
      >
        8
      </button>
      <button
        className="button"
        id="nine"
        value="9"
        onClick={props.handleNumbers}
      >
        9
      </button>
      <button
        className="button"
        id="subtract"
        value="-"
        onClick={props.handleOperators}
      >
        -
      </button>
      <button
        className="button"
        id="four"
        value="4"
        onClick={props.handleNumbers}
      >
        4
      </button>
      <button
        className="button"
        id="five"
        value="5"
        onClick={props.handleNumbers}
      >
        5
      </button>
      <button
        className="button"
        id="six"
        value="6"
        onClick={props.handleNumbers}
      >
        6
      </button>
      <button
        className="button"
        id="add"
        value="+"
        onClick={props.handleOperators}
      >
        +
      </button>
      <button
        className="button"
        id="one"
        value="1"
        onClick={props.handleNumbers}
      >
        1
      </button>
      <button
        className="button"
        id="two"
        value="2"
        onClick={props.handleNumbers}
      >
        2
      </button>
      <button
        className="button"
        id="three"
        value="3"
        onClick={props.handleNumbers}
      >
        3
      </button>
      <button
        className="button"
        id="zero"
        value="0"
        onClick={props.handleNumbers}
      >
        0
      </button>
      <button
        className="button"
        id="decimal"
        value="."
        onClick={props.handleDecimal}
      >
        .
      </button>
      <button
        className="button"
        id="equals"
        value="="
        onClick={props.handleComputation}
      >
        =
      </button>
    </div>
  );
}

function Output(props) {
  return (
    <div id="display">{props.output}</div>
  );
}

// regex
const startsWithZero = /^0{1}/;
const startsWithNumber = /^\d/;
const endsWithNumber = /\d$/;
const endsWithOperator = /[+\-x/]$/;
const endsWithNegativeSign = /-$/;
const endsWithOperatorAndNegative = /[+\-x/]-$/;
const getLastNum = /\d+$|\d*\.\d*$/;
const hasOperator = /[+\-x/]/g;
const hasDecimal = /\./;
// isValidExpression is from https://regex101.com/library/vH5eL5
const isValidExpression = /^([-+]?[0-9]*\.?[0-9]+[\/\+\-\x])+([-+]?[0-9]*\.?[0-9]+)$|^[+-]?[0-9]+$/;

// main component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: false,
      computed: false,
      output: '0'
    };
    this.init = this.init.bind(this);
    this.handleWarning = this.handleWarning.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleComputation = this.handleComputation.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleWarning(msg) {
    this.setState({
      warning: true,
      output: msg
    });
  }

  handleNumbers(e) {
    if (!this.state.warning) { // if the output does not exceed the limit
      let { computed, output } = this.state;
      if (output.length > 21) { // if the output length is greter than 21
        this.handleWarning('Max Digit Limit');
        return;
      } 
      const number = e.target.value; // get the number that the user chose
      let lastNum = output.match(getLastNum); // get the last number in the expression
      if (computed) {
        this.setState({
          output: number,
          computed: false
        });
      } else {
          if (startsWithZero.test(lastNum) && lastNum[0].length === 1) {  // if the last number starts with 0 and its length is 1
            if (number !== 0) {
              output = output.replace(getLastNum, number) // replace the last number with the input number
              this.setState({output});
            } else { 
              return;
            }
        } else {
          this.setState({output: output + number});
        }
      }
    }
  }

  handleDecimal(e) {
    if (!this.state.warning) { // if the output does not exceed the limit
      const { computed, output } = this.state;
      if (output.length > 21) { // if the output length is greter than 21
        this.handleWarning('Max Digit Limit');
        return;
      }
      const decimal = e.target.value; // get the decimal number
      const lastNum = output.match(getLastNum); // get the last number
      if (computed) {
        this.setState({
          computed: false,
          output: '0.'
        });
      } else {
          if (hasOperator.test(output)) { // if the output has operator
          if (!lastNum) { // if there is not last number after an operator
            this.setState({output: output + '0.'});
          } else if (!hasDecimal.test(lastNum)) {
            this.setState({output: output + decimal});
          }
        } else if (!hasDecimal.test(output)) {  // if the expression does not have an decimal
          this.setState({output: output + decimal});
        } else if (startsWithZero.test(lastNum) && output.length === 1) { // if the output starts with 0 nad its length is 1
          this.setState({output: '0.'});
        } 
      }
    }
  }

  handleOperators(e) {
    let { output } = this.state;
    if (!this.state.warning) { // if the expression does not exceed the limit
      const operator = e.target.value; // get the operator that the user chose
      this.setState({computed: false});
      if (output.length > 21) { // if the output length is greter than 21
        this.handleWarning('Max Digit Limit');
        return;
      } else if (output.length === 1) {
        if (startsWithZero.test(output)) { // if the expression ends with 0
          if (operator === '+' || operator === '-') {
            this.setState({output: operator});
          } else {
            return;
          }
        } else if (startsWithNumber.test(output)) { // if the expression ends with a number
          this.setState({output: output + operator});
        } 
      } else if (endsWithNumber.test(output)) { // if the expression ends with a number
        this.setState({output: output + operator});
      } else if (endsWithOperatorAndNegative.test(output) && operator !== '-') { // if the expression has an operator and an negative sign after
        output = output.replace(/..$/, operator); // replace the last 2 operators with the input operator
        this.setState({output});
      } else if (endsWithOperator.test(output) && operator !== '-') { // if the expression ends with an operator and the input is not negative
        output = output.replace(/.$/, operator); // replace the last operator with the input that is not negative
        this.setState({output});
      } else if (!endsWithNegativeSign.test(output) && operator === '-') {
        this.setState({output: output + operator});
      }
    }
  }

  handleComputation() {
    if (!this.state.warning) {
      let output = this.state.output;
      let expression = output;
      if (isValidExpression.test(output)) {
        if (/x/g.test(expression)) {
          expression = expression.replace(/x/g, '*').replace(/-/g, '-');
        }
        let answer = parseFloat(eval(expression).toFixed(4).toString()); // toString() remove trailing zeroes in decimals if there is any
        if (answer.length > 21) {
          this.handleWarning('Max Digit Limit');
        } else {
          this.setState({
            output: answer.toString(),
            computed: true
          });
        }
      } else {
        this.handleWarning('Invalid Expression');
        return;
      }
    }
  }

  // CE, delete a character from the left
  handleDelete() {
    if (!this.state.warning) {
      let { output } = this.state;
      if (output.length > 1) {
        output = output.slice(0, -1); // get all the character except the last one
      } else {
        output = '0';
      }
      this.setState({output});
    }
  }

  // AC, initialize App component state
  init() {
    this.setState({
      warning: false,
      computed: false,
      output: '0'
    });
  }

  render() {
    return (
      <main>
        <div id="calculator">
          <Output output={this.state.output} />
          <Buttons 
          init={this.init}
          handleDelete={this.handleDelete}
          handleNumbers={this.handleNumbers}
          handleDecimal={this.handleDecimal}
          handleOperators={this.handleOperators}
          handleComputation={this.handleComputation} /> 
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));