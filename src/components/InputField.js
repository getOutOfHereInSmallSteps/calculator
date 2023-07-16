import React from 'react';

export const InputField = ({ value, children, setValue }) => {
  const inputChangeHandler = e => {
    const inputValue = e.target.value;
    if (isNaN(+inputValue) || !inputValue === '') return;

    if (setValue) setValue(inputValue.trim());
  };

  return (
    <React.Fragment>
      <input
        value={value}
        onChange={inputChangeHandler}
        placeholder={children}
        className={`form-control ${'is-invalid'}`}
        required
      />
      <div className="invalid-feedback">Error</div>
    </React.Fragment>
  );
};
