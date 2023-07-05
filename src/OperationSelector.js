import React from 'react';

export const OperationSelector = ({ operation, setOperation }) => {
  const selectOperationHandler = e => {
    const selectedOperation = e.target.value;

    setOperation(selectedOperation);
  };

  return (
    <select value={operation} onChange={selectOperationHandler}>
      <option value="add">Add +</option>
      <option value="subtract">Subtract -</option>
      <option value="multiply">Multiply x</option>
      <option value="divide">Divide :</option>
    </select>
  );
};
