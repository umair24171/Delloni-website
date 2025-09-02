import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import AllOurServices from "../../../components/Footer/CustomerSecurity/OurServices/AllOurServices";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";

const OurServicesPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      {/* <CustomerDropdown /> */}
      <AllOurServices />
      <Footer />
    </div>
  );
};

export default OurServicesPage;
