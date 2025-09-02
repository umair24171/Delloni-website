import React from "react";
import Navbar from "../../../shared/Navbar";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";
import Footer from "../../../shared/footer/footer";
import OurSecurity from "../../../components/Footer/CustomerSecurity/OurSecurity";

const FakeEmailPage = () => {
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

export default FakeEmailPage;
