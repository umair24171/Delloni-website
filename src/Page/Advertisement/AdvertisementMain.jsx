import React, { useState } from "react";
import DynamicIcons from "../../helpers/DynamicIcons";
import Ads from "../../components/Advertisement/Ads";
import AdsSorting from "../../components/Advertisement/AdsSorting";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/footer/footer";

const AdvertisementMain = () => {
  const [filters, setFilters] = useState({
    category: null,
    searchTerm: '',
    priceRange: { min: null, max: null },
    location: null,
  });

  const handleFiltersChange = (newFilters) => {
    console.log('Filters updated:', newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="advertisement_mained">
      <Navbar />
      <DynamicIcons />
      <Ads onFiltersChange={handleFiltersChange} />
      <AdsSorting filters={filters} />
      <Footer />
    </div>
  );
};

export default AdvertisementMain;