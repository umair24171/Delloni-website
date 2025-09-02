import React from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/footer/footer";
import SecurityRequest from "../../components/Footer/SecurityRequest/SecurityRequest";

const SecurityRequestPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <SecurityRequest />
      <Footer />
    </div>
  );
};

export default SecurityRequestPage;
