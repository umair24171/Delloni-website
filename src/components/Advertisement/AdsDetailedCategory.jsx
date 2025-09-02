import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./detail.css";
import { IoIosArrowForward } from "react-icons/io";
import poster from "../../assets/poster.jpg";
import ads from "../../assets/ad2.jpg";
import { GoHeart } from "react-icons/go";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LuExternalLink } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import profile from "../../assets/user.png";
import secure from "../../assets/secure.png";
import pdf from "../../assets/pdf.png";
import phone from "../../assets/ph.png";
import handshake from "../../assets/handshake.png";
import { MdOutlineReportProblem } from "react-icons/md";

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button className={`${className} custom-prev-arrow`} onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button className={`${className} custom-next-arrow`} onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
};

const AdsDetailedCategory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: (index) => setCurrentSlide(index),
  };

  const images = products.map((product) => product.image);

  const transactionData = [
    {
      title: "Safety & security at Blocket",
      subtitle: "When something is to be sent",
      image: secure,
    },
    {
      title: "Safety & security at Blocket",
      subtitle: "When something is to be sent",
      image: pdf,
    },
    {
      title: "Safety & security at Blocket",
      subtitle: "When something is to be sent",
      image: phone,
    },
    {
      title: "Safety & security at Blocket",
      subtitle: "When something is to be sent",
      image: handshake,
    },
  ];

  return (
    <div className="ads_overview">
      <div className="ads_ads">
        <img src={poster} alt="Poster" />
      </div>
      <div className="ads_details_lite">
        All
        <IoIosArrowForward
          style={{ color: "var(--black)", fontSize: "1.5rem" }}
        />
        Personal
        <IoIosArrowForward
          style={{ color: "var(--black)", fontSize: "1.5rem" }}
        />
        Children's items & toys
        <IoIosArrowForward
          style={{ color: "var(--black)", fontSize: "1.5rem" }}
        />
        Toys
      </div>
      <div className="ads_detailed_main">
        <div className="ads_detailed_left">
          <div className="slider-wrapper">
            <Slider {...settings} className="slider_setter">
              {images.map((image, index) => (
                <div key={index} className="slider_image_container">
                  <img
                    src={image}
                    alt={products[index]?.title || `Slide ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
            <div className="slider-counter">
              {images.length > 0
                ? `${currentSlide + 1} of ${images.length}`
                : "Loading..."}
            </div>
          </div>
          <div className="ads_learned">
            <div className="ads_learn">
              <h2>learn to walk stroller/doll stroller</h2>
            </div>
            <div className="ads_btn_div">
              <button>
                <GoHeart style={{ color: "var(--black)", fontSize: "2rem" }} />
                Save
              </button>
            </div>
          </div>
          <div className="ads_btn_div">
            <button>Good Condition</button>
          </div>
          <div className="hundreed_seen">200 SEK</div>
          <div className="ads_btn_div blue_btn">
            <button>
              <BiMessageRoundedDetail
                style={{ color: "var(--white)", fontSize: "2rem" }}
              />
              Send message
            </button>
          </div>
          <div className="condiiton_seteddd">
            <div className="condiiton_set">
              Condition <span className="read_spam">Read about condition</span>
            </div>
            <div className="read_spam good_staff">
              Good condition - sparingly used
            </div>
          </div>
          <div className="description_Seen">
            <h2>Description</h2>
          </div>
          <div className="para_settle">
            <p>
              Nice wooden doll's carriage with accompanying blanket and pillow.
              The blanket and pillow are reversible in different colors, pink
              and white. The doll's carriage is painted white and has a
              cushioning rubber edge in the wheels to make the carriage roll
              more easily. A fun toy for small children that will also be a nice
              detail in the children's room. Dimensions: 41.6 x 23.6 x 50.4 cm
            </p>
          </div>
          <div className="condiiton_seteddd">
            <div className="condiiton_lite">
              Place <span className="read_spamas">Read about condition</span>
              <LuExternalLink
                style={{
                  color: "var(--green)",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="condiiton_lite">
              Posted today 15:08 in <span className="read_spamas">Toys</span>
            </div>
          </div>
          <hr />
          <div className="description_Seen">
            <h2>Shipping with purchase protection</h2>
          </div>
          <div className="condiiton_set">
            <BsBoxSeam style={{ fontSize: "2rem" }} />
            Ask the seller to send the item
          </div>
          <div className="condition_list">
            <ul>
              <li>Approve the item before the seller gets paid</li>
              <li>
                Climate compensated shipping with expected delivery time of 1-2
                business days
              </li>{" "}
              <li>Help if the product needs to be returned</li>
            </ul>
          </div>
          <div className="condiiton_set">
            <span className="read_spam">
              How Shipping with purchase protection works
            </span>
          </div>
          <hr />
          <div className="description_Seen">
            <h2>Sold by :</h2>
          </div>
          <div className="profile_image_yellow">
            <div className="profile_image">
              <img src={profile} alt="" />
            </div>
            <div className="profile_image_redd">
              <div className="read_spam good_staff">hour</div>
              <div className="since_good">
                On Blocket since 2024{" "}
                <span className="active_addd">1 active add</span>{" "}
              </div>{" "}
              <div className="since_good">Verified</div>
            </div>
          </div>
          <hr />
          <div className="description_Seen">
            <h2>Safe transaction</h2>
          </div>
          <div className="description_dneed">
            {transactionData.map((item, index) => (
              <div key={index} className="description_Seened_dne">
                <div className="description_Seened">
                  <div className="class_tranction">{item.title}</div>
                  <div className="class_tranction save_blue">
                    {item.subtitle}
                  </div>
                </div>
                <div className="secure_setttle">
                  <img src={item.image} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="read_spam report_read">
            <MdOutlineReportProblem
              style={{ color: "var(--black)", fontSize: "2rem" }}
            />
            Report ad
          </div>
        </div>
        <div className="ads_detailed_right">
          <div className="ads_sections_fixed">
            <img src={ads} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsDetailedCategory;
