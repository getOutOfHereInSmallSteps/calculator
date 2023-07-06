import React, { useEffect, useState } from 'react';

import './App.css';
import { InputField } from './InputField';
import { OperationSelector } from './OperationSelector';

import Web3 from 'web3';

import { Contract } from 'web3';
import CalculatorContractABI from './ContractABI.json';

const contractAddress = '0x1851ffBce02A134eFd9ddBC91920b0c6DCEfB6f5';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const checkMetaMaskConnection = async () => {
    const accounts = await web3.eth.getAccounts();
    const isMetaMaskConnected = accounts.length > 0;
    setIsConnected(isMetaMaskConnected);
    setAccounts(accounts);
  };

  const fetchUsageCount = async () => {
    try {
      const count = await contract.methods
        .usageCount()
        .call({ from: accounts[0] });
      const countNum = parseInt(count);
      setUsageCount(countNum);
    } catch (e) {
      console.log('Something went wrong: ' + e);
    }
  };

  useEffect(() => {
    if (window.ethereum.isConnected()) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);

  useEffect(() => {
    if (!web3) return;
    checkMetaMaskConnection();

    if (!isConnected) return;

    const contract = new Contract(CalculatorContractABI, contractAddress, web3);
    setContract(contract);
  }, [web3, isConnected]);

  useEffect(() => {
    if (contract) {
      fetchUsageCount();
    }
  }, [contract]);

  const inputChangeHandler = (e, setter) => {
    const inputValue = e.target.value;
    setter(inputValue);
  };

  const calculateHandler = async () => {
    await contract.methods[operation](valueA, valueB).send({
      from: accounts[0],
    });
    const res = await contract.methods[operation](valueA, valueB).call();
    const resNum = parseInt(res);
    setResult(resNum);
    fetchUsageCount();
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
