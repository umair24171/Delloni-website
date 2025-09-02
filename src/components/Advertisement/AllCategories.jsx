import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CategoryService, ProductService } from "../../services/firebaseServices";

const AllCategories = ({
  showAllCategories,
  selectedCategory,
  selectedSubcategory,
  selectedSubcategories,
  toggleAllCategories,
  handleCategoryClick,
  handleSubcategoryClick,
  handleBackFromSubcategories,
  handleBackFromSubSubcategories,
  handleSubSubcategorySelection,
  modalSource,
  closeModal,
  onCategorySelect, // This will handle the final selection
}) => {
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryForFilter, setSelectedCategoryForFilter] = useState(null);

  // Fetch root categories
  useEffect(() => {
    const fetchRootCategories = async () => {
      if (showAllCategories && categories.length === 0) {
        setLoading(true);
        try {
          const rootCategories = await CategoryService.getRootCategories();
          
          // Fetch product counts for each category
          const categoriesWithCounts = await Promise.all(
            rootCategories.map(async (category) => {
              const productCount = await ProductService.getProductCountByCategory(category.id);
              return {
                ...category,
                productCount
              };
            })
          );
          
          setCategories(categoriesWithCounts);
          setCurrentCategories(categoriesWithCounts);
        } catch (error) {
          console.error('Error fetching root categories:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRootCategories();
  }, [showAllCategories]);

  // Navigate to child categories
  const navigateToChildren = async (category) => {
    setLoading(true);
    try {
      const children = await CategoryService.getChildCategories(category.id);
      
      if (children.length > 0) {
        // Fetch product counts for children
        const childrenWithCounts = await Promise.all(
          children.map(async (child) => {
            const productCount = await ProductService.getProductCountByCategory(child.id);
            return {
              ...child,
              productCount
            };
          })
        );
        
        setCategoryPath([...categoryPath, category]);
        setCurrentCategories(childrenWithCounts);
      } else {
        // This is a leaf category, select it
        setSelectedCategoryForFilter(category);
      }
    } catch (error) {
      console.error('Error fetching child categories:', error);
      // Treat as leaf category if error
      setSelectedCategoryForFilter(category);
    } finally {
      setLoading(false);
    }
  };

  // Navigate back one level
  const navigateBack = async () => {
    if (categoryPath.length > 0) {
      const newPath = [...categoryPath];
      newPath.pop();
      setCategoryPath(newPath);

      if (newPath.length === 0) {
        // Back to root
        setCurrentCategories(categories);
      } else {
        // Back to previous level - fetch children of the new current level
        const parent = newPath[newPath.length - 1];
        setLoading(true);
        try {
          const children = await CategoryService.getChildCategories(parent.id);
          const childrenWithCounts = await Promise.all(
            children.map(async (child) => {
              const productCount = await ProductService.getProductCountByCategory(child.id);
              return {
                ...child,
                productCount
              };
            })
          );
          setCurrentCategories(childrenWithCounts);
        } catch (error) {
          console.error('Error fetching children:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // Handle category click
  const handleCategoryNavigation = async (category) => {
    // Check if this category has children first
    setLoading(true);
    try {
      const children = await CategoryService.getChildCategories(category.id);
      
      if (children.length > 0) {
        // Has children, navigate to them
        navigateToChildren(category);
      } else {
        // No children, this is a leaf node - select it for filtering
        setSelectedCategoryForFilter(category);
      }
    } catch (error) {
      console.error('Error checking category children:', error);
      // Treat as leaf if error
      setSelectedCategoryForFilter(category);
    } finally {
      setLoading(false);
    }
  };

  // Handle the "View ads" button click
  const handleViewAds = () => {
    let categoryToSelect = selectedCategoryForFilter;
    
    // If no specific category selected, use the current navigation context
    if (!categoryToSelect && categoryPath.length > 0) {
      categoryToSelect = categoryPath[categoryPath.length - 1];
    }
    
    if (categoryToSelect && onCategorySelect) {
      onCategorySelect(categoryToSelect);
    }
    closeModal();
  };

  // Calculate total products in current view
  const getTotalProductCount = () => {
    return currentCategories.reduce((total, cat) => total + (cat.productCount || 0), 0);
  };

  if (!showAllCategories) return null;

  const buttonText = modalSource === "Category" ? "Cancel" : "Clear";
  const currentLevelName = categoryPath.length > 0 
    ? categoryPath[categoryPath.length - 1].name 
    : 'All Categories';

  if (loading) {
    return (
      <div className="all-categories-container">
        <div className="modal-header">
          <h2 style={{ opacity: "0" }}>Loading</h2>
          <h2>Loading Categories...</h2>
          <div className="modal-close" onClick={closeModal}>
            {buttonText}
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div className="all-categories-container">
      <div className="modal-header">
        {categoryPath.length > 0 && (
          <div className="modal-close" onClick={navigateBack}>
            <IoIosArrowBack style={{ fontSize: "2rem" }} />
            {categoryPath.length > 1 ? categoryPath[categoryPath.length - 2].name : 'All Categories'}
          </div>
        )}
        {categoryPath.length === 0 && modalSource !== "Category" && (
          <div className="modal-close" onClick={toggleAllCategories}>
            <IoIosArrowBack style={{ fontSize: "2rem" }} />
            All Filters
          </div>
        )}
        <h2>{currentLevelName}</h2>
        <div className="modal-close" onClick={closeModal}>
          {buttonText}
        </div>
      </div>

      {/* Show selected category indicator */}
      {selectedCategoryForFilter && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#e8f5e8',
          margin: '1rem 0',
          borderRadius: '0.5rem',
          fontSize: '1.4rem'
        }}>
          Selected: {selectedCategoryForFilter.name} ({selectedCategoryForFilter.productCount || 0} products)
        </div>
      )}

      <div className="modal-miller">
        {currentCategories.map((category) => {
          const isSelected = selectedCategoryForFilter?.id === category.id;
          
          return (
            <div
              key={category.id}
              className={`modal-header toggle_pad ${isSelected ? 'selected-category' : ''}`}
              onClick={() => handleCategoryNavigation(category)}
              style={{
                backgroundColor: isSelected ? '#f0f8ff' : 'transparent',
                border: isSelected ? '2px solid var(--green)' : 'none',
                borderRadius: '0.5rem',
                margin: '0.2rem 0'
              }}
            >
              <div className="overflow_imged">
                <div className="overflow_img">
                  <img 
                    src={category.iconUrl || '/placeholder-category.png'} 
                    alt={category.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-category.png';
                    }}
                  />
                </div>
                <div className="modal-close">
                  {category.name}{" "}
                  <span className="model_litee">
                    ({category.productCount || 0})
                  </span>
                </div>
              </div>
              
              <IoIosArrowForward
                className="arrow-icon"
                style={{ fontSize: "2rem", color: "var(--black)" }}
              />
            </div>
          );
        })}
      </div>

      <button 
        className="over_hyped"
        onClick={handleViewAds}
        disabled={!selectedCategoryForFilter && categoryPath.length === 0}
        style={{
          opacity: (!selectedCategoryForFilter && categoryPath.length === 0) ? 0.5 : 1,
          cursor: (!selectedCategoryForFilter && categoryPath.length === 0) ? 'not-allowed' : 'pointer'
        }}
      >
        View {selectedCategoryForFilter ? selectedCategoryForFilter.productCount || 0 : getTotalProductCount()} ads
      </button>
    </div>
  );
};

export default AllCategories;