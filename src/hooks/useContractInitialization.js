import { useEffect, useState } from 'react';

import Web3 from 'web3';
import { Contract } from 'web3';

const useContractInitialization = (contractABI, contractAddress) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const [isMetaMask, setIsMetaMask] = useState(null);

  const checkMetaMaskConnection = async () => {
    const accounts = await web3.eth.getAccounts();
    const isMetaMaskConnected = accounts.length > 0;
    setIsConnected(isMetaMaskConnected);
    setAccounts(accounts);
  };

  const connectMetamaskHandler = async () => {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setIsConnected(true);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    if (!window?.ethereum?.isMetaMask) {
      setIsMetaMask(false);
      return;
    } else {
      setIsMetaMask(true);
    }

    if (window?.ethereum?.isConnected()) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);

  useEffect(() => {
    if (!web3) return;
    checkMetaMaskConnection();

    if (!isConnected) return;

    const contract = new Contract(contractABI, contractAddress, web3);
    setContract(contract);
  }, [web3, isConnected]);

  return {
    web3,
    contract,
    isMetaMask,
    isConnected,
    accounts,
    connectMetamaskHandler,
  };
};

export default useContractInitialization;
