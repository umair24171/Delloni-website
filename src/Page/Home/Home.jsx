import React from "react";
import Navbar from "../../shared/Navbar";
import HomeHero from "../../components/Home/homeHero/homeHero";
import DynamicIcons from "../../helpers/DynamicIcons";
import poster from "../../assets/poster.jpg";
import HomeFind from "../../components/Home/homeFind/homeFind";
import Footer from "../../shared/footer/footer";

const Home = () => {
  return (
    <div className="advertisement_mained">
      <Navbar />
      <HomeHero />
      <div className="categoriesTitleMain">
        <div className="categoriesTitle">
          <p>Discover our categories</p>
        </div>
      </div>
      <DynamicIcons />
      {/* <div className="categoriesTitleMain">
        <div className="categoriesTitle">
          <img src={poster} alt="" />
        </div>
      </div>
      <HomeFind /> */}
      <Footer />
    </div>
  );
};

export default Home;
