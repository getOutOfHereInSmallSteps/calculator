import React, { useEffect, useState } from 'react';

import './App.css';
import { InputField } from './InputField';
import { OperationSelector } from './OperationSelector';

import Web3 from 'web3';

import { Contract } from 'web3';
import CalculatorContractABI from './ContractABI.json';

import { utils } from 'web3';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const contractAddress = '0x1851ffBce02A134eFd9ddBC91920b0c6DCEfB6f5';

  const checkMetaMaskConnection = () => {};

  useEffect(() => {
    if (window.ethereum._metamask.isUnlocked()) {
      setIsConnected(true);
      const web3 = new Web3(window.ethereum);
      console.log(window.ethereum);
      setWeb3(web3);
    }

    // web3.eth.getAccounts().then(res => setIsConnected(res.length > 0));
  }, []);

  useEffect(() => {
    if (web3) {
      const contract = new Contract(
        CalculatorContractABI,
        contractAddress,
        web3
      );

      setContract(contract);
      console.log(contract.methods);
    }
  }, [web3]);

  const test = async () => {
    if (contract) {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // const res = await contract.methods.add(1, 2).send({ from: accounts[0] });

      // console.log(utils.toBigInt(1));

      // const res = await contract.methods
      //   .divide(3n, 2n)
      //   .call({ from: accounts[0] });
      const res = await contract.methods
        .divide(3n, 2n)
        .send({ from: accounts[0] });

      const res2 = await contract.methods.usageCount().call();

      console.log('1: ' + parseInt(res2));

      console.log(contract);

      // console.log(res.events.Result.returnValues.result);

      console.log(parseInt('2: ' + res));
    }
  };

  useEffect(() => {
    test();
  }, [contract]);

  const inputChangeHandler = (e, setter) => {
    const inputValue = e.target.value;
    setter(inputValue);
  };

  const calculateHandler = () => {};

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
