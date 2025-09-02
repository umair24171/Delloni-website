import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaStar } from "react-icons/fa";
import InputField from "../../../helpers/InputField";
import DynamicDropdown from "../../../helpers/DynamicDropdown";
import "./salesTeam.css";
import poster from "../../../assets/poster.jpg";
import { MdOutlineArrowForward } from "react-icons/md";
import Accordian from "../../../shared/Accordian";

const SalesTeam = () => {
  const [showMore, setShowMore] = useState(false);

  const dropdownOptions = [
    "Sales Strategy",
    "Customer Support",
    "Market Analysis",
    "Product Training",
    "Account Management",
  ];

  // Slider images
  const sliderImages = [poster, poster, poster, poster];

  // Data for section 4 rows
  const teamRows = [
    {
      image: poster,
      heading: "Sarah Johnson",
      para: "Leads our sales team with innovative strategies to drive revenue growth.",
    },
    {
      image: poster,
      heading: "Michael Chen",
      para: "Expert in building strong client relationships and closing deals.",
    },
    {
      image: poster,
      heading: "Emily Davis",
      para: "Specializes in market trends and competitive analysis.",
    },
    {
      image: poster,
      heading: "James Carter",
      para: "Focuses on training and empowering our sales force.",
    },
  ];

  // Data for section 6 cards
  const cards = [
    {
      heading: "Strategic Planning",
      para: "We craft tailored sales strategies designed to align with your unique business goals, market conditions, and customer needs",
    },
    {
      heading: "Client Success",
      para: "Our dedicated client success team works closely with you at every stage of the journey to ensure smooth onboarding, prompt support,",
    },
    {
      heading: "Data Insights",
      para: "We turn complex data into clear, actionable insights that empower smarter decisions. Through advanced analytics, we identify patterns, predict trends, and help optimize your sales strategies for greater efficiency and higher returns.",
    },
  ];

  // Data for section 7 rows
  const featureRows = [
    {
      heading: "Rapid Response",
      para: "Our sales team addresses your inquiries within hours.",
    },
    {
      heading: "Industry Expertise",
      para: "Benefit from our deep knowledge of sales trends.",
    },
    {
      heading: "Tailored Solutions",
      para: "Solutions designed to fit your unique business needs.",
    },
  ];

  return (
    <div className="sales_team_container">
      {/* Section 1 */}
      <section className="sales_section_one">
        <div className="sales_max_width">
          <div className="sales_one_left">
            <h3 className="sales_subheading">Our Sales Experts</h3>
            <h2 className="sales_heading">Discover Our Sales Team</h2>
            <p className="sales_para">
              At Vend, we want you to explore new paths to smarter. Be curious
              with technology and lean forward. Dare to try, learn, and try
              again, as we innovate, grow and succeed together. Because your
              time matters. And when spent wisely, it creates value for you, for
              Vend, and society as a whole.
            </p>
          </div>
          <div className="sales_one_right">
            <motion.img
              src={poster}
              alt="Sales Team"
              className="sales_image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Infinite Slider */}
      <section className="sales_section_two">
        <div className="sales_max_width">
          <motion.div
            className="sales_slider"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...sliderImages, ...sliderImages].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="sales_slider_image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="sales_section_three">
        <div className="sales_max_width">
          <div className="sales_three_left">
            <motion.img
              src={poster}
              alt="Strategy"
              className="sales_image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="sales_three_right">
            <h3 className="sales_subheading">Our Sales Approach</h3>
            <h2 className="sales_heading">Proven Sales Strategies</h2>
            <p className="sales_para">
              Our dedicated team leverages advanced data-driven insights,
              cutting-edge marketing strategies, and innovative technological
              approaches to significantly enhance your sales performance. By
              continuously analyzing trends, consumer behavior, and market
              opportunities, we craft customized solutions that not only drive
              immediate results but also lay the foundation for sustainable,
              long-term business growth and success.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="sales_section_four">
        <div className="sales_max_width">
          <h2 className="sales_heading">Connect with Our Team</h2>
          <InputField
            CiSearchIcon
            InputButton
            buttonText="Search"
            placeholder="Search sales team inquiries"
          />
          <div className="sales_dropdown_row">
            <DynamicDropdown
              options={dropdownOptions}
              defaultOption="Select Category"
              label="Sales Inquiry"
            />
            <DynamicDropdown
              options={dropdownOptions}
              defaultOption="Select Topic"
              label="Topic"
            />
            <DynamicDropdown
              options={dropdownOptions}
              defaultOption="Select Priority"
              label="Priority"
            />
          </div>
          <div className="sales_team_rows">
            {teamRows
              .slice(0, showMore ? teamRows.length : 2)
              .map((row, index) => (
                <motion.div
                  key={index}
                  className="sales_team_row"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 8px var(--lite)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={row.image}
                    alt={row.heading}
                    className="sales_row_image"
                  />
                  <div className="sales_row_content">
                    <h3 className="sales_row_heading row_heading">
                      {row.heading}
                    </h3>
                    <p className="sales_para row_sales">{row.para}</p>
                  </div>
                </motion.div>
              ))}
          </div>
          <motion.button
            className="sales_show_button"
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05, backgroundColor: "var(--link)" }}
            transition={{ duration: 0.2 }}
          >
            {showMore ? "Show Fewer" : "Show More"}
          </motion.button>
        </div>
      </section>

      {/* Section 5 */}
      <section className="sales_section_five">
        <div className="sales_max_width">
          <div className="sales_five_left">
            <h2 className="sales_heading">Join Our Sales Force</h2>
            <p className="sales_para">
              What’s it like to work at Vend? It’s about purpose, people, and
              possibilities. Whether you're building the next generation of
              marketplaces, collaborating across borders, or just enjoying fika
              with your team, life here is full of moments that matterWhether
              you're building the next generation of marketplaces, collaborating
              across borders, or just enjoying fika with your team, life here is
              full of moments that matter.
            </p>
            <motion.button
              className="sales_action_button"
              whileHover={{ scale: 1.05, backgroundColor: "var(--link)" }}
              transition={{ duration: 0.2 }}
            >
              Start Your Career <FaChevronRight className="sales_button_icon" />
            </motion.button>
          </div>
          <div className="sales_five_right">
            <motion.img
              src={poster}
              alt="Join Team"
              className="sales_image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="sales_section_six">
        <div className="sales_max_width">
          <div className="sales_six_left">
            <h3 className="sales_subheading">Sales Services</h3>
            <h2 className="sales_heading">Our Sales Expertise</h2>
            <motion.img
              src={poster}
              alt="Services"
              className="sales_image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="sales_six_right">
            <div className="sales_card_row">
              {cards.slice(0, 2).map((card, index) => (
                <motion.div
                  key={index}
                  className="sales_card"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 8px var(--lite)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="sales_card_heading">{card.heading}</h3>
                  <p className="sales_para">{card.para}</p>
                </motion.div>
              ))}
            </div>
            <div className="sales_card_row">
              {cards.slice(2).map((card, index) => (
                <motion.div
                  key={index}
                  className="sales_card"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 8px var(--lite)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="sales_card_heading">{card.heading}</h3>
                  <p className="sales_para">{card.para}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section className="sales_section_seven">
        <div className="sales_max_width">
          <div className="sales_seven_left">
            <h2 className="sales_heading">Why Vend Sales</h2>
            <h3 className="sales_subheading">
              We develop marketplaces in four core verticals—Mobility,
              Recommerce, Real Estate and Jobs.
            </h3>
            <motion.button
              className="sales_action_button"
              whileHover={{ scale: 1.05, backgroundColor: "var(--link)" }}
              transition={{ duration: 0.2 }}
            >
              Explore Benefits <FaChevronRight className="sales_button_icon" />
            </motion.button>
          </div>
          <div className="sales_seven_right">
            {featureRows.map((row, index) => (
              <motion.div
                key={index}
                className="sales_feature_row"
                whileHover={{ scale: 1.02, boxShadow: "0 4px 8px var(--lite)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="sales_feature_content">
                  <div>
                    <h3 className="sales_row_heading">
                      {row.heading}{" "}
                      <MdOutlineArrowForward className="sales_feature_icon" />
                    </h3>
                    <p className="sales_para">{row.para}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="sales_max_width">
        <Accordian />
      </div>
      {/* Section 8 */}
      <section className="sales_section_eight">
        <div className="sales_max_width">
          <div className="sales_eight_left">
            <motion.img
              src={poster}
              alt="Contact"
              className="sales_image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="sales_eight_right">
            <h2 className="sales_heading">Reach Our Sales Experts</h2>
            <p className="sales_para">
              Have questions about a role, our recruitment process, or what it’s
              like to work at Vend? We’re here to help. Contact us or connect
              with us on LinkedIn – we love meeting future colleagues!
            </p>
            <motion.button
              className="sales_action_button"
              whileHover={{ scale: 1.05, backgroundColor: "var(--link)" }}
              transition={{ duration: 0.2 }}
            >
              Email Our Team <FaChevronRight className="sales_button_icon" />
            </motion.button>
            <motion.button
              className="sales_action_button secondary"
              whileHover={{ scale: 1.05, backgroundColor: "var(--link)" }}
              transition={{ duration: 0.2 }}
            >
              Call Our Team <FaChevronRight className="sales_button_icon" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesTeam;
