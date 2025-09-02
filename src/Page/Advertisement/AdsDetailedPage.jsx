import React from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/footer/footer";
import AdsDetailedCategory from "../../components/Advertisement/AdsDetailedCategory";
import OtherViewed from "../../components/Advertisement/OtherViewed";

const AdsDetailedPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <AdsDetailedCategory />
      <OtherViewed />
      <Footer />
    </div>
  );
};

export default AdsDetailedPage;
