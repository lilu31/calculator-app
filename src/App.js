import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const handleNumber = (number) => {
    if (waitingForSecondNumber) {
      setDisplay(String(number));
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === '0' ? String(number) : display + number);
    }
  };

  const handleOperation = (op) => {
    if (operation && !waitingForSecondNumber) {
      calculate();
    }
    setFirstNumber(display);
    setOperation(op);
    setWaitingForSecondNumber(true);
  };

  const calculate = () => {
    if (!operation || !firstNumber) return;
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num2 !== 0 ? num1 / num2 : 'Error';
        break;
      case '%':
        result = (num1 * num2) / 100;
        break;
      case 'x²':
        result = num1 * num1;
        break;
      case '√':
        result = Math.sqrt(num1);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setOperation(null);
    setFirstNumber('');
    setWaitingForSecondNumber(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation(null);
    setWaitingForSecondNumber(false);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePlusMinus = () => {
    setDisplay(String(-parseFloat(display)));
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="keypad">
          <button onClick={clearDisplay} className="special">AC</button>
          <button onClick={handlePlusMinus} className="special">±</button>
          <button onClick={() => handleOperation('%')} className="special">%</button>
          <button onClick={() => handleOperation('÷')} className="operation">÷</button>

          <button onClick={() => handleNumber(7)}>7</button>
          <button onClick={() => handleNumber(8)}>8</button>
          <button onClick={() => handleNumber(9)}>9</button>
          <button onClick={() => handleOperation('×')} className="operation">×</button>

          <button onClick={() => handleNumber(4)}>4</button>
          <button onClick={() => handleNumber(5)}>5</button>
          <button onClick={() => handleNumber(6)}>6</button>
          <button onClick={() => handleOperation('-')} className="operation">-</button>

          <button onClick={() => handleNumber(1)}>1</button>
          <button onClick={() => handleNumber(2)}>2</button>
          <button onClick={() => handleNumber(3)}>3</button>
          <button onClick={() => handleOperation('+')} className="operation">+</button>

          <button onClick={() => handleOperation('x²')} className="special">x²</button>
          <button onClick={() => handleNumber(0)}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={calculate} className="operation">=</button>
        </div>
      </div>
    </div>
  );
}

export default App; 