import React, { useEffect, useState } from 'react';

import './App.css';
import { InputField } from './InputField';
import { OperationSelector } from './OperationSelector';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const isMetaMask = true;

    if (isMetaMask) {
      setIsConnected(true);
    }
  }, []);

  const inputChangeHandler = (e, setter) => {
    const inputValue = e.target.value;
    setter(inputValue);
  };

  const calculateHandler = () => {
    // pesudocode setup
    // const res = contract[operation](a, b)
    // setResult(res);
    setResult('');
    // const usageCount = fetch(...)
    // setusageCount(usageCount)
    setUsageCount(prevCount => ++prevCount);
  };

  return (
    <div className="App">
      <InputField
        value={valueA}
        onChange={e => inputChangeHandler(e, setValueA)}
      >
        number a
      </InputField>
      <OperationSelector operation={operation} setOperation={setOperation} />
      <InputField
        value={valueB}
        onChange={e => inputChangeHandler(e, setValueB)}
      >
        number b
      </InputField>

      <input value={result} placeholder="result" disabled />

      {isConnected && (
        <React.Fragment>
          <button onClick={calculateHandler}>Calculate</button>
          <p>Calculator used: {usageCount} times</p>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
