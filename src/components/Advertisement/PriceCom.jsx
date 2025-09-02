import React, { useState } from "react";
import InputField from "../../helpers/InputField";
import "./ads.css";
import ToggleButton from "../../helpers/ToggleButton";

const PriceCom = ({ modalSource, closeModal }) => {
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1000);
  const [sliderPos, setSliderPos] = useState({ left: 0, right: 100 });

  const handleLeftDrag = (e) => {
    const slider = document.querySelector(".slider-track");
    const rect = slider.getBoundingClientRect();
    const maxWidth = rect.width;

    let newLeft = ((e.clientX - rect.left) / maxWidth) * 100;
    newLeft = Math.max(0, Math.min(newLeft, sliderPos.right - 10));

    setSliderPos((prev) => ({ ...prev, left: newLeft }));
    setLowestPrice(Math.round((newLeft / 100) * 1000));
  };

  const handleRightDrag = (e) => {
    const slider = document.querySelector(".slider-track");
    const rect = slider.getBoundingClientRect();
    const maxWidth = rect.width;

    let newRight = ((e.clientX - rect.left) / maxWidth) * 100;
    newRight = Math.min(100, Math.max(newRight, sliderPos.left + 10));

    setSliderPos((prev) => ({ ...prev, right: newRight }));
    setHighestPrice(Math.round((newRight / 100) * 1000));
  };

  const handleLowestPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value <= highestPrice) {
      setLowestPrice(value);
      setSliderPos((prev) => ({ ...prev, left: (value / 1000) * 100 }));
    }
  };

  const handleHighestPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= lowestPrice) {
      setHighestPrice(value);
      setSliderPos((prev) => ({ ...prev, right: (value / 1000) * 100 }));
    }
  };

  return (
    <>
      {modalSource === "Price" && (
        <div className="modal-header">
          <h2 style={{ opacity: "0" }}>All Filter</h2>
          <h2>Price</h2>
          <div className="modal-close" onClick={closeModal}>
            Cancel
          </div>
        </div>
      )}
      <div className="modal-header border_over">
        <div className="modal-monster">
          <div className="modal-lowesteddd">
            <div className="modal-lowest">
              <div className="modal-close">Lowest Price</div>
              <div className="modal-lowested">
                <InputField
                  placeholder="0"
                  type="number"
                  value={lowestPrice}
                  onChange={handleLowestPriceChange}
                  CiSearchIcon={false}
                  InputButton={false}
                  DynamicClassName="input_set"
                />
                <div className="div_krrr">kr</div>
              </div>
            </div>
            <div className="divisor_linee"></div>
            <div className="modal-lowest">
              <div className="modal-close">Highest Price</div>
              <div className="modal-lowested">
                <InputField
                  placeholder="0"
                  type="number"
                  value={highestPrice}
                  onChange={handleHighestPriceChange}
                  CiSearchIcon={false}
                  InputButton={false}
                  DynamicClassName="input_set"
                />
                <div className="div_krrr">kr</div>
              </div>
            </div>
          </div>
          <div className="slider-container">
            <div className="slider-track">
              <div
                className="slider-range"
                style={{
                  left: `${sliderPos.left}%`,
                  right: `${100 - sliderPos.right}%`,
                }}
              ></div>
              <div
                className="slider-handle left-handle"
                style={{ left: `${sliderPos.left}%` }}
                onMouseDown={(e) => {
                  const onMouseMove = (e) => handleLeftDrag(e);
                  const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                  };
                  document.addEventListener("mousemove", onMouseMove);
                  document.addEventListener("mouseup", onMouseUp);
                }}
              ></div>
              <div
                className="slider-handle right-handle"
                style={{ left: `${sliderPos.right}%` }}
                onMouseDown={(e) => {
                  const onMouseMove = (e) => handleRightDrag(e);
                  const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                  };
                  document.addEventListener("mousemove", onMouseMove);
                  document.addEventListener("mouseup", onMouseUp);
                }}
              ></div>
            </div>
          </div>
          <div className="current_switch">
            <div className="modal-close">Ads with reduced price</div>
            <ToggleButton />{" "}
          </div>
        </div>
      </div>
      {modalSource === "Price" && (
        <button className="over_hyped">View 18324 ads</button>
      )}
    </>
  );
};

export default PriceCom;
