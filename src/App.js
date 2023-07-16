import React, { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import CalculatorContractABI from './contracts/ContractABI.json';

import { InputField } from './components/InputField';
import { OperationSelector } from './components/OperationSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { OutputField } from './components/OutputField';

import useContractInitialization from './hooks/useContractInitialization';

const contractAddress = '0x1851ffBce02A134eFd9ddBC91920b0c6DCEfB6f5';

function App() {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isFormValid, setIsFormValid] = useState(true);

  const {
    contract,
    isMetaMask,
    isConnected,
    accounts,
    connectMetamaskHandler,
  } = useContractInitialization(CalculatorContractABI, contractAddress);

  const validator1 = () => {
    if (valueA < valueB && operation === 'subtract') {
      setIsFormValid(false);
      return 'Number a can not be less than number b';
    } else if (valueA + valueB < 0 && operation === 'add') {
      setIsFormValid(false);
      return 'The result of an operation can not be less that zero';
    } else if (!valueA) {
      setIsFormValid(false);
      return 'Choose a valid value to proceed';
    }

    setIsFormValid(true);
  };

  const validator2 = () => {
    if (valueB === 0 && operation === 'divide') {
      setIsFormValid(false);
      return 'Division by zero is not allowed';
    } else if (!valueB) {
      setIsFormValid(false);
      return 'Choose a valid value to proceed';
    }
    setIsFormValid(true);
  };

  const validator3 = () => {
    if (!operation) {
      setIsFormValid(false);
      return 'Select a valud operation to proceed';
    }

    setIsFormValid(true);
  };

  const fetchUsageCount = async () => {
    try {
      const count = await contract.methods
        .usageCount()
        .call({ from: accounts[0] });
      const countNum = parseInt(count);

      setUsageCount(countNum);
    } catch (e) {
      console.error('Something went wrong: ' + e);
    }
  };

  const calculateHandler = async () => {
    try {
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
    } catch (e) {
      console.error(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchUsageCount();
    }
  }, [contract]);

  return (
    <div className="container app">
      <h1>Calculator</h1>
      <div className="row">
        <div className="col">
          <InputField value={valueA} setValue={setValueA}>
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
          <InputField value={valueB} setValue={setValueB}>
            number b
          </InputField>
        </div>
      </div>

      <div className="row mt-3 mb-3">
        <div className="col">
          <OutputField value={result} />
        </div>
      </div>

      {isConnected && (
        <React.Fragment>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={calculateHandler}
                disabled={!isFormValid}
              >
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
      )}

      {!isConnected && isMetaMask && (
        <React.Fragment>
          <p>
            We detected MetaMask extension, but couldn't establish connection
          </p>
          <button
            className="btn btn-info mb-3"
            onClick={connectMetamaskHandler}
          >
            Connect MetaMask
          </button>
        </React.Fragment>
      )}

      {!isMetaMask && (
        <React.Fragment>
          <p>No MetaMask extension was detected.</p>
          <a href="https://metamask.io/download/" className="btn btn-info">
            Download here
          </a>
        </React.Fragment>
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;
