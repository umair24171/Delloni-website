import React, { useState, useEffect } from "react";
import "./detail.css";
import HomeCards from "../../shared/homeCards/homeCards";

const OtherViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="ads_other">
      <div className="ads_overview">
        <div className="other_viewed">Others also viewed</div>
        <div className="homeCardsContainer1">
          {products.map((product) => (
            <HomeCards
              key={product.id}
              image={product.image}
              price="10 SEK"
              title={
                product.title.length > 20
                  ? `${product.title.slice(0, 20)}...`
                  : product.title
              }
              description={
                product.description.length > 20
                  ? `${product.description.slice(0, 20)}...`
                  : product.description
              }
              imgClass="otherViewedSet"
              cardClass="cardViewSet"
              titleClass="cardViewtitle"
              descClass="cardGaming"
              priceClass="cardPriceCard"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherViewed;
