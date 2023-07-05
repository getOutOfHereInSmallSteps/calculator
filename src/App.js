import React, { useState } from 'react';

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  return (
    <div className="App">
      <input placeholder="number a" />
      <select>
        <option>+</option>
        <option>-</option>
        <option>x</option>
        <option>:</option>
      </select>
      <input placeholder="number b" />
      <input placeholder="result" disabled />
      <button>Calculate</button>

      {isConnected && <p>Calculator used: {usageCount} times</p>}
    </div>
  );
}

export default App;
