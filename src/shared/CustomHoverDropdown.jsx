import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomHoverDropdown.css";

const CustomHoverDropdown = ({ options = {} }) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleMouseEnter = (option) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  const getRoutePath = (option, item) => {
    // Normalize option by replacing spaces with hyphens and converting to lowercase
    const normalizedOption = option.toLowerCase().replace(/\s+/g, "-");
    // Normalize item by replacing spaces with hyphens and converting to lowercase
    const normalizedItem = item.toLowerCase().replace(/\s+/g, "-");
    return `/${normalizedOption}/${normalizedItem}`;
  };

  return (
    <div className="dropdown-minchedddd">
      <div className="dropdown-container1">
        {Object.keys(options).map((option) => (
          <div
            key={option}
            className="dropdown-option"
            onMouseEnter={() => handleMouseEnter(option)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
            {hoveredOption === option && (
              <div className="dropdown-menu">
                {options[option].map((item, index) => (
                  <Link
                    key={index}
                    to={getRoutePath(option, item)}
                    className="dropdown-item"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomHoverDropdown;
