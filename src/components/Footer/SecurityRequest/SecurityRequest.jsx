import React from "react";
import "./request.css";
import { IoIosArrowForward } from "react-icons/io";
import DynamicDropdown from "../../../helpers/DynamicDropdown";
import InputField from "../../../helpers/InputField";

const SecurityRequest = () => {
  const dropdownOptions = [
    "Shipping Issues",
    "Payment Problems",
    "Account Security",
    "Order Tracking",
    "Returns and Refunds",
    "Product Inquiries",
    "Technical Support",
    "Billing Questions",
    "Complaints",
    "General Feedback",
  ];

  return (
    <div className="dropdown-minchedddd">
      <div className="dynamic_max_width">
        <div className="dynamic_send">
          Customer Service
          <IoIosArrowForward />
          <span className="open_dream">Send an inquiry</span>
        </div>
        <div className="drodpwn_minner">
          <InputField
            CiSearchIcon
            InputButton
            buttonText="Search"
            placeholder="Search help articles"
          />
          <div className="drodpwn_para">
            <p>
              For example, search for shipping, sales tips, BankID or buy
              directly
            </p>
          </div>
        </div>
        <div className="drodpwn_h2222">
          <h2>Send an inquiry</h2>
        </div>
        <div className="drodpwn_para_semm">
          <div className="drodpwn_para">
            <p>Choose your question below</p>
          </div>
          <DynamicDropdown
            options={dropdownOptions}
            defaultOption="Select an inquiry"
            label="Inquiry Type"
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityRequest;
