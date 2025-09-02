import "./homeCards.css";

export default function HomeCards({
  image,
  title,
  description,
  price = false,
  cardClass = "",
  imgClass = "",
  dataClass = "",
  titleClass = "",
  descClass = "",
  priceClass = "",
}) {
  return (
    <div className={`homeCards ${cardClass}`}>
      <div className={`homeCardsImg ${imgClass}`}>
        <img src={image} alt={title || "Card image"} />
      </div>
      <div className={`homecardsData ${dataClass}`}>
        <div className={`homecardsTitle ${titleClass}`}>
          <p>{title}</p>
        </div>
        <div className={`homeCardsDesc ${descClass}`}>
          <p>{description}</p>
        </div>
        {price && (
          <div className={`homeCardsPrice ${priceClass}`}>
            <p>{price}</p>
          </div>
        )}
      </div>
    </div>
  );
}
