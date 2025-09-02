import React from "react";
import "./value.css";
import { FaCar, FaEnvelope, FaPhone } from "react-icons/fa";
import placeholderImg from "../../../../assets/poster.jpg";
import car from "../../../../assets/car.png";
import bag from "../../../../assets/bag.png";
import { FaLongArrowAltRight } from "react-icons/fa";

const valueCards = [
  {
    id: 1,
    title: "Sell ​​a car privately on Blocket",
    text: "What does it mean to sell a car privately? What rights does the buyer have and what should you keep in mind when selling on Blocket?",
    img: car,
  },
  {
    id: 2,
    title: "Market Insights",
    text: "Understand how market conditions affect your car’s value.",
    img: bag,
  },
];

const ValueCar = () => {
  return (
    <div className="overall_dynamic_class">
      <div className="overall_maxwidth">
        <h2 className="value_heading">Guides and tips</h2>
        <div className="split_card_section">
          <div className="split_card_container">
            <div className="split_card_left">
              <div className="value_card">
                <img
                  src={valueCards[0].img}
                  alt={valueCards[0].title}
                  className="value_card_image"
                />
                <h3 className="value_card_title">{valueCards[0].title}</h3>
                <p className="value_card_text">{valueCards[0].text}</p>{" "}
                <div className="icon_text">
                  <p className="icon_para">Getting started guide</p>
                  <FaLongArrowAltRight className="value_icon" />
                </div>
              </div>
            </div>
            <div className="split_card_right">
              <div className="value_card">
                <img
                  src={valueCards[1].img}
                  alt={valueCards[1].title}
                  className="value_card_image"
                />
                <h3 className="value_card_title">{valueCards[1].title}</h3>
                <p className="value_card_text">{valueCards[1].text}</p>
                <div className="icon_text">
                  <p className="icon_para">Sell to car dealers</p>
                  <FaLongArrowAltRight className="value_icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="split_content_section">
          <div className="split_content_left">
            <div className="value_card">
              <h3 className="value_card_title">Why Value Your Car?</h3>
              <p className="value_card_text">
                Knowing your car’s value helps you make informed decisions when
                selling or trading.
              </p>
              <p className="value_card_text">
                Our valuation tools provide accurate estimates based on market
                trends and vehicle condition.
              </p>
              <span className="value_link">Learn More</span>
            </div>
          </div>
          <div className="split_content_right">
            <h3 className="quick_links_heading">Quick Links</h3>
            <span className="value_link">Get a Quote</span>
            <span className="value_link">Compare Plans</span>
            <span className="value_link">Contact Us</span>
          </div>
        </div>
        <div className="faq_message_section">
          <FaEnvelope className="value_icon" />
          <div className="faq_split_section">
            <div className="faq_split_left">
              <h3 className="faq_title">Frequently Asked Questions</h3>
              <div className="accordion">
                <details className="accordion_item">
                  <summary className="accordion_question">
                    How is my car’s value calculated?
                  </summary>
                  <p className="accordion_answer">
                    We use market data, vehicle condition, mileage, and regional
                    trends to estimate value.
                  </p>
                </details>
                <details className="accordion_item">
                  <summary className="accordion_question">
                    Is the valuation free?
                  </summary>
                  <p className="accordion_answer">
                    Yes, our basic valuation tool is completely free to use.
                  </p>
                </details>
                <details className="accordion_item">
                  <summary className="accordion_question">
                    Can I trust the estimate?
                  </summary>
                  <p className="accordion_answer">
                    Our estimates are based on reliable data, but final offers
                    may vary.
                  </p>
                </details>
                <details className="accordion_item">
                  <summary className="accordion_question">
                    How long does it take?
                  </summary>
                  <p className="accordion_answer">
                    The valuation process takes just a few minutes online.
                  </p>
                </details>
                <details className="accordion_item">
                  <summary className="accordion_question">
                    Do I need to visit a dealer?
                  </summary>
                  <p className="accordion_answer">
                    No, you can get an estimate entirely online.
                  </p>
                </details>
              </div>
            </div>
            <div className="faq_split_right">
              <div className="value_card">
                <h2 className="support_heading">Need Help?</h2>
                <h3 className="value_card_title">Contact Support</h3>
                <p className="value_card_text">
                  Reach out to our team for assistance.{" "}
                  <FaPhone className="inline_icon" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="full_card_section">
          <div className="value_card">
            <div className="card_split">
              <div className="card_split_left">
                <h3 className="card_split_title">To Think About...</h3>
                <p className="card_split_text">
                  Consider factors like maintenance history and upgrades when
                  valuing your car to get the best estimate.
                </p>
              </div>
              <div className="card_split_right">
                <img
                  src={placeholderImg}
                  alt="Car Valuation"
                  className="card_split_image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueCar;
