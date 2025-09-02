import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./helpers.css";

const DynamicDropdown = ({
  options = [],
  defaultOption = "Select an option",
  label = "Select",
  onSelect = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  // Generate a route path from the option text
  const getRoutePath = (option) => {
    return `/inquiry/${option.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>
          {label}: {selectedOption}
        </span>
        {isOpen ? (
          <FaChevronUp className="dropdown-icon" />
        ) : (
          <FaChevronDown className="dropdown-icon" />
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-menu1">
          {options.map((option, index) => (
            <li key={index} className="dropdown-item1">
              <Link
                to={getRoutePath(option)}
                onClick={() => handleOptionClick(option)}
                className="dropdown-link"
              >
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DynamicDropdown;
