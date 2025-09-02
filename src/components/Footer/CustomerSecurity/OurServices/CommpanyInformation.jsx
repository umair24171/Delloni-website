import React from "react";
import "./company.css";
import { IoIosArrowForward } from "react-icons/io";
import InputField from "../../../../helpers/InputField";
import placeholderImg from "../../../../assets/poster.jpg";
import ads from "../../../../assets/ad2.jpg";

const faqItems = [
  {
    question: "What is the advertising process?",
    answer: (
      <>
        To advertise on our platform, the first step is to{" "}
        <strong>create an account</strong> using your email or social login.
        Once registered, log in to your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>{" "}
        and select “Create New Ad.” Choose a <strong>category</strong> that fits
        your product or service, then provide a <strong>title</strong>,{" "}
        <strong>description</strong>, pricing, and upload{" "}
        <strong>images</strong>. Our system supports <strong>standard</strong>,{" "}
        <strong>featured</strong>, and <strong>promoted</strong> listings. After
        submission, your ad enters a <strong>review process</strong> to ensure
        compliance with our{" "}
        <a href="#" className="info_inline_link">
          content guidelines
        </a>
        .
      </>
    ),
  },
  {
    question: "How long does ad approval take?",
    answer: (
      <>
        Ad approval typically takes <strong>24-48 hours</strong>. Our moderation
        team reviews each ad to ensure it meets our{" "}
        <strong>community standards</strong> and{" "}
        <strong>legal requirements</strong>. During peak times, it may take
        longer, but you’ll receive an <strong>email notification</strong> once
        approved. If rejected, we provide <strong>feedback</strong> for
        revisions. Check our{" "}
        <a href="#" className="info_inline_link">
          guidelines
        </a>{" "}
        to avoid delays.
      </>
    ),
  },
  {
    question: "Can I edit my ad after posting?",
    answer: (
      <>
        Yes, you can <strong>edit</strong> your ad anytime via your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>
        . Update <strong>text</strong>, <strong>images</strong>, or{" "}
        <strong>pricing</strong> before or after approval. Changes may trigger a{" "}
        <strong>re-review</strong> to ensure compliance.
      </>
    ),
  },
  {
    question: "What payment methods are accepted?",
    answer: (
      <>
        We accept <strong>credit cards</strong> (Visa, MasterCard, Amex),{" "}
        <strong>PayPal</strong>, and <strong>bank transfers</strong>. All
        payments are processed through our <strong>secure gateway</strong>. View
        our{" "}
        <a href="#" className="info_inline_link">
          pricing plans
        </a>{" "}
        for details.
      </>
    ),
  },
  {
    question: "Is there a refund policy?",
    answer: (
      <>
        <strong>Refunds</strong> are available within <strong>7 days</strong> of
        ad posting if not approved or canceled before going live. Contact our{" "}
        <a href="#" className="info_inline_link">
          support team
        </a>{" "}
        to initiate a refund.
      </>
    ),
  },
  {
    question: "How do I increase ad visibility?",
    answer: (
      <>
        Boost visibility with <strong>promoted listings</strong> or{" "}
        <strong>featured ads</strong>. These options place your ad at the top of{" "}
        <strong>search results</strong> or <strong>category pages</strong>.
        Select them during ad creation or upgrade later via your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>
        .
      </>
    ),
  },
  {
    question: "Are there ad restrictions?",
    answer: (
      <>
        Yes, ads must comply with our <strong>content guidelines</strong>,
        prohibiting <strong>illegal</strong>, <strong>offensive</strong>, or{" "}
        <strong>misleading</strong> content. Review our{" "}
        <a href="#" className="info_inline_link">
          guidelines
        </a>{" "}
        before submitting.
      </>
    ),
  },
  {
    question: "Can I advertise internationally?",
    answer: (
      <>
        Yes, select the <strong>international option</strong> during ad creation
        to target <strong>global audiences</strong>. Additional{" "}
        <strong>fees</strong> may apply for certain regions. Check our{" "}
        <a href="#" className="info_inline_link">
          pricing plans
        </a>{" "}
        for details.
      </>
    ),
  },
  {
    question: "What is BankID verification?",
    answer: (
      <>
        <strong>BankID</strong> verifies your <strong>identity</strong> for{" "}
        <strong>secure transactions</strong>, enhancing trust. It’s required for{" "}
        <strong>certain ad types</strong>. Learn more in our{" "}
        <a href="#" className="info_inline_link">
          help center
        </a>
        .
      </>
    ),
  },
  {
    question: "How do I contact support?",
    answer: (
      <>
        Reach our <strong>support team</strong> via the{" "}
        <a href="#" className="info_inline_link">
          help center
        </a>
        , email at <strong>support@company.com</strong>, or call our{" "}
        <strong>24/7 line</strong> at +1-800-123-4567.
      </>
    ),
  },
  {
    question: "What are promoted listings?",
    answer: (
      <>
        <strong>Promoted listings</strong> place your ad at the top of{" "}
        <strong>search results</strong> or <strong>category pages</strong>,
        increasing <strong>clicks</strong> by up to 50%. Enable them in your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I pause an active ad?",
    answer: (
      <>
        Yes, <strong>pause</strong> or <strong>resume</strong> your ad from your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>{" "}
        without losing <strong>settings</strong> or{" "}
        <strong>performance data</strong>.
      </>
    ),
  },
  {
    question: "How do I track ad performance?",
    answer: (
      <>
        Monitor <strong>views</strong>, <strong>clicks</strong>, and{" "}
        <strong>conversions</strong> in real-time via our{" "}
        <a href="#" className="info_inline_link">
          analytics dashboard
        </a>
        . Download <strong>weekly reports</strong> for detailed insights.
      </>
    ),
  },
  {
    question: "Are there discounts for bulk ads?",
    answer: (
      <>
        Yes, we offer <strong>discounts</strong> for advertisers posting{" "}
        <strong>10 or more ads</strong> per month. Contact our{" "}
        <a href="#" className="info_inline_link">
          sales team
        </a>{" "}
        for a custom quote.
      </>
    ),
  },
  {
    question: "What happens if my ad is rejected?",
    answer: (
      <>
        If your ad is <strong>rejected</strong>, you’ll receive an{" "}
        <strong>email</strong> with the reason and{" "}
        <strong>revision suggestions</strong>. Revise and resubmit via your{" "}
        <a href="#" className="info_inline_link">
          dashboard
        </a>
        . Review our{" "}
        <a href="#" className="info_inline_link">
          guidelines
        </a>{" "}
        to prevent rejections.
      </>
    ),
  },
];

const adCards = [
  { id: 1, text: "Standard Ads" },
  { id: 2, text: "Featured Ads" },
  { id: 3, text: "Promoted Ads" },
  { id: 4, text: "Promoted Ads" },
  { id: 5, text: "Promoted Ads" },
];

const CompanyInformation = () => {
  return (
    <div className="overall_dynamic_class">
      <div className="overall_maxwidth">
        {/* <div className="dynamic_send">
          Customer Service
          <IoIosArrowForward />
          <span className="open_dream">Frequently asked questions</span>
          <IoIosArrowForward />
          <span className="open_dream">Advertising</span>
        </div> */}
        <div className="drodpwn_minner">
          <InputField
            CiSearchIcon
            InputButton
            buttonText="Search"
            placeholder="Search help articles"
          />
          <div className="drodpwn_para">
            <p>
              For example, search for shipping, sales tips, BankID, or buy
              directly
            </p>
          </div>
        </div>
        <div className="company_info_container">
          <div className="company_info_left">
            <h2 className="info_heading">Advertising with Us</h2>
            <p className="info_para">
              Learn how to effectively advertise your products or services on
              our platform to reach millions of potential customers.
            </p>
            <ul className="info_list">
              <li>Choose from multiple ad categories.</li>
              <li>Customize your ad with images and descriptions.</li>
              <li>Track performance with real-time analytics.</li>
            </ul>
            <p className="info_bold_para">Why Choose Our Platform?</p>
            <div className="info_color">
              <img
                src={placeholderImg}
                alt="Advertising"
                className="info_image"
              />
            </div>
            <p className="info_para">
              Our platform offers <strong>unmatched reach</strong> and{" "}
              <strong>targeted advertising</strong> to ensure your ads connect
              with the right audience.
            </p>
            <h2 className="info_heading">Frequently Asked Questions</h2>
            <p className="info_bold_para">Getting Started</p>
            <p className="info_para">
              New to advertising? Start by creating a free account and exploring
              our ad options.
            </p>
            <p className="info_bold_para">Support and Resources</p>
            <p className="info_para">
              Our help center provides guides and tutorials to maximize your ad
              success.
            </p>
            {faqItems.map((item, index) => (
              <div key={index} className="faq_item">
                <p className="info_bold_para">{item.question}</p>
                <p className="info_para">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="company_info_right">
            <h3 className="info_side_heading">Related Topics</h3>
            <a href="#" className="info_link">
              Price list for companies
            </a>
            <a href="#" className="info_link">
              Why has my ad been rejected?
            </a>
            <a href="#" className="info_link">
              Which browsers do you recommend?
            </a>
            <a href="#" className="info_link">
              How do I log in to my Vend account?
            </a>
            <a href="#" className="info_link">
              BankID on the Block
            </a>
            <h3 className="info_side_heading">Support</h3>
            <a href="#" className="info_link">
              Why am I getting annoying ads?
            </a>
            <div className="ads_sections_fixed">
              <img src={ads} alt="Advertisement" />
            </div>
          </div>
        </div>
        <div className="ad_options_section">
          <p className="ad_options_intro">
            Discover our{" "}
            <a href="#" className="info_inline_link">
              ad options
            </a>{" "}
            to find the perfect fit for your campaign.
          </p>
          <div className="ad_cards_container">
            {adCards.map((card) => (
              <div key={card.id} className="ad_card">
                <p className="ad_card_text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
