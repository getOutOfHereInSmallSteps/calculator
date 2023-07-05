import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('');
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

  const onSelectOperation = e => {
    const selectedOperation = e.target.value;

    setOperation(selectedOperation);
  };

  const calculateHandler = () => {
    // pesudocode setup
    setResult('');
    // const usageCount = fetch(...)
    // setusageCount(usageCount)
    setUsageCount(prevCount => ++prevCount);
  };

  return (
    <div className="App">
      <input
        value={valueA}
        onChange={e => inputChangeHandler(e, setValueA)}
        placeholder="number a"
      />
      <select value={operation} onChange={onSelectOperation}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">x</option>
        <option value="divide">:</option>
      </select>

      <input
        value={valueB}
        onChange={e => inputChangeHandler(e, setValueB)}
        placeholder="number b"
      />
      <input value={result} placeholder="result" disabled />
      <button onClick={calculateHandler}>Calculate</button>
      {isConnected && <p>Calculator used: {usageCount} times</p>}
    </div>
  );
}

export default App;
