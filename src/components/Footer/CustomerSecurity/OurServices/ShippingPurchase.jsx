import React from "react";
import "./ship.css";
import { useNavigate } from "react-router-dom";
import placeholderImg from "../../../../assets/poster.jpg"; // Replace with actual image
import cardImg1 from "../../../../assets/poster.jpg"; // Replace with actual image
import cardImg2 from "../../../../assets/poster.jpg"; // Replace with actual image
import cardImg3 from "../../../../assets/poster.jpg"; // Replace with actual image
import benefitImg1 from "../../../../assets/poster.jpg"; // Replace with actual image
import benefitImg2 from "../../../../assets/poster.jpg"; // Replace with actual image
import benefitImg3 from "../../../../assets/poster.jpg"; // Replace with actual image
import benefitImg4 from "../../../../assets/poster.jpg"; // Replace with actual image

const cardData1 = [
  {
    id: 1,
    title: "Secure Payment",
    text: "Pay with confidence using our secure payment gateway.",
    img: cardImg1,
  },
  {
    id: 2,
    title: "Fast Shipping",
    text: "Get your items delivered quickly with our trusted carriers.",
    img: cardImg2,
  },
  {
    id: 3,
    title: "Buyer Protection",
    text: "Shop worry-free with our purchase protection policy.",
    img: cardImg3,
  },
];

const cardData2 = [
  {
    id: 1,
    title: "Track Orders",
    text: "Monitor your shipments in real-time with our tracking tools.",
    img: cardImg1,
  },
  {
    id: 2,
    title: "Easy Returns",
    text: "Return items hassle-free within our return window.",
    img: cardImg2,
  },
  {
    id: 3,
    title: "Customer Support",
    text: "Get help anytime with our 24/7 support team.",
    img: cardImg3,
  },
];

const benefitCards = [
  {
    id: 1,
    title: "Light packages – up to 1 kg",
    text: "For example, clothes, shoes, baby carriers, small toys.",
    img: benefitImg1,
  },
  {
    id: 2,
    title: "Slightly heavier packages – up to 5 kg",
    text: "E.g. Playstation, table lamp, ski boots.",
    img: benefitImg2,
  },
  {
    id: 3,
    title: "Heavy packages – up to 10 kg",
    text: "For example. golf set, snowracer, book collection, bowling ball.",
    img: benefitImg3,
  },
  {
    id: 4,
    title: "Very heavy packages – up to 20 kg",
    text: "E.g. kitchen assistant, microwave, dumbbells.",
    img: benefitImg4,
  },
];

const cardData3 = [
  {
    id: 1,
    title: "Safe Transactions",
    text: "All payments are encrypted for maximum security.",
    img: cardImg1,
  },
  {
    id: 2,
    title: "Quick Refunds",
    text: "Get refunds processed swiftly if issues arise.",
    img: cardImg2,
  },
  {
    id: 3,
    title: "Verified Sellers",
    text: "Shop from trusted sellers verified by our platform.",
    img: cardImg3,
  },
];

const tableData = [
  {
    service: "Standard Shipping",
    cost: "$5.99",
    delivery: "3-5 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "Express Shipping",
    cost: "$12.99",
    delivery: "1-2 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "International Shipping",
    cost: "$19.99",
    delivery: "7-14 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "Economy Shipping",
    cost: "$3.99",
    delivery: "5-7 days",
    tracking: "No",
    protection: "Optional",
  },
  {
    service: "Standard Shipping",
    cost: "$5.99",
    delivery: "3-5 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "Express Shipping",
    cost: "$12.99",
    delivery: "1-2 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "International Shipping",
    cost: "$19.99",
    delivery: "7-14 days",
    tracking: "Yes",
    protection: "Included",
  },
  {
    service: "Economy Shipping",
    cost: "$3.99",
    delivery: "5-7 days",
    tracking: "No",
    protection: "Optional",
  },
];

