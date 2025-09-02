import React from "react";
import "./helpers.css";
import { CiSearch } from "react-icons/ci";

const InputField = ({
  type,
  placeholder,
  buttonText,
  CiSearchIcon,
  InputButton,
  DynamicClassName,
  value,
  onChange,
}) => {
  return (
    <div className={`input_field ${DynamicClassName || ""}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {CiSearchIcon && (
        <div className="input_icons">
          <CiSearch style={{ fontSize: "2rem", color: "var(--black)" }} />
        </div>
      )}
      {InputButton && (
        <div className="input_button">
          <button>{buttonText}</button>
        </div>
      )}
    </div>
  );
};

export default InputField;
