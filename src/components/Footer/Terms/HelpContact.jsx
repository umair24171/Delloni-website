import React from "react";
import InputField from "../../../helpers/InputField";
import { IoIosArrowForward, IoIosCheckmarkCircle } from "react-icons/io";
import poster from "../../../assets/poster.jpg";
import "./help.css";
import benefitImg1 from "../../../assets/profile-picture.png"; // Replace with actual image
import benefitImg2 from "../../../assets/secure.png"; // Replace with actual image
import benefitImg3 from "../../../assets/handshake.png"; // Replace with actual image
import benefitImg4 from "../../../assets/poster.jpg"; // Replace with actual imageimport
import { FaCar, FaEnvelope, FaPhone } from "react-icons/fa";
import Accordian from "../../../shared/Accordian";

const HelpContact = () => {
  const featureCards = [
    {
      id: 1,
      title:
        "Every thing about the Swedish Tax Agency DAC-7 which applies from January 1, 2023",
      text: "Read More",
    },
    {
      id: 2,
      title: "Account Management",
      text: "Read More",
    },
    {
      id: 3,
      title: "Billing Questions",
      text: "Read More",
    },
  ];

  const supportCards = [
    {
      id: 1,
      heading: "Sell ​​on the Block",
      title:
        "Are you new to Blocket? Here's everything you need to know about selling safely with us.",
      icon: <IoIosCheckmarkCircle />,
      text: "This is how you create a good ad!",
      linkText: "Explore Tax Guide",
      linkUrl: "/tax-guide",
    },
    {
      id: 2,
      heading: "User Assistance",
      title: "Account Support",
      icon: <IoIosCheckmarkCircle />,
      text: "Get help with managing your account and settings.",
      linkText: "Visit Account Help",
      linkUrl: "/account-help",
    },
  ];
  const benefitCards = [
    {
      id: 1,
      title: "Login",
      text: "Everything you need to log in with your Vend account",
      img: benefitImg1,
    },
    {
      id: 2,
      title: "Verify account",
      text: "Read about how to verify your Blocket account with BankID.",
      img: benefitImg2,
    },
    {
      id: 3,
      title: "Start a dispute",
      text: "Here you can complain about goods you purchased with our shipping service.",
      img: benefitImg3,
    },
    {
      id: 4,
      title: "Report fraud",
      text: "Here you can let us know if you would like us to investigate something.",
      img: benefitImg4,
    },
  ];
  return (
    <>
      <div className="dropdown-minchedddd">
        <div className="dynamic_max_width minch_ooel">
          <div className="ads_ads">
            <img src={poster} alt="Promotional poster" />
          </div>
          <div className="drodpwn_h2222">
            <h1>Customer Support Center</h1>
          </div>
          <div className="drodpwn_para">
            <p>
              Welcome to Blocket's customer service. Here you can get answers to
              most questions about buying and selling with us.
            </p>
          </div>
          <div className="drodpwn_minner">
            <InputField
              CiSearchIcon
              InputButton
              buttonText="Search"
              placeholder="Search help articles"
            />
          </div>
          <div className="feature_cards_container">
            {featureCards.map((card) => (
              <div key={card.id} className="insurance_card card_help_contact">
                <h4 className="insurance_card_title color_help">
                  {card.title}
                </h4>
                <p className="insurance_card_text coloring_efefct">
                  {card.text}
                </p>
              </div>
            ))}
            {/* New Support Section */}
          </div>
          <section className="support_section">
            <div className="support_section_container">
              <div className="support_section_left">
                <div className="support_card">
                  <h3 className="support_card_heading">
                    {supportCards[0].heading}
                  </h3>
                  <h4 className="support_card_title">
                    {supportCards[0].title}
                  </h4>
                  <div className="support_card_icon_red">
                    <div className="support_card_icon">
                      {supportCards[0].icon}
                    </div>
                    <p className="support_card_text">{supportCards[0].text}</p>
                  </div>{" "}
                  <div className="support_card_icon_red">
                    <div className="support_card_icon">
                      {supportCards[0].icon}
                    </div>
                    <p className="support_card_text">{supportCards[0].text}</p>
                  </div>
                  <a
                    href={supportCards[0].linkUrl}
                    className="support_card_link"
                  >
                    {supportCards[0].linkText}
                  </a>
                </div>
              </div>
              <div className="support_section_right">
                <div className="support_card">
                  <h3 className="support_card_heading">
                    {supportCards[1].heading}
                  </h3>
                  <h4 className="support_card_title">
                    {supportCards[1].title}
                  </h4>
                  <div className="support_card_icon_red">
                    <div className="support_card_icon">
                      {supportCards[1].icon}
                    </div>
                    <p className="support_card_text">{supportCards[1].text}</p>
                  </div>{" "}
                  <div className="support_card_icon_red">
                    <div className="support_card_icon">
                      {supportCards[1].icon}
                    </div>
                    <p className="support_card_text">{supportCards[1].text}</p>
                  </div>
                  <a
                    href={supportCards[1].linkUrl}
                    className="support_card_link"
                  >
                    {supportCards[1].linkText}
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="drodpwn_h2222">
            <h1>I Need Help With</h1>
          </div>
          <div className="benefit_section">
            <div className="benefit_cards_container card_mount">
              {benefitCards.map((card) => (
                <div key={card.id} className="benefit_card card_trip">
                  <div className="benefit_cart">
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className="benefit_carted">
                    <h3 className="benefit_card_title">{card.title}</h3>
                    <p className="benefit_card_text">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Accordian />{" "}
        </div>
      </div>
    </>
  );
};

export default HelpContact;
