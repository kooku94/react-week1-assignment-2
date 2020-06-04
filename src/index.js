/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

class Calculator {
  constructor() {
    this.viewNumber = 0;
    this.currentNumber = 0;
    this.operatNumber = 0;
    this.operator = null;
  }

  set setViewNumber(value) {
    this.viewNumber = value;
  }

  set setCurrentNumber(value) {
    this.currentNumber = this.currentNumber ? (this.currentNumber += value) : value;
  }

  set setOperatNumber(value) {
    this.operatNumber = this.operatNumber ? (this.operatNumber += value) : value;
  }

  reset() {
    this.viewNumber = 0;
    this.currentNumber = 0;
    this.operator = null;
    this.operatNumber = 0;
  }

  setNumber(value) {
    if (!this.operator) {
      this.setCurrentNumber = value;
      this.setViewNumber = this.currentNumber;
    } else {
      this.setOperatNumber = value;
      this.setViewNumber = this.operatNumber;
    }
  }

  setOperator(sign) {
    if (this.operator) {
      this.operator === '+' && this.plus();
      this.operator === '-' && this.minus();
      this.operator === '*' && this.multi();
      this.operator === '/' && this.division();
      this.operator === '=' && this.result();

      this.operatorCommon();
    }
    this.operator = sign;
  }

  plus() {
    this.currentNumber = parseInt(this.currentNumber, 10) + parseInt(this.operatNumber, 10);
  }

  minus() {
    this.currentNumber -= this.operatNumber;
  }

  multi() {
    this.currentNumber *= this.operatNumber;
  }

  division() {
    this.currentNumber /= this.operatNumber;
  }

  result() {
    this.reset();
  }

  operatorCommon() {
    this.viewNumber = this.currentNumber;
    this.operatNumber = 0;
  }
}

const calculator = new Calculator();
function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <h1 id="result">{calculator.viewNumber}</h1>
      <div>
        {[...Array(10).keys()].map((number) => (
          <button
            type="button"
            onClick={() => {
              calculator.setNumber(`${number}`);
              render();
            }}
          >
            {number}
          </button>
        ))}
      </div>

      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button
            type="button"
            onClick={() => {
              calculator.setOperator(operator);
              render();
            }}
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
