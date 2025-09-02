import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./homeFind.css";
import HomeCards from "../../../shared/homeCards/homeCards";

export default function HomeFind() {
  const [cardsData1, setCardsData1] = useState([]);
  const [cardsData2, setCardsData2] = useState([]);
  const [cardsData3, setCardsData3] = useState([]);

  // Function to fetch and select 3 random products
  const fetchRandomProducts = (setCardsData) => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3).map((item) => ({
          image: item.image,
          title:
            item.title.length > 21
              ? item.title.slice(0, 18) + "..."
              : item.title,
          description:
            item.description.length > 170
              ? item.description.slice(0, 170) + "..."
              : item.description,
        }));
        setCardsData(selected);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Fetch different random data for each group
    fetchRandomProducts(setCardsData1);
    fetchRandomProducts(setCardsData2);
    fetchRandomProducts(setCardsData3);
  }, []);

  return (
    <div className="homeFindMain">
      <div className="homeFind">
        <div className="homeFindTitle">
          <p>Find your product on Blocket</p>
        </div>
        <div className="homeFindAll">
          <p>
            All about cars <MdKeyboardArrowRight style={{ fontSize: "2rem" }} />
          </p>
        </div>
        <div className="homeCardsContainer">
          {cardsData1.map((card, index) => (
            <HomeCards
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div className="homeFindTitle">
          <p>Find bargains throughout Sweden</p>
        </div>
        <div className="homeFindAll">
          <p>
            More about our services
            <MdKeyboardArrowRight style={{ fontSize: "2rem" }} />
          </p>
        </div>
        <div className="homeCardsContainer">
          {cardsData2.map((card, index) => (
            <HomeCards
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div className="homeFindAll">
          <p>
            More inspiration
            <MdKeyboardArrowRight style={{ fontSize: "2rem" }} />
          </p>
        </div>
        <div className="homeCardsContainer">
          {cardsData3.map((card, index) => (
            <HomeCards
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
