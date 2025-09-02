import React from "react";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";
import Gallery from "../../../components/Footer/CustomerSecurity/OurServices/Gallery";
import CustomerDropdown from "../../../components/Footer/CustomerSecurity/CustomerDropdown";

const GalleryPage = () => {
  return (
    <div className="advertisement_mained">
      <Navbar />
      <CustomerDropdown />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
