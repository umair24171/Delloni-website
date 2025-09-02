import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import ValueCar from "../../../components/Footer/CustomerSecurity/OurServices/ValueCar";

const ValueCarPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <ValueCar />
      <Footer />
    </div>
  );
};

export default ValueCarPage;
