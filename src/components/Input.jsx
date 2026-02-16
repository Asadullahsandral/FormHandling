import React from "react";

function Input({ label, id, name, value, onChange, type, error }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Input;
