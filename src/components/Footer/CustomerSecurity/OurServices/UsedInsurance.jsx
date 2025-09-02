import React, { useState, useEffect } from "react";
import "./insurance.css";
import placeholderImg from "../../../../assets/poster.jpg"; // Replace with actual image

const UsedInsurance = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch features");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const featureCards = products.map((product) => ({
    id: product.id,
    title: product.title.slice(0, 20),
    text: product.description.slice(0, 60) + "...",
    img: product.image,
  }));

  return (
    <>
      <div className="overall_dynamic_class heroHomeBg">
        <div className="overall_main_cycle">
          Find a safe bargain with used car insurance
        </div>
      </div>
      <div className="overall_maxwidth">
        <div className="insurance_section">
          <div className="drodpwn_h2222">
            <h2>Used insurance</h2>
          </div>{" "}
          <div className="drodpwn_lite"></div>
          <div className="feature_section">
            <h3 className="feature_title">
              Protect yourself from hidden errors
            </h3>
            <p className="feature_para">
              This is included when you take out used car insurance.
            </p>
            {loading ? (
              <p className="loading_text">Loading features...</p>
            ) : error ? (
              <p className="error_text">Error loading features: {error}</p>
            ) : (
              <div className="feature_cards_container">
                {featureCards.slice(0, 3).map((card) => (
                  <div key={card.id} className="insurance_card">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="insurance_card_image"
                    />
                    <h4 className="insurance_card_title">{card.title}</h4>
                    <p className="insurance_card_text">{card.text}</p>
                  </div>
                ))}
              </div>
            )}
            {!loading && !error && (
              <div className="feature_cards_container">
                {featureCards.slice(3, 6).map((card) => (
                  <div key={card.id} className="insurance_card">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="insurance_card_image"
                    />
                    <h4 className="insurance_card_title">{card.title}</h4>
                    <p className="insurance_card_text">{card.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="faq_section">
            <h3 className="faq_title">Frequently Asked Questions</h3>
            <div className="faq_item">
              <h4 className="faq_question">What does the insurance cover?</h4>
              <p className="faq_answer">
                Our insurance covers mechanical breakdowns, accidental damage,
                and theft, subject to policy terms.
              </p>
              <ul className="faq_list">
                <li>Engine and transmission repairs.</li>
                <li>Bodywork damage from collisions.</li>
                <li>Replacement of stolen vehicles.</li>
              </ul>
            </div>
            <div className="faq_item">
              <h4 className="faq_question">How do I file a claim?</h4>
              <p className="faq_answer">
                Filing a claim is simple. Contact our support team within 24
                hours of the incident .
              </p>
              <ul className="faq_list">
                <li>Call our 24/7 hotline.</li>
                <li>Submit photos and documents online.</li>
              </ul>
              <p className="faq_answer">
                Claims are processed within 5–7 business days.
              </p>
            </div>
            <div className="faq_item">
              <h4 className="faq_question">Is the insurance transferable?</h4>
              <p className="faq_answer">
                Yes, our insurance can be transferred to a new owner if the
                vehicle is sold.
              </p>
            </div>
            <div className="faq_item">
              <h4 className="faq_question">What is the coverage period?</h4>
              <p className="faq_answer">
                Coverage periods range from 6 months to 3 years, depending on
                the plan.
              </p>
              <ul className="faq_list">
                <li>Basic: 6 months.</li>
                <li>Standard: 1 year.</li>
                <li>Premium: 3 years.</li>
              </ul>
            </div>
            <div className="faq_item">
              <h4 className="faq_question">Are older cars eligible?</h4>
              <p className="faq_answer">
                Vehicles up to 10 years old are eligible, provided they pass our
                inspection.
              </p>
            </div>
          </div>
          <div className="split_section">
            <div className="split_left">
              <h2 className="split_heading">Secure Your Purchase</h2>
              <p className="split_para">
                Our insurance ensures your used car purchase is protected
                against unexpected issues, giving you confidence on the road
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                et dolorem sed delectus voluptatem aut totam enim quo, quas
                harum expedita voluptatibus sequi nam, id fugit? Sit eos,
                voluptate explicabo sunt optio cumque consequatur. Labore
                aspernatur, ut quis ullam distinctio esse quam et fugiat, quia
                quos, in quidem aperiam rationeconsectetur adipisicing elit.
                Maiores et dolorem sed delectus voluptatem aut totam enim quo,
                quas harum expedita voluptatibus sequi nam, id fugit? Sit eos,
                voluptate explicabo sunt optio cumque consequatur. Labore
                aspernatur, ut quis ullam distinctio esse quam et fugiat, quia
                quos, in quidem aperiam ratione.
              </p>
              <h3 className="split_title">Trusted Protection</h3>
            </div>
            <div className="split_right">
              <img
                src={placeholderImg}
                alt="Insurance Protection"
                className="split_image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsedInsurance;
