import React from "react";
import SalesTeam from "../../../components/Footer/Terms/SalesTeam";
import Navbar from "../../../shared/Navbar";
import Footer from "../../../shared/footer/footer";

const SalesTeamPage = () => {
  return (
    <div className="advertisement_mained">
      {" "}
      <Navbar />
      <SalesTeam />
      <Footer />
    </div>
  );
};

export default SalesTeamPage;
