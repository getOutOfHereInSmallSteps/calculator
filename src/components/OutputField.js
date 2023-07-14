import React from 'react';

export const OutputField = ({ value }) => {
  return (
    <input
      className="form-control"
      value={value}
      placeholder="result"
      disabled
    />
  );
};
