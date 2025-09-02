import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import ToggleButton from "../../helpers/ToggleButton";

const RegionsInSweden = ({
  regions,
  showRegions,
  selectedRegion,
  selectedRegions,
  toggleRegions,
  handleRegionClick,
  handleRegionSelection,
  handleBackFromRegions,
  handleBackFromSubRegions,
  modalSource,
  closeModal,
}) => {
  if (!showRegions) return null;

  // Determine button text based on modalSource
  const buttonText = modalSource === "Place" ? "Cancel" : "Clear";

  // Sub-Regions View
  if (selectedRegion) {
    return (
      <>
        <div className="modal-header">
          <div className="modal-close" onClick={handleBackFromSubRegions}>
            <IoIosArrowBack style={{ fontSize: "2rem" }} />
            Regions in Sweden
          </div>
          <h2>{selectedRegion.name}</h2>
          <div
            className="modal-close"
            onClick={modalSource === "Place" ? closeModal : undefined}
          >
            {buttonText}
          </div>
        </div>{" "}
        <div className="current_switch">
          <div className="current_location">
            <FaLocationDot
              style={{ color: "var(--black)", fontSize: "2rem" }}
            />
            Use my location
          </div>
          <ToggleButton />{" "}
        </div>
        <div className="modal-miller">
          {selectedRegion.subRegions.map((subRegion, index) => (
            <div
              key={index}
              className="modal-header toggle_pad"
              onClick={() => handleRegionSelection(subRegion.name)}
            >
              <div className="modal-close">
                {subRegion.name}{" "}
                <span className="model_litee">({subRegion.count})</span>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(subRegion.name)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                  className="input"
                />
                <span className="custom-checkbox"></span>
              </label>
            </div>
          ))}
        </div>{" "}
        <div className="current_switch">
          <div className="current_location">Include Neighboring Countries</div>
          <ToggleButton />{" "}
        </div>
        <button className="over_hyped">{buttonText}</button>
      </>
    );
  }

  // Regions View
  return (
    <>
      <div className="modal-header">
        {modalSource !== "Place" && (
          <div className="modal-close" onClick={handleBackFromRegions}>
            <IoIosArrowBack style={{ fontSize: "2rem" }} />
            All Filters
          </div>
        )}
        <h2>Regions in Sweden</h2>
        <div
          className="modal-close"
          onClick={modalSource === "Place" ? closeModal : undefined}
        >
          {buttonText}
        </div>
      </div>
      <div className="current_switch">
        <div className="current_location">
          <FaLocationDot style={{ color: "var(--black)", fontSize: "2rem" }} />
          Use my location
        </div>
        <ToggleButton />{" "}
      </div>
      <div className="modal-miller">
        {regions.map((region, index) => (
          <div
            key={index}
            className="modal-header toggle_pad"
            onClick={() => handleRegionClick(region)}
          >
            <div className="modal-close">
              {region.name}{" "}
              <span className="model_litee">({region.count})</span>
            </div>
            {region.hasSubRegions ? (
              <IoIosArrowForward
                className="arrow-icon"
                style={{ fontSize: "2rem", color: "var(--black)" }}
              />
            ) : (
              <label>
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region.name)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                  className="input"
                />
                <span className="custom-checkbox"></span>
              </label>
            )}
          </div>
        ))}
      </div>{" "}
      <div className="current_switch">
        <div className="current_location">Include Neighboring Countries</div>
        <ToggleButton />{" "}
      </div>
      <button className="over_hyped">{buttonText}</button>
    </>
  );
};

export default RegionsInSweden;
