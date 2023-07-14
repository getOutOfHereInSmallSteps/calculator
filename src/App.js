import React, { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { InputField } from './InputField';
import { OperationSelector } from './OperationSelector';

import Web3 from 'web3';

import { Contract } from 'web3';
import CalculatorContractABI from './ContractABI.json';

const contractAddress = '0x1851ffBce02A134eFd9ddBC91920b0c6DCEfB6f5';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!valueA || !valueB || isNaN(valueA) || isNaN(valueB)) return;
    setIsLoading(true);
    await contract.methods[operation](valueA, valueB).send({
      from: accounts[0],
    });
    const res = await contract.methods[operation](valueA, valueB).call();
    const resNum = parseInt(res);
    setResult(resNum);
    fetchUsageCount();
    setIsLoading(false);
  };

  return (
    <div className="container app">
      <h1>Calculator</h1>
      <div className="row">
        <div className="col">
          <InputField
            value={valueA}
            onChange={e => inputChangeHandler(e, setValueA)}
          >
            number a
          </InputField>
        </div>
        <div className="col">
          <OperationSelector
            operation={operation}
            setOperation={setOperation}
          />
        </div>
        <div className="col">
          <InputField
            value={valueB}
            onChange={e => inputChangeHandler(e, setValueB)}
          >
            number b
          </InputField>
        </div>
      </div>

      <div className="row mt-3 mb-3">
        <div className="col">
          <input
            className="form-control"
            value={result}
            placeholder="result"
            disabled
          />
        </div>
      </div>

      {isConnected ? (
        <React.Fragment>
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-primary" onClick={calculateHandler}>
                Calculate
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p>Calculator used: {usageCount} times</p>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>We detected MetaMask extension, but couldn't find connection</p>
          <button className="btn btn-info mb-3">Connect MetaMask</button>
        </React.Fragment>
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;
