import React, { useState, useEffect } from "react";
import "./Calculator.css";

const data = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {data.map((el) => (
      <Key key={el.id} keyData={el} handleInput={handleInput} />
    ))}
  </div>
);

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculate, setCalculate] = useState("");

  const handleSubmit = () => {
    // eslint-disable-next-line no-eval
    const total = eval(calculate);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculate(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculate("");
  };

  const handleNumbers = (value) => {
    if (!calculate.length) {
      setInput(`${value}`);
      setCalculate(`${value}`);
    } else {
      if (value === 0 && (calculate === "0" || input === "0")) {
        setCalculate(`${calculate}`);
      } else {
        const lastCharact = calculate.charAt(calculate.length - 1);
        const isLastCharactOperator =
          lastCharact === "*" || operators.includes(lastCharact);

        setInput(isLastCharactOperator ? `${value}` : `${input}${value}`);
        setCalculate(`${calculate}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastCharact = calculate.charAt(calculate.length - 1);
    if (!calculate.length) {
      setInput("0.");
      setCalculate("0.");
    } else {
      if (lastCharact === "*" || operators.includes(lastCharact)) {
        setInput("0.");
        setCalculate(`${calculate} 0.`);
      } else {
        setInput(
          lastCharact === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastCharact === "." || input.includes(".")
            ? `${calculate}`
            : `${calculate}.`;
        setCalculate(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculate.length) {
      setInput(`${value}`);
      const beforeLastCharact = calculate.charAt(calculate.length - 2);

      const beforeLastCharactIsOperator =
        operators.includes(beforeLastCharact) || beforeLastCharact === "*";

      const lastCharact = calculate.charAt(calculate.length - 1);

      const lastCharactIsOperator =
        operators.includes(lastCharact) || lastCharact === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastCharactIsOperator && value !== "-") ||
        (beforeLastCharactIsOperator && lastCharactIsOperator)
      ) {
        if (beforeLastCharactIsOperator) {
          const updatedValue = `${calculate.substring(
            0,
            calculate.length - 2
          )}${value}`;
          setCalculate(updatedValue);
        } else {
          setCalculate(
            `${calculate.substring(0, calculate.length - 1)}${validOp}`
          );
        }
      } else {
        setCalculate(`${calculate}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculate);
  };

  React.useEffect(() => {
    handleOutput();
  }, [calculate]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default Calculator;
