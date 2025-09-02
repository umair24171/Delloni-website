import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import ShippingPurchase from "../../../components/Footer/CustomerSecurity/OurServices/ShippingPurchase";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";

const ShippingPurchasePage = () => {
  return (
    <div className="advertisement_mained">
      <Navbar />
      {/* <CustomerDropdown /> */}
      <ShippingPurchase />
      <Footer />
    </div>
  );
};

export default ShippingPurchasePage;
