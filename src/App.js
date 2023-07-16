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
  const [valueAError, setValueAError] = useState('');
  const [valueBError, setValueBError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputAIsTocuhed, setInputAIsTouched] = useState(false);
  const [inputBIsTocuhed, setInputBIsTouched] = useState(false);

  const {
    contract,
    isMetaMask,
    isConnected,
    accounts,
    connectMetamaskHandler,
  } = useContractInitialization(CalculatorContractABI, contractAddress);

  useEffect(() => {
    if (!isMetaMask || !isConnected) return;
    if (!inputAIsTocuhed && !inputBIsTocuhed) return;

    const isValid = validateA() && validateB() && operation;
    setIsFormValid(isValid);
  }, [valueA, valueB, operation, isConnected, isMetaMask]);

  useEffect(() => {
    if (contract) {
      fetchUsageCount();
    }
  }, [contract]);

  const validateA = () => {
    const a = +valueA;
    const b = +valueB;

    if (a < b && operation === 'subtract') {
      setValueAError('Number a cannot be less than number b');
      return false;
    } else if (a + b < 0 && operation === 'add') {
      setValueAError('The result of an operation cannot be less than zero');
      return false;
    } else if (!valueA) {
      setValueAError('Choose a valid value to proceed');
      return false;
    }

    setValueAError('');
    return true;
  };

  const validateB = () => {
    const b = +valueB;

    if (!valueB) {
      setValueBError('Choose a valid value to proceed');
      return false;
    } else if (b === 0 && operation === 'divide') {
      setValueBError('Division by zero is not allowed');
      return false;
    }

    setValueBError('');
    return true;
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

  return (
    <div className="container app">
      <h1>Calculator</h1>

      <div className="row">
        <div className="col">
          <InputField
            value={valueA}
            setValue={setValueA}
            errorMessage={valueAError}
            onTouch={setInputAIsTouched}
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
            setValue={setValueB}
            errorMessage={valueBError}
            onTouch={setInputBIsTouched}
          >
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

      {isMetaMask && !isConnected && (
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
