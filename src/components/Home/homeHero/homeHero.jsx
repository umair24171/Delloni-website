import { BiSearch } from "react-icons/bi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"; // Added icons for arrows
import { useState } from "react";
import "./homeHero.css";

export default function HomeHero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ]; // Example locations

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="heroHomeBg">
        <div className="homeHero">
          <div className="homeHeroLeft">
            <div className="homeHeroInputs">
              <div className="homeheroTitle">
                <p>Search</p>
              </div>
              <div className="homeHeroInputbox">
                <BiSearch />
                <input type="text" />
              </div>
              <div className="homeheroTitle">
                <p>Choose Location</p>
              </div>
              <div className="homeHeroInputbox locationInputWrapper">
                <BiSearch />
                <input
                  type="text"
                  value={selectedLocation}
                  onClick={toggleDropdown}
                  readOnly
                />
                <div className="arrowIcons">
                  {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {isDropdownOpen && (
                  <div className="locationDropdown">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="locationOption"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p>Or find things to send</p>
            <div className="homeHeroShowAds">
              <div className="cntr">
                <input type="checkbox" id="cbx" className="hidden-xs-up" />
                <label htmlFor="cbx" className="cbx"></label>
              </div>
              <p>Show only ads with shipping</p>
            </div>
            <div className="homeHeroButton">
              <button>Find ads</button>
            </div>
          </div>
          <div className="homeHeroRight">
            <p>Everything you need for your summer adventures</p>
            <p>Secure your finds instantly with Buy Now!</p>
          </div>
        </div>
      </div>
    </>
  );
}
