import './App.css';

function App() {
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
      <p>Calculator used: 100 times</p>
    </div>
  );
}

export default App;
