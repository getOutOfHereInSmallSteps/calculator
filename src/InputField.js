import React from 'react';

export const InputField = ({ value, children, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={children}
      className="form-control"
    />
  );
};
