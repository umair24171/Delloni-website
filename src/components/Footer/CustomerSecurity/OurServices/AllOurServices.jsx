import React, { useState, useEffect } from "react";
import poster from "../../../../assets/poster.jpg";
import "./service.css";

const AllOurServices = () => {
  const [cards, setCards] = useState([]);
  const [insuranceCards, setInsuranceCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=7"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const mappedCards = data.slice(0, 4).map((product) => ({
          title: product.title,
          description: product.description,
          image: product.image,
        }));
        const mappedInsuranceCards = data.slice(4, 7).map((product) => ({
          title: product.title,
          description: product.description,
          image: product.image,
        }));
        setCards(mappedCards);
        setInsuranceCards(mappedInsuranceCards);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dropdown-minchedddd">
      <div className="all_our_img">
        <img src={poster} alt="Service Banner" />
      </div>
      <div className="drodpwn_h2222_full">
        <div className="drodpwn_h2222_services">
          <div className="drodpwn_h2222">
            <h2>Our Services</h2>
          </div>
          <div className="drodpwn_para">
            <p>
              Send gadgets safely and easily with shipping, use ready-made
              purchase contracts, and advertise in the Gallery.
            </p>
          </div>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div className="cards-container">
            {cards.map((card, index) => (
              <div className="service-card" key={index}>
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="cards-containeraaas">
                  <h3 className="card-title">{truncateText(card.title)}</h3>
                  <p className="card-description">
                    {truncateText(card.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="drodpwn_h2222_services">
          <div className="drodpwn_h2222">
            <h2>Insurances</h2>
          </div>
          <div className="drodpwn_para">
            <p>
              Together with insurance companies, we have developed special used
              insurance policies for when you buy used gadgets, a boat or a car.
            </p>
          </div>
        </div>
        {!loading && !error && (
          <div className="insurance-cards-container">
            {insuranceCards.map((card, index) => (
              <div className="service-card" key={index}>
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="cards-containeraaas">
                  <h3 className="card-title">{truncateText(card.title)}</h3>
                  <p className="card-description">
                    {truncateText(card.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOurServices;
