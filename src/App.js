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

  const Input = ({ value, children, onChange }) => {
    return <input value={value} onChange={onChange} placeholder={children} />;
  };

  return (
    <div className="App">
      <Input value={valueA} onChange={e => inputChangeHandler(e, setValueA)}>
        number a
      </Input>
      <select value={operation} onChange={onSelectOperation}>
        <option value="add">Add +</option>
        <option value="subtract">Subtract -</option>
        <option value="multiply">Multiply x</option>
        <option value="divide">Divide :</option>
      </select>

      <input
        value={valueB}
        onChange={e => inputChangeHandler(e, setValueB)}
        placeholder="number b"
      />
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
