import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";
import DigitalPurchase from "../../../components/Footer/CustomerSecurity/OurServices/DigitalPurchase";

const DigitalPurchasePage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <CustomerDropdown />
      <DigitalPurchase />
      <Footer />
    </div>
  );
};

export default DigitalPurchasePage;
