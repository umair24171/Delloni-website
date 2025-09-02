import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./openStore.css";
import poster from "../../../assets/poster.jpg";

const OpenStore = () => {
  const dropdownOptions = [
    "General Inquiry",
    "Store Setup",
    "Payment Issues",
    "Shipping Questions",
    "Account Support",
  ];

  const tableData = [
    {
      policy: "Selling personal items",
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: <FaCheck className="table_icon_check" />,
    },
    {
      policy:
        'Using <strong><a href="/images" className="table_link">copyrighted images</a></strong>',
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: null,
    },
    {
      policy:
        'Offering <strong><a href="/shipping" className="table_link">tracked shipping</a></strong>',
      notAllowed: null,
      allowed: <FaCheck className="table_icon_check" />,
    },
    {
      policy:
        'Sharing personal <strong><a href="/privacy" className="table_link">contact details</a></strong>',
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: null,
    },
    {
      policy:
        'Providing <strong><a href="/returns" className="table_link">return options</a></strong>',
      notAllowed: null,
      allowed: <FaCheck className="table_icon_check" />,
    },
    {
      policy: "Selling personal items",
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: <FaCheck className="table_icon_check" />,
    },
    {
      policy:
        'Using <strong><a href="/images" className="table_link">copyrighted images</a></strong>',
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: null,
    },
    {
      policy:
        'Offering <strong><a href="/shipping" className="table_link">tracked shipping</a></strong>',
      notAllowed: null,
      allowed: <FaCheck className="table_icon_check" />,
    },
    {
      policy:
        'Sharing personal <strong><a href="/privacy" className="table_link">contact details</a></strong>',
      notAllowed: <FaTimes className="table_icon_cross" />,
      allowed: null,
    },
    {
      policy:
        'Providing <strong><a href="/returns" className="table_link">return options</a></strong>',
      notAllowed: null,
      allowed: <FaCheck className="table_icon_check" />,
    },
  ];

  return (
    <div className="store_container">
      <div className="store_max_width">
        {/* Section 1: Heading and Large Paragraph */}
        <section className="store_section_one">
          <h2 className="store_heading">Welcome to Opening Your Store</h2>
          <p className="store_para">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            aperiam enim quos assumenda voluptate! Eum, itaque? Ipsum nostrum
            cum dicta consequatur. Libero doloremque, culpa veritatis obcaecati,
            odit voluptatum iure numquam animi ullam, nemo debitis est! Animi
            atque accusantium velit ad aliquam molestiae placeat ratione. Ex
            veritatis numquam voluptates modi atque asperiores harum totam, iure
            quod reiciendis quam officia natus magni quas culpa, vitae alias
            quibusdam consequatur fuga non tempora. Eligendi laboriosam
            explicabo iste molestias culpa. Eum id vitae optio modi rem,
            expedita dolor! Voluptate pariatur voluptatibus vel sit quasi,
            assumenda reiciendis! Quidem vel atque ex aut aspernatur totam
            numquam necessitatibus.
          </p>
        </section>

        {/* Section 2: Table */}
        <section className="store_section_two">
          <h2 className="store_heading">Store Policies</h2>
          <table className="store_table">
            <thead>
              <tr>
                <th>Policy</th>
                <th>Not Allowed</th>
                <th>Allowed</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "table_row_even" : "table_row_odd"
                  }
                >
                  <td dangerouslySetInnerHTML={{ __html: row.policy }} />
                  <td>{row.notAllowed}</td>
                  <td>{row.allowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 3: Contact Form */}
        <section className="store_section_three">
          <h2 className="store_heading">Contact Us</h2>
          <form className="store_form">
            <div className="form_group">
              <label htmlFor="name" className="form_label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form_input"
                placeholder="Enter your name"
              />
            </div>
            <div className="form_group">
              <label htmlFor="inquiry" className="form_label">
                Inquiry Type
              </label>
              <select id="inquiry" className="form_select">
                <option value="" disabled selected>
                  Select inquiry type
                </option>
                {dropdownOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_group">
              <label htmlFor="message" className="form_label">
                Message
              </label>
              <textarea
                id="message"
                className="form_textarea"
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="form_button">
              Submit Inquiry
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OpenStore;
