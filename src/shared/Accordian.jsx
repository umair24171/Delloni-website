import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "./acc.css";

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      question: "How is my car’s value calculated?",
      answer:
        "Your car’s value is determined using a combination of real-time market data, current supply and demand trends, vehicle specifications (such as model, make, mileage, condition, and service history), and historical sales data. Our platform leverages AI-driven valuation models to ensure each estimate reflects current market conditions, offering you the most accurate and fair assessment possible.",
    },
    {
      question: "Is the valuation free?",
      answer:
        "Yes, the valuation is completely free of charge. We believe in transparency and accessibility, which is why we offer unlimited access to our vehicle valuation tool without any hidden fees or obligations. You can use the service as often as needed to make informed decisions about your vehicle.",
    },
    {
      question: "Can I trust the estimate?",
      answer:
        "Absolutely. Our estimates are powered by verified sales data, machine learning algorithms, and up-to-date industry insights. While market values may fluctuate slightly over time, the valuation you receive is a reliable benchmark to guide negotiations, resale, or trade-in decisions. For added trust and credibility, the system is regularly audited and benchmarked against leading valuation services.",
    },
    {
      question: "How long does it take?",
      answer:
        "The valuation process is designed to be quick and user-friendly. Once you input your vehicle’s details, the system generates a detailed report within seconds. There’s no need for manual reviews or long wait times, making it ideal for both casual users and professionals who need rapid assessments.",
    },
    {
      question: "Do I need to visit a dealer?",
      answer:
        "No dealership visit is required for the initial valuation. Everything is conducted online using our secure and intuitive platform. However, if you choose to proceed with a sale or trade-in, some buyers or dealers may request a physical inspection to validate the vehicle’s condition. In such cases, you’ll be notified in advance with clear next steps.",
    },
  ];

  return (
    <div className="faq_split_section">
      <div className="faq_split_left left_drift">
        <h3>Questions and answers</h3>
        <div className="accordion">
          {accordionData.map((item, index) => (
            <div key={index} className="accordion_item">
              <div
                className={`accordion_question ${
                  openIndex === index ? "active" : ""
                }`}
                onClick={() => handleToggle(index)}
              >
                <span>{item.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="accordion_icon active" />
                ) : (
                  <FaChevronDown className="accordion_icon" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index ? (
                  <motion.div
                    className="accordion_underline"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                ) : (
                  <motion.div
                    className="accordion_underline closed"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="accordion_answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <h2>Every thing you need to know</h2>
      </div>
    </div>
  );
};

export default Accordian;
