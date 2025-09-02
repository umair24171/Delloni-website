import React from "react";
import { useNavigate } from "react-router-dom";
import poster from "../../../../assets/poster.jpg";

const Gallery = () => {
  const navigate = useNavigate();
  const contactBtn = () => {
    navigate("/our-services/post-an-add");
  };
  return (
    <>
      <div className="overall_dynamic_class heroHomeBg">
        <div className="overall_main_cycle">
          Get more people to discover your ad and increase your chances of a
          deal.
        </div>
      </div>
      <div className="drodpwn_h2222_full">
        <div className="secuirty_poster_min">
          <div className="dropdown-secutiy">
            <div className="drodpwn_h2222">
              <h2>The gallery</h2>
            </div>{" "}
            <div className="drodpwn_lite">
              <h2>
                On a typical day at Blocket, the gallery is viewed several
                million times, which means you can find interested buyers
                faster.
              </h2>
            </div>{" "}
            <div className="drodpwn_block">
              <h2>The Block's Customer Security Team</h2>
            </div>{" "}
            <div className="drodpwn_para">
              <p>
                At Blocket, we are about 10 employees working to make Blocket
                the world's safest marketplace. This is a selection of what we
                do:
              </p>
            </div>
            <div className="security_ulll">
              <ul>
                <li>
                  We review ads and conduct ongoing checks on ads and users.
                </li>
                <li>
                  We inform and guide our users on how to conduct secure
                  transactions in all categories.
                </li>
                <li>
                  We develop and offer features for secure payments, temporary
                  phone numbers and other security services.
                </li>
                <li>
                  We filter messages between users to prevent spam and offensive
                  or abusive content.
                </li>
                <li>
                  We collaborate with the Police, other authorities and
                  organizations to best prevent illegal activities and to
                  provide tips and advice for those who are going to buy
                  second-hand from other private individuals.
                </li>{" "}
                <li>
                  We adapt our advertising rules to how the conditions and laws
                  in the world around us change and what we ourselves believe is
                  consistent with our values.
                </li>{" "}
                <li>
                  We conduct seminars and training with the Police and other
                  authorities to spread knowledge and awareness of how we can
                  help them in their work.
                </li>{" "}
                <li>
                  If necessary, we share information about users with the Police
                  and other authorities in connection with investigations and
                  preliminary investigations
                </li>
              </ul>
            </div>
            <div className="drodpwn_block">
              <h2>We combat fraud</h2>
            </div>{" "}
            <div className="drodpwn_para">
              <p>
                Every year, millions of transactions are made via Blocket.
                Wherever payments are made, fraudsters can be tempted to try to
                commit crimes, but this represents less than one per thousand of
                all transactions with us. If someone is the victim of fraud, we
                take it very seriously. However, we are not on site when the
                transaction is carried out and a large part of our work is
                therefore about providing information on how to shop safely on
                Blocket. We cooperate with various authorities and organizations
                such as the Police, Customs, the Swedish Board of Agriculture,
                Animal Welfare and the Swedish Anti-Theft Association.
              </p>
            </div>{" "}
            <div className="drodpwn_block">
              <h2>We do not allow pirated copies.</h2>
            </div>{" "}
            <div className="drodpwn_para">
              <p>
                It is not allowed to sell pirated copies and counterfeits of,
                for example, branded products or computer software on Blocket.
                The organized trade in pirated copies often contributes to
                financing other criminal activity. The goods are often produced
                under conditions that are hazardous to the health of the
                employees and may contain substances that are harmful to you as
                a user. We cooperate with more than 140 brands to combat the
                advertising of pirated copies. They help us review
                advertisements that are published with their respective
                products.
              </p>
            </div>{" "}
            <div className="drodpwn_block">
              <h2>We want to be a fair marketplace</h2>
            </div>{" "}
            <div className="drodpwn_para">
              <p>
                All ads are reviewed based on Swedish law and Blocket's own
                rules. Every day we refrain from publishing thousands of ads.
                For example, we do not allow the sale of medicines, soft air
                guns or content that can be perceived as offensive. For
                environmental reasons, we also advise our users not to reuse
                refrigerators that are too old or toys that contain liquid. In
                collaboration with the Swedish Animal Welfare Service, we have
                also set up rules regarding minimum prices for cats and dogs to
                avoid ill-considered purchases. We are constantly fine-tuning
                our regulations to adapt to current events and the prevailing
                market.
              </p>
            </div>
            <div className="poster-image-poster">
              <img src={poster} alt="" />
            </div>
            <div className="secuirty_need_main">
              <div className="secuirty_need">
                <p>Place an add and add to the Gallery</p>
              </div>
              <button className="contact_here_btn" onClick={contactBtn}>
                Sell whatyou don' need - post an add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
