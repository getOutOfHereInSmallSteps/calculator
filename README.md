# Calculator App

This is a simple calculator application built with React. It allows users to perform basic arithmetic operations on two numbers. The application also integrates with the MetaMask extension to interact with a smart contract deployed on the Ethereum blockchain.

## Features

- Input fields for entering two numbers (number a and number b)
- Operation selector to choose the desired arithmetic operation (add, subtract, multiply, divide)
- Validation of input values and error messages for invalid inputs
- Calculation of the result based on the selected operation
- Display of the calculated result
- Usage count of the calculator, retrieved from the smart contract
- Connection with MetaMask extension to interact with the smart contract

## Prerequisites

Before running the application, make sure you have the following:

- Node.js and npm (Node Package Manager) installed on your machine
- MetaMask extension installed in your browser

## Installation

1. Clone the repository:

```bash
git clone https://github.com/getOutOfHereInSmallSteps/calculator.git
```

2. Navigate to the project directory:

```bash
cd crypto-calc
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and visit `http://localhost:3000` to access the calculator application.

## Usage

1. Enter a valid number in the "number a" input field.
2. Choose an operation from the operation selector.
3. Enter a valid number in the "number b" input field.
4. Click the "Calculate" button to perform the operation and display the result.
5. The usage count of the calculator will be shown below the "Calculate" button.
6. If you have the MetaMask extension installed, it will attempt to connect to it. If the connection is successful, the calculator will use the deployed smart contract to perform calculations. Otherwise, an error message will be displayed.
7. If you don't have the MetaMask extension installed, a message with a download link will be shown.

## Acknowledgements

The calculator app is based on the [React](https://reactjs.org/) framework and uses [Bootstrap](https://getbootstrap.com/) for styling. It integrates with the [MetaMask](https://metamask.io/) extension and interacts with a smart contract deployed on the Ethereum blockchain.
