import React from "react";
import "./add.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import car from "../../../../assets/car.png";
import jacket from "../../../../assets/jacket.png";
import residence from "../../../../assets/residence.png";
import bed from "../../../../assets/bed.png";
import tshirt from "../../../../assets/tshirt.png";
import bag from "../../../../assets/bag.png";
import joy from "../../../../assets/joy.png";
import bowling from "../../../../assets/bowling.png";
import elect from "../../../../assets/new.png";
import { useNavigate } from "react-router-dom";

const addItems = [
  { id: 1, img: car, title: "For the Home", price: "0 kr" },
  { id: 2, img: jacket, title: "Fashion", price: "0 kr" },
  { id: 3, img: residence, title: "Real Estate", price: "0 kr" },
  { id: 4, img: bed, title: "Furniture", price: "0 kr" },
  { id: 5, img: tshirt, title: "Clothing", price: "0 kr" },
  { id: 6, img: bag, title: "Accessories", price: "0 kr" },
  { id: 7, img: joy, title: "Electronics", price: "0 kr" },
  { id: 8, img: bowling, title: "Sports", price: "0 kr" },
  { id: 9, img: elect, title: "Miscellaneous", price: "0 kr" },
];
const PostanAdd = () => {
  const navigate = useNavigate();
  const CompanyClick = () => {
    navigate("/company-information");
  };
  return (
    <div className="overall_dynamic_class">
      <div className="overall_maxwidth set-width-grid">
        <div className="postCard_h2">What do you want to advertise?</div>
        <div className="postCard_link" onClick={CompanyClick}>
          Information for you as a company
          <FaExternalLinkAlt />
        </div>
        <div className="postanadd_grid">
          {addItems.map((item) => (
            <div key={item.id} className="postanaddImg_mined">
              <div className="postanaddImg_min">
                <div className="postanaddImg">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="postcarHome">{item.title}</div>
              </div>
              <div className="postcarkr">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostanAdd;
