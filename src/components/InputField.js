import React from 'react';

export const InputField = ({
  value,
  children,
  setValue,
  errorMessage,
  onTouch,
}) => {
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
        onBlur={() => onTouch(true)}
        placeholder={children}
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
        required
      />
      {errorMessage ? (
        <div className="invalid-feedback">{errorMessage}</div>
      ) : null}
    </React.Fragment>
  );
};
