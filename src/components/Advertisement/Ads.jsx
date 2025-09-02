import React, { useState, useEffect } from "react";
import "./ads.css";
import "../../helpers/helpers.css";
import poster from "../../assets/f3.jpg";
import InputField from "../../helpers/InputField";
import { BsFilterLeft } from "react-icons/bs";
import CustomModal from "../../helpers/CustomModal";
import { IoIosArrowForward } from "react-icons/io";
import AllCategories from "./AllCategories";
import RegionsInSweden from "./RegionsInSweden";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import PriceCom from "./PriceCom";
import ToggleButton from "../../helpers/ToggleButton";
import { IoIosArrowDown } from "react-icons/io";
import { useCategories } from "../../hooks/useCategories";
import { ProductService } from "../../services/firebaseServices";

// Fallback images for categories
import car from "../../assets/car.png";
import jacket from "../../assets/jacket.png";
import residence from "../../assets/residence.png";
import bed from "../../assets/bed.png";
import bag from "../../assets/bag.png";
import joy from "../../assets/joy.png";
import bowling from "../../assets/bowling.png";
import elect from "../../assets/new.png";

const Ads = ({ onFiltersChange }) => {
  const { categoryTree, loading, error } = useCategories();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    showAllCategories: false,
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSubcategories: [],
    showRegions: false,
    selectedRegion: null,
    selectedRegions: [],
    modalSource: "",
  });
  
  const [showAllAdTypes, setShowAllAdTypes] = useState(false);
  const [showAllSortOptions, setShowAllSortOptions] = useState(false);
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    searchTerm: '',
    priceRange: { min: null, max: null },
    location: null,
    shippingOption: false,
    advertiserType: null,
    adType: null,
    sortBy: 'newest'
  });

  // Read URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    const categoryName = urlParams.get('categoryName');
    const searchTerm = urlParams.get('search');

    if (categoryId && categoryName) {
      setSelectedFilters(prev => ({
        ...prev,
        category: { id: categoryId, name: categoryName }
      }));
    }

    if (searchTerm) {
      setSelectedFilters(prev => ({
        ...prev,
        searchTerm: decodeURIComponent(searchTerm)
      }));
    }
  }, []);

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(selectedFilters);
    }
  }, [selectedFilters, onFiltersChange]);

  // Fetch product counts for categories
  useEffect(() => {
    const fetchProductCounts = async () => {
      if (categoryTree.length > 0) {
        try {
          const categoriesWithCounts = await Promise.all(
            categoryTree.map(async (category) => {
              const productCount = await ProductService.getProductCountByCategory(category.id);
              return {
                ...category,
                productCount,
                image: category.iconUrl || getCategoryFallbackImage(category.name)
              };
            })
          );
          setCategoriesWithCount(categoriesWithCounts);
        } catch (err) {
          console.error('Error fetching product counts:', err);
        }
      }
    };

    fetchProductCounts();
  }, [categoryTree]);

  // Get fallback image for category
  const getCategoryFallbackImage = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('car') || name.includes('vehicle')) return car;
    if (name.includes('cloth') || name.includes('fashion')) return jacket;
    if (name.includes('residence') || name.includes('house')) return residence;
    if (name.includes('home') || name.includes('furniture')) return bed;
    if (name.includes('personal') || name.includes('bag')) return bag;
    if (name.includes('electronics') || name.includes('electronic')) return joy;
    if (name.includes('sport') || name.includes('hobby')) return bowling;
    return elect;
  };

  const filterButtons = [
    { text: "All Filters", hasIcon: true },
    { text: "Category", hasIcon: false },
    { text: "Place", hasIcon: false },
    { text: "Price", hasIcon: false },
    { text: "Ads with Shipping", hasIcon: false },
    { text: "Type of advertiser", hasIcon: false },
  ];

  // Use Firebase categories or fallback
  const categories = categoriesWithCount.length > 0 ? categoriesWithCount : [
    {
      id: 'fallback-vehicle',
      name: "Vehicle",
      image: car,
      count: 0,
      subcategories: [],
    },
    {
      id: 'fallback-home',
      name: "For the Home",
      image: bed,
      count: 0,
      subcategories: [],
    }
  ];

  const regions = [
    {
      name: "Stockholm",
      count: 1500000,
      hasSubRegions: true,
      subRegions: [
        { name: "Stockholm City", count: 800000 },
        { name: "Södertälje", count: 300000 },
        { name: "Nacka", count: 200000 },
      ],
    },
    {
      name: "Västra Götaland",
      count: 1200000,
      hasSubRegions: true,
      subRegions: [
        { name: "Gothenburg", count: 600000 },
        { name: "Borås", count: 200000 },
        { name: "Trollhättan", count: 150000 },
      ],
    },
  ];

  const adTypes = [
    { name: "For Sale" },
    { name: "Changed" },
    { name: "Wanted" },
    { name: "Rental" },
    { name: "Free" },
  ];

  const sortOptions = [
    { name: "Relevance", value: "relevance" },
    { name: "Price: Low to High", value: "price_asc" },
    { name: "Price: High to Low", value: "price_desc" },
    { name: "Newest First", value: "newest" },
    { name: "Oldest First", value: "oldest" },
  ];

  const openModal = (title) => {
    if (title !== "Ads with Shipping") {
      setModalState({
        isOpen: true,
        title,
        showAllCategories: title === "Category" || title === "All Filters",
        selectedCategory: null,
        selectedSubcategory: null,
        showRegions: title === "Place" || title === "All Filters",
        selectedRegion: null,
        selectedSubcategories: [],
        selectedRegions: [],
        modalSource: title,
      });
    } else {
      // Toggle shipping filter directly
      setSelectedFilters(prev => ({
        ...prev,
        shippingOption: !prev.shippingOption
      }));
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      title: "",
      showAllCategories: false,
      selectedCategory: null,
      selectedSubcategory: null,
      showRegions: false,
      selectedRegion: null,
      selectedSubcategories: [],
      selectedRegions: [],
      modalSource: "",
    });
  };

  // Handle category selection from modal
  const handleCategorySelect = (category) => {
    console.log('Category selected:', category);
    setSelectedFilters(prev => ({
      ...prev,
      category: { id: category.id, name: category.name }
    }));
    closeModal();
  };

  // Handle region selection
  const handleRegionSelect = (regionName) => {
    setSelectedFilters(prev => ({
      ...prev,
      location: regionName
    }));
    closeModal();
  };

  // Handle price range selection
  const handlePriceChange = (priceRange) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange
    }));
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setSelectedFilters(prev => ({
      ...prev,
      searchTerm
    }));
  };

  // Clear specific filter
  const clearFilter = (filterType) => {
    setSelectedFilters(prev => {
      const updated = { ...prev };
      switch (filterType) {
        case 'category':
          updated.category = null;
          break;
        case 'location':
          updated.location = null;
          break;
        case 'price':
          updated.priceRange = { min: null, max: null };
          break;
        case 'shipping':
          updated.shippingOption = false;
          break;
        case 'advertiser':
          updated.advertiserType = null;
          break;
        default:
          // Clear all filters
          return {
            category: null,
            searchTerm: '',
            priceRange: { min: null, max: null },
            location: null,
            shippingOption: false,
            advertiserType: null,
            adType: null,
            sortBy: 'newest'
          };
      }
      return updated;
    });
  };

  // Apply all filters from "All Filters" modal
  const applyAllFilters = () => {
    // This will be called when user clicks "View ads" from All Filters modal
    closeModal();
  };

  // Show current selected filters
  const hasActiveFilters = selectedFilters.category || 
                          selectedFilters.searchTerm || 
                          selectedFilters.location ||
                          selectedFilters.shippingOption ||
                          (selectedFilters.priceRange.min || selectedFilters.priceRange.max);

  const getFilterButtonClass = (buttonText) => {
    let isActive = false;
    switch (buttonText) {
      case 'Category':
        isActive = !!selectedFilters.category;
        break;
      case 'Place':
        isActive = !!selectedFilters.location;
        break;
      case 'Price':
        isActive = !!(selectedFilters.priceRange.min || selectedFilters.priceRange.max);
        break;
      case 'Ads with Shipping':
        isActive = selectedFilters.shippingOption;
        break;
      case 'Type of advertiser':
        isActive = !!selectedFilters.advertiserType;
        break;
      default:
        isActive = hasActiveFilters;
    }
    return isActive ? 'ads_filters active-filter' : 'ads_filters';
  };

  const renderModalContent = () => {
    const { title, showAllCategories, showRegions } = modalState;

    switch (title) {
      case "All Filters":
        return (
          <>
            <div className="modal-header">
              <h2 style={{ opacity: "0" }}>All Filters</h2>
              <h2>All Filters</h2>
              <div className="modal-close" onClick={closeModal}>
                Cancel
              </div>
            </div>
            <div className="modal-heade_main">
              {/* Category Section */}
              <div className="modal-header border_remove">
                <h2>Category</h2>
                <div className="modal-close" onClick={() => clearFilter('category')}>
                  Clear
                </div>
              </div>
              {selectedFilters.category ? (
                <div className="selected-filter-display">
                  <strong>Selected: {selectedFilters.category.name}</strong>
                </div>
              ) : (
                <AllCategories
                  showAllCategories={true}
                  onCategorySelect={handleCategorySelect}
                  modalSource="All Filters"
                  closeModal={closeModal}
                />
              )}

              {/* Price Section */}
              <div className="modal-header border_remove">
                <h2>Price</h2>
                <div className="modal-close" onClick={() => clearFilter('price')}>
                  Clear
                </div>
              </div>
              <PriceCom
                modalSource="All Filters"
                onPriceChange={handlePriceChange}
                currentRange={selectedFilters.priceRange}
              />

              {/* Shipping Section */}
              <div className="modal-header border_remove">
                <h2>Delivery options</h2>
              </div>
              <div className="current_switch modal_green">
                <div className="modal-close">Ads with shipping</div>
                <ToggleButton 
                  checked={selectedFilters.shippingOption}
                  onChange={(checked) => {
                    setSelectedFilters(prev => ({
                      ...prev,
                      shippingOption: checked
                    }));
                  }}
                />
              </div>
            </div>
            <button className="over_hyped" onClick={applyAllFilters}>
              View ads
            </button>
          </>
        );

      case "Category":
        return (
          <AllCategories
            showAllCategories={true}
            onCategorySelect={handleCategorySelect}
            modalSource="Category"
            closeModal={closeModal}
          />
        );

      case "Place":
        return (
          <RegionsInSweden
            regions={regions}
            showRegions={true}
            onRegionSelect={handleRegionSelect}
            modalSource="Place"
            closeModal={closeModal}
          />
        );

      case "Price":
        return (
          <PriceCom
            modalSource="Price"
            onPriceChange={handlePriceChange}
            currentRange={selectedFilters.priceRange}
            closeModal={closeModal}
          />
        );

      default:
        return <p>No content available.</p>;
    }
  };

  return (
    <div className="ads_overview">
      <div className="ads_ads">
        <img src={poster} alt="" />
      </div>
      
      <InputField
        placeholder="What do you want to search"
        type="text"
        buttonText="Search"
        CiSearchIcon={true}
        InputButton={true}
        onSearch={handleSearch}
        defaultValue={selectedFilters.searchTerm}
      />
      
      <div className="ads_sold">
        <h2>
          {hasActiveFilters ? 'Filtered Results' : 'Sold throughout Sweden'}{" "}
          <span className="ads_span">
            {selectedFilters.category 
              ? `Category: ${selectedFilters.category.name}`
              : '754,679 ads'}
          </span>
        </h2>
        
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="active-filters-display">
            {selectedFilters.category && (
              <span className="filter-tag">
                Category: {selectedFilters.category.name}
                <button onClick={() => clearFilter('category')}>×</button>
              </span>
            )}
            {selectedFilters.location && (
              <span className="filter-tag">
                Location: {selectedFilters.location}
                <button onClick={() => clearFilter('location')}>×</button>
              </span>
            )}
            {(selectedFilters.priceRange.min || selectedFilters.priceRange.max) && (
              <span className="filter-tag">
                Price: {selectedFilters.priceRange.min || 0} - {selectedFilters.priceRange.max || '∞'}
                <button onClick={() => clearFilter('price')}>×</button>
              </span>
            )}
            {selectedFilters.shippingOption && (
              <span className="filter-tag">
                Shipping Available
                <button onClick={() => clearFilter('shipping')}>×</button>
              </span>
            )}
            <button 
              className="clear-all-filters"
              onClick={() => clearFilter('all')}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
      
      <div className="ads_filtered">
        {filterButtons.map((button, index) => (
          <div key={index} className={getFilterButtonClass(button.text)}>
            <button onClick={() => openModal(button.text)}>
              {button.hasIcon && (
                <BsFilterLeft
                  style={{ color: "var(--black)", fontSize: "2.5rem" }}
                />
              )}
              {button.text}
            </button>
          </div>
        ))}
      </div>
      
      <CustomModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {renderModalContent()}
      </CustomModal>
    </div>
  );
};

export default Ads;