# Calculator App

This project is a simple calculator app built with React. It allows users to perform basic mathematical operations such as addition, subtraction, multiplication, and division. The app interacts with a smart contract deployed on the Ethereum blockchain to perform the calculations.

## Features

- Perform addition, subtraction, multiplication, and division operations
- Input two numbers for the calculations
- Display the result of the calculation
- Track the number of times the calculator has been used

## Prerequisites

To run this project, you need the following:

- Node.js installed on your machine
- An Ethereum wallet with MetaMask extension installed in your browser
- Access to the Ethereum network (mainnet, testnet, etc.)

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

npm install

4. Start the development server:

npm start

5. Open your browser and go to `http://localhost:3000` to access the calculator app.

## Usage

1. Connect MetaMask: Click the "Connect" button to connect the app to your MetaMask wallet. Make sure you have a wallet active in MetaMask and it is connected to the appropriate Ethereum network.

2. Enter Numbers: Input the first number in the "number a" field and the second number in the "number b" field.

3. Select Operation: Choose the desired operation from the drop-down menu. The available options are addition, subtraction, multiplication, and division.

4. Calculate: Click the "Calculate" button to perform the selected operation on the two input numbers. The result will be displayed in the "result" field.

5. Track Usage: If you are connected to MetaMask, the number of times the calculator has been used will be displayed below the "Calculate" button.

## Notes

- The app uses the Web3 library to interact with the Ethereum network and the smart contract. The contract address and ABI are provided in the code.
- The smart contract used by the app should implement the required mathematical operations (addition, subtraction, multiplication, division) and a function to track the usage count.
- Ensure that MetaMask is properly configured and connected to the desired Ethereum network.
- This project is for educational purposes and serves as a basic example of integrating a smart contract with a React app. Further enhancements and improvements can be made based on specific requirements and use cases.
