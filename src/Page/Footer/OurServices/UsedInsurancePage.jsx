import React from "react";
import Navbar from "../../../shared/Navbar";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";
import Footer from "../../../shared/footer/footer";
import UsedInsurance from "../../../components/Footer/CustomerSecurity/OurServices/UsedInsurance";

const UsedInsurancePage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <CustomerDropdown />
      <UsedInsurance />
      <Footer />
    </div>
  );
};

export default UsedInsurancePage;
