import React, { useState, useEffect } from "react";
import "./helpers.css"; // Keep your original CSS file
import { useNavigate } from "react-router-dom";
import { useCategories } from '../hooks/useCategories';
import { ProductService } from '../services/firebaseServices';

// Import your original images as fallbacks
import car from "../assets/car.png";
import jacket from "../assets/jacket.png";
import residence from "../assets/residence.png";
import bed from "../assets/bed.png";
import tshirt from "../assets/tshirt.png";
import bag from "../assets/bag.png";
import joy from "../assets/joy.png";
import bowling from "../assets/bowling.png";
import elect from "../assets/new.png";

const DynamicIcons = () => {
  const navigate = useNavigate();
  const { categoryTree, loading, error } = useCategories();
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);

  // Fallback images mapping - you can customize this based on category names
  const fallbackImages = {
    'car': car,
    'vehicle': car,
    'clothing': jacket,
    'clothes': jacket,
    'fashion': jacket,
    'residence': residence,
    'home': bed,
    'furniture': bed,
    'children': tshirt,
    'kids': tshirt,
    'personal': bag,
    'electronics': joy,
    'electronic': joy,
    'leisure': bowling,
    'hobby': bowling,
    'sport': bowling,
    'new': elect,
    'phone': elect,
    'mobile': elect,
  };

  // Function to get appropriate image for category
  const getCategoryImage = (category) => {
    // First try to use the iconUrl from Firebase
    if (category.iconUrl) {
      return category.iconUrl;
    }
    
    // Then try to match with fallback images based on category name
    const categoryNameLower = category.name.toLowerCase();
    
    for (const [key, image] of Object.entries(fallbackImages)) {
      if (categoryNameLower.includes(key)) {
        return image;
      }
    }
    
    // Default fallback
    return elect;
  };

  // Fetch product counts for categories
  useEffect(() => {
    const fetchProductCounts = async () => {
      if (categoryTree.length > 0) {
        try {
          const categoriesWithCounts = await Promise.all(
            categoryTree.slice(0, 9).map(async (category) => { // Limit to 9 categories to match original layout
              const productCount = await ProductService.getProductCountByCategory(category.id);
              return {
                ...category,
                productCount
              };
            })
          );
          setCategoriesWithCount(categoriesWithCounts);
        } catch (err) {
          console.error('Error fetching product counts:', err);
          setCategoriesWithCount(categoryTree.slice(0, 9));
        }
      }
    };

    fetchProductCounts();
  }, [categoryTree]);

  // Handle category click - navigate to ads with category filter
  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.name);
    navigate(`/ads?category=${category.id}&categoryName=${encodeURIComponent(category.name)}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="dynamic_main">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          padding: '4rem', 
          color: '#666',
          fontSize: '1.2rem' 
        }}>
          Loading categories...
        </div>
      </div>
    );
  }

  // Show error state with fallback
  if (error) {
    console.error('Categories error:', error);
    // You can return your original hardcoded items as fallback
    const fallbackItems = [
      { id: 'fallback-1', name: "Car", iconUrl: car },
      { id: 'fallback-2', name: "Clothes & shoes", iconUrl: jacket },
      { id: 'fallback-3', name: "Residence", iconUrl: residence },
      { id: 'fallback-4', name: "For the home", iconUrl: bed },
      { id: 'fallback-5', name: "Children's clothing & shoes", iconUrl: tshirt },
      { id: 'fallback-6', name: "Personal", iconUrl: bag },
      { id: 'fallback-7', name: "Electronics", iconUrl: joy },
      { id: 'fallback-8', name: "Leisure & hobbies", iconUrl: bowling },
      { id: 'fallback-9', name: "Newly used electronics", iconUrl: elect },
    ];
    
    return (
      <div className="dynamic_main">
        {fallbackItems.map((item) => (
          <div 
            key={item.id} 
            className="dynamic_overall" 
            onClick={() => navigate("/ads")}
            style={{cursor:"pointer"}}
          >
            <div className="dyncmaic_circle">
              <div className="dyncmaic_image">
                <img src={item.iconUrl} alt={item.name} />
              </div>
            </div>
            <div className="dyncmaic_h2">
              <h2>{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Use Firebase categories if available, otherwise show message
  const displayCategories = categoriesWithCount.length > 0 ? categoriesWithCount : [];

  if (displayCategories.length === 0) {
    return (
      <div className="dynamic_main">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          padding: '4rem', 
          color: '#666',
          fontSize: '1.2rem' 
        }}>
          No categories found. Please add categories to your Firebase database.
        </div>
      </div>
    );
  }

  // Render categories with your original design
  return (
    <div className="dynamic_main">
      {displayCategories.map((category) => (
        <div 
          key={category.id} 
          className="dynamic_overall" 
          onClick={() => handleCategoryClick(category)}
          style={{cursor:"pointer"}}
        >
          <div className="dyncmaic_circle">
            <div className="dyncmaic_image">
              <img 
                src={getCategoryImage(category)} 
                alt={category.name}
                onError={(e) => {
                  // Fallback to default image if the category image fails to load
                  e.target.src = elect;
                }}
              />
            </div>
          </div>
          <div className="dyncmaic_h2">
            <h2>{category.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicIcons;