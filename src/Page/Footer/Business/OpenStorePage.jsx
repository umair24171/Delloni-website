import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import OpenStore from "../../../components/Footer/Business/OpenStore";

const OpenStorePage = () => {
  return (
    <div className="advertisement_mained">
      <Navbar />
      <OpenStore />
      <Footer />
    </div>
  );
};

export default OpenStorePage;
