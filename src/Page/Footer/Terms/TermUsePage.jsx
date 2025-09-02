import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import TermUse from "../../../components/Footer/Terms/TermUse";

const TermUsePage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <TermUse />
      <Footer />
    </div>
  );
};

export default TermUsePage;
