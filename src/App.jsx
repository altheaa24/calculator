import React, { useState } from "react";
import "./App.css";

function Display({ value }) {
  return (
    <div className="calculator-display">
      {value}
    </div>
  );
}

function Button({ label, className = "", onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [firstOperand, setFirstOperand] = useState("");
  const [isNameDisplayed, setIsNameDisplayed] = useState(false);
  const FULL_NAME = "Althea Luriz";

  const handleNumberClick = (label) => {
    if (isNameDisplayed) {
      handleClearClick();
      setIsNameDisplayed(false);
    }

    let newOperand = operand;
    if (operand === "" && label === "0") {
      newOperand = "0";
    } else if (operand === "0") {
      newOperand = label;
    } else {
      newOperand = operand + label;
    }
    setOperand(newOperand);
    setDisplay(newOperand);
  };

  const handleOperatorClick = (op) => {
    if (isNameDisplayed) return;

    if (operand !== "") {
      setFirstOperand(operand);
      setOperator(op);
      setOperand("");
    }
  };

  const handleClearClick = () => {
    setOperand("");
    setOperator("");
    setFirstOperand("");
    setDisplay("0");
    setIsNameDisplayed(false);
  };

  const handleEqualsClick = () => {
    if (isNameDisplayed) return;

    if (firstOperand !== "" && operator !== "" && operand !== "") {
      let result = 0;
      const a = parseFloat(firstOperand);
      const b = parseFloat(operand);

      const jsOperator = operator === '÷' ? '/' : operator === '*' ? '*' : operator;

      if (jsOperator === "+") {
        result = a + b;
      } else if (jsOperator === "-") {
        result = a - b;
      } else if (jsOperator === "*") {
        result = a * b;
      } else if (jsOperator === "/") {
        if (b === 0) {
          setDisplay("Error");
          setOperand("");
          setOperator("");
          setFirstOperand("");
          return;
        }
        result = a / b;
      }

      const resultString = result.toString();
      setDisplay(resultString);
      setOperand(resultString);
      setOperator("");
      setFirstOperand("");
    }
  };

  const handleCustomButtonClick = () => {
    setDisplay(FULL_NAME);
    setIsNameDisplayed(true);
    setOperand("");
    setOperator("");
    setFirstOperand("");
  };

  const getButtonClass = (label) => {
    if (label === 'C') return 'clear-button';
    if (label === '=') return 'equals-button';
    if (['÷', '*', '-', '+'].includes(label)) return 'operator-button';
    return 'number-button';
  };

  return (
    <div className="calculator-page">
      <h1>Calculator of Althea Luriz - IT3A</h1>

      <div className="calculator-body">

        <Display value={display} />

        <div className="calculator-buttons">

          <Button label="7" className={getButtonClass('7')} onClick={() => handleNumberClick("7")} />
          <Button label="8" className={getButtonClass('8')} onClick={() => handleNumberClick("8")} />
          <Button label="9" className={getButtonClass('9')} onClick={() => handleNumberClick("9")} />
          <Button label="÷" className={getButtonClass('÷')} onClick={() => handleOperatorClick("÷")} />

          <Button label="4" className={getButtonClass('4')} onClick={() => handleNumberClick("4")} />
          <Button label="5" className={getButtonClass('5')} onClick={() => handleNumberClick("5")} />
          <Button label="6" className={getButtonClass('6')} onClick={() => handleNumberClick("6")} />
          <Button label="*" className={getButtonClass('*')} onClick={() => handleOperatorClick("*")} />

          <Button label="1" className={getButtonClass('1')} onClick={() => handleNumberClick("1")} />
          <Button label="2" className={getButtonClass('2')} onClick={() => handleNumberClick("2")} />
          <Button label="3" className={getButtonClass('3')} onClick={() => handleNumberClick("3")} />
          <Button label="-" className={getButtonClass('-')} onClick={() => handleOperatorClick("-")} />

          <Button label="C" className={getButtonClass('C')} onClick={handleClearClick} />
          <Button label="0" className={getButtonClass('0')} onClick={() => handleNumberClick("0")} />
          <Button label="=" className={getButtonClass('=')} onClick={handleEqualsClick} />
          <Button label="+" className={getButtonClass('+')} onClick={() => handleOperatorClick("+")} />
        </div>
        <div className="custom-button-container">
          <button className="custom-button" onClick={handleCustomButtonClick}>LURIZ</button>
        </div>

      </div>
    </div>
  );
}