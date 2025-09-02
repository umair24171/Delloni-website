import React from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/footer/footer";
import CustomerDropdown from "../../components/Footer/CustomerSecurity/CustomerDropdown";
import OurSecurity from "../../components/Footer/CustomerSecurity/OurSecurity";

const CustomerSecurity = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      {/* <CustomerDropdown /> */}
      <OurSecurity />
      <Footer />
    </div>
  );
};

export default CustomerSecurity;
