import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import HelpContact from "../../../components/Footer/Terms/HelpContact";

const HelpContactPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <HelpContact />
      <Footer />
    </div>
  );
};

export default HelpContactPage;