const ShippingPurchase = () => {
  const navigate = useNavigate();
  const contactBtn = () => {
    navigate("/ads");
  };

  return (
    <>
      <div className="overall_dynamic_class heroHomeBg">
        <div className="overall_main_cycle">
          Smooth shipping and secure payment – ​​try shipping with purchase
          protection and Buy Now
        </div>
      </div>
      <div className="overall_maxwidth">
        <div className="secuirty_need_main">
          <div className="secuirty_need">
            <p>
              Do you need with something you bought or sold with shipping and
              purchase protection?
            </p>
          </div>
          <button className="contact_here_btn" onClick={contactBtn}>
            To the Ads
          </button>
        </div>
        <div className="shipping_info_section">
          <div className="shipping_split_section">
            <div className="shipping_left">
              <img
                src={placeholderImg}
                alt="Secure Shipping"
                className="shipping_image"
              />
            </div>
            <div className="shipping_right">
              <h2 className="shipping_heading">Why Choose Our Shipping?</h2>
              <ul className="shipping_list">
                <li>Always trackable shipping to agents.</li>
                <li>
                  Buyers and sellers verify themselves with Mobile BankID.
                </li>
                <li>Real-time tracking for all shipments.</li>
                <li>
                  The buyer has 24 hours to approve the item before money is
                  paid to the seller.
                </li>
                <li>
                  Handle the entire business here at Blocket without having to
                  share phone numbers or emails with each other.
                </li>
                <li>
                  Handle the entire business here at Blocket without having to
                  share phone numbers or emails with each other.
                </li>
              </ul>
            </div>
          </div>
          <div className="shipping_split_section">
            <div className="shipping_left">
              <h2 className="shipping_heading">New: Buy Now</h2>
              <p className="shipping_para">
                Our purchase protection ensures you shop with confidence,
                knowing your transactions are safe Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Quam voluptatum expedita,
                reprehenderit aliquam qui porro. sit amet consectetur
                adipisicing elit. Quam voluptatum expedita, reprehenderit
                aliquam qui porro. sit amet consectetur adipisicing elit. Quam
                voluptatum expedita, reprehenderit aliquam qui porro. sit amet
                consectetur adipisicing elit. Quam voluptatum expedita,
                reprehenderit aliquam qui porro.
              </p>
              <h3 className="shipping_subheading">
                Look for the Buy Now icon.
              </h3>
            </div>
            <div className="shipping_right">
              <img
                src={placeholderImg}
                alt="Purchase Protection"
                className="shipping_image"
              />
            </div>
          </div>
          <div className="shipping_card_section">
            <h2 className="shipping_heading">Explore Our Services</h2>
            <div className="shipping_cards_container">
              {cardData1.map((card) => (
                <div key={card.id} className="shipping_card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="shipping_card_image"
                  />
                  <h3 className="shipping_card_title">{card.title}</h3>
                  <p className="shipping_card_text">{card.text}</p>
                </div>
              ))}
            </div>
            <button className="contact_here_btn shipping_card_btn">
              Check out all ads with shipping!
            </button>
          </div>
          <div className="shipping_card_section">
            <h2 className="shipping_heading">Additional Benefits</h2>
            <div className="shipping_cards_container">
              {cardData2.map((card) => (
                <div key={card.id} className="shipping_card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="shipping_card_image"
                  />
                  <h3 className="shipping_card_title">{card.title}</h3>
                  <p className="shipping_card_text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="benefit_section">
            <h2 className="benefit_heading">Weight classes</h2>
            <div className="benefit_cards_container">
              {benefitCards.map((card) => (
                <div key={card.id} className="benefit_card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="benefit_card_image"
                  />
                  <h3 className="benefit_card_title">{card.title}</h3>
                  <div className="benefit_card_line"></div>
                  <p className="benefit_card_text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="table_section">
            <h2 className="table_heading">Shipping prices</h2>
            <table className="custom_table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Cost</th>
                  <th>Delivery Time</th>
                  <th>Tracking</th>
                  <th>Protection</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "table_row_even" : "table_row_odd"
                    }
                  >
                    <td>{row.service}</td>
                    <td>{row.cost}</td>
                    <td>{row.delivery}</td>
                    <td>{row.tracking}</td>
                    <td>{row.protection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="table_para">
              Applies to the following subcategories within Vehicles: Car parts
              & accessories, boat parts & accessories, accessories for caravans
              & motorhomes, accessories for mopeds & A-tractors, motorcycle
              parts & accessories.
            </p>
            <button className="contact_here_btn table_btn">
              Add shipping to your listing
            </button>
            <h2 className="table_link_heading">
              More information about shipping with purchase protection can be
              found here:
            </h2>
            <p className="table_link_para_link">
              Shipping with purchase protection - terms of use and answers to
              frequently asked questions.
            </p>
          </div>
          <div className="shipping_card_section">
            <h2 className="shipping_heading">Shop safely at Blocket</h2>
            <p className="shipping_para">
              Choosing a second-hand car should be smooth and safe. That's why
              we place great emphasis on safety. Here you can read about what we
              do and what you should consider yourself.
            </p>
            <div className="shipping_cards_container">
              {cardData3.map((card) => (
                <div key={card.id} className="shipping_card">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="shipping_card_image"
                  />
                  <h3 className="shipping_card_title">{card.title}</h3>
                  <p className="shipping_card_text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPurchase;
