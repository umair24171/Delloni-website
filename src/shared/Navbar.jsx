// shared/Navbar.jsx - Updated with Authentication
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { LuMessageSquareText } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { FaRegCircleUser, FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { ProductService } from "../services/firebaseServices";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Use our custom hooks
  const { categoryTree, loading, error } = useCategories();
  const { userModel, isLoggedIn, logout } = useAuth();

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch product counts for categories when dropdown opens
  useEffect(() => {
    const fetchCategoryProductCounts = async () => {
      if (isDropdownOpen && categoryTree.length > 0 && categoriesWithCount.length === 0) {
        try {
          const categoriesWithCounts = await Promise.all(
            categoryTree.map(async (category) => {
              const productCount = await ProductService.getProductCountByCategory(category.id);
              return {
                ...category,
                productCount,
                children: category.children ? await Promise.all(
                  category.children.slice(0, 8).map(async (child) => {
                    const childCount = await ProductService.getProductCountByCategory(child.id);
                    return {
                      ...child,
                      productCount: childCount
                    };
                  })
                ) : []
              };
            })
          );
          setCategoriesWithCount(categoriesWithCounts);
        } catch (err) {
          console.error('Error fetching category counts:', err);
          setCategoriesWithCount(categoryTree.map(cat => ({
            ...cat,
            productCount: 0,
            children: cat.children || []
          })));
        }
      }
    };

    fetchCategoryProductCounts();
  }, [isDropdownOpen, categoryTree, categoriesWithCount.length]);

  const LogoClick = () => {
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    setIsDropdownOpen(false);
    navigate(`/ads?category=${category.id}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    setIsDropdownOpen(false);
    navigate(`/ads?category=${subcategory.id}`);
  };

  const handlePostAdClick = () => {
    if (isLoggedIn()) {
      navigate("/post-ad");
    } else {
      navigate("/login", { state: { from: "/post-ad" } });
    }
  };

  const handleUserMenuClick = () => {
    if (isLoggedIn()) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserDisplayName = () => {
    if (!userModel) return "Login";
    return userModel.companyName || userModel.email.split('@')[0] || "User";
  };

  // Group categories for better display (same as before)
  const groupedCategories = categoriesWithCount.reduce((acc, category) => {
    if (category.name.toLowerCase().includes('vehicle') || 
        category.name.toLowerCase().includes('car') ||
        category.name.toLowerCase().includes('motorcycle')) {
      if (!acc.vehicle) acc.vehicle = [];
      acc.vehicle.push(category);
    } else if (category.name.toLowerCase().includes('home') || 
               category.name.toLowerCase().includes('furniture') ||
               category.name.toLowerCase().includes('garden')) {
      if (!acc.home) acc.home = [];
      acc.home.push(category);
    } else if (category.name.toLowerCase().includes('electronics') || 
               category.name.toLowerCase().includes('phone') ||
               category.name.toLowerCase().includes('computer')) {
      if (!acc.electronics) acc.electronics = [];
      acc.electronics.push(category);
    } else if (category.name.toLowerCase().includes('personal') || 
               category.name.toLowerCase().includes('clothing') ||
               category.name.toLowerCase().includes('fashion')) {
      if (!acc.personal) acc.personal = [];
      acc.personal.push(category);
    } else if (category.name.toLowerCase().includes('leisure') || 
               category.name.toLowerCase().includes('hobby') ||
               category.name.toLowerCase().includes('sport')) {
      if (!acc.leisure) acc.leisure = [];
      acc.leisure.push(category);
    } else {
      if (!acc.other) acc.other = [];
      acc.other.push(category);
    }
    return acc;
  }, {});

  return (
    <>
      <div className="navbarMain">
        <div className="navbar">
          <div className="navbarLogo" ref={dropdownRef}>
            <img
              src={logo}
              alt="Logo"
              className="logoImage"
              onClick={LogoClick}
              style={{cursor:"pointer"}}
            />
            <p onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Categories <MdOutlineKeyboardArrowDown className="dropdownIcon" />
            </p>
          </div>
          <div className={`navbarRight ${isMobileMenuOpen ? "open" : ""}`}>
            <div className="navbarButton">
              <button onClick={handlePostAdClick}>
                <IoIosAddCircleOutline className="icon" />
                Post an ad
              </button>
            </div>
            <div className="navbarLinks">
              <button onClick={() => navigate("/ads")}>
                <CiSearch className="icon" />
                Advertisements
              </button>
              {isLoggedIn() && (
                <>
                  <button onClick={() => navigate("/messages")}>
                    <LuMessageSquareText className="icon" />
                    Messages
                  </button>
                  <button onClick={() => navigate("/notifications")}>
                    <GoBell className="icon" />
                    Notifications
                  </button>
                </>
              )}
              <div className="user-menu-container" ref={userMenuRef}>
                <button onClick={handleUserMenuClick} className="user-menu-button">
                  <FaRegCircleUser className="icon" />
                  {getUserDisplayName()}
                  {isLoggedIn() && <MdOutlineKeyboardArrowDown className="dropdown-arrow" />}
                </button>
                
                {isLoggedIn() && isUserMenuOpen && (
                  <div className="user-dropdown-menu">
                    <div className="user-info">
                      <div className="user-avatar">
                        {userModel.profileImage ? (
                          <img src={userModel.profileImage} alt="Profile" />
                        ) : (
                          <FaUser />
                        )}
                      </div>
                      <div className="user-details">
                        <p className="user-name">{getUserDisplayName()}</p>
                        <p className="user-email">{userModel.email}</p>
                        <span className="user-type">{userModel.type}</span>
                      </div>
                    </div>
                    <div className="menu-divider"></div>
                    <ul className="user-menu-items">
                      <li onClick={() => {
                        navigate("/profile");
                        setIsUserMenuOpen(false);
                      }}>
                        <FaUser className="menu-icon" />
                        My Profile
                      </li>
                      <li onClick={() => {
                        navigate("/ads?seller=" + userModel.uid);
                        setIsUserMenuOpen(false);
                      }}>
                        <IoIosAddCircleOutline className="menu-icon" />
                        My Ads
                      </li>
                      <li onClick={handleLogout} className="logout-item">
                        <FaSignOutAlt className="menu-icon" />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </div>
        </div>
      </div>
      <div className={`navbarDropdownParent ${isDropdownOpen ? "open" : ""}`}>
        <div className="categoryDropdown">
          {loading ? (
            <div className="dropdown-loading">
              <p>Loading categories...</p>
            </div>
          ) : error ? (
            <div className="dropdown-error">
              <p>Error loading categories</p>
            </div>
          ) : (
            <>
              {/* Vehicle Categories */}
              {groupedCategories.vehicle && (
                <div className="dropdownColumn">
                  <h4>Vehicle</h4>
                  <ul>
                    {groupedCategories.vehicle.map((category) => (
                      <li key={category.id}>
                        <span 
                          onClick={() => handleCategoryClick(category)}
                          className="category-main"
                        >
                          {category.name} ({category.productCount || 0})
                        </span>
                        {category.children.length > 0 && (
                          <ul className="subcategory-list">
                            {category.children.map((child) => (
                              <li 
                                key={child.id}
                                onClick={() => handleSubcategoryClick(child)}
                                className="subcategory-item"
                              >
                                {child.name} ({child.productCount || 0})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Home & Garden Categories */}
              {groupedCategories.home && (
                <div className="dropdownColumn">
                  <h4>For the home & garden</h4>
                  <ul>
                    {groupedCategories.home.map((category) => (
                      <li key={category.id}>
                        <span 
                          onClick={() => handleCategoryClick(category)}
                          className="category-main"
                        >
                          {category.name} ({category.productCount || 0})
                        </span>
                        {category.children.length > 0 && (
                          <ul className="subcategory-list">
                            {category.children.map((child) => (
                              <li 
                                key={child.id}
                                onClick={() => handleSubcategoryClick(child)}
                                className="subcategory-item"
                              >
                                {child.name} ({child.productCount || 0})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Categories */}
              {groupedCategories.personal && (
                <div className="dropdownColumn">
                  <h4>Personal</h4>
                  <ul>
                    {groupedCategories.personal.map((category) => (
                      <li key={category.id}>
                        <span 
                          onClick={() => handleCategoryClick(category)}
                          className="category-main"
                        >
                          {category.name} ({category.productCount || 0})
                        </span>
                        {category.children.length > 0 && (
                          <ul className="subcategory-list">
                            {category.children.map((child) => (
                              <li 
                                key={child.id}
                                onClick={() => handleSubcategoryClick(child)}
                                className="subcategory-item"
                              >
                                {child.name} ({child.productCount || 0})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Electronics Categories */}
              {groupedCategories.electronics && (
                <div className="dropdownColumn">
                  <h4>Electronics & Video Games</h4>
                  <ul>
                    {groupedCategories.electronics.map((category) => (
                      <li key={category.id}>
                        <span 
                          onClick={() => handleCategoryClick(category)}
                          className="category-main"
                        >
                          {category.name} ({category.productCount || 0})
                        </span>
                        {category.children.length > 0 && (
                          <ul className="subcategory-list">
                            {category.children.map((child) => (
                              <li 
                                key={child.id}
                                onClick={() => handleSubcategoryClick(child)}
                                className="subcategory-item"
                              >
                                {child.name} ({child.productCount || 0})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other Categories */}
              {groupedCategories.other && (
                <div className="dropdownColumn">
                  <h4>Other</h4>
                  <ul>
                    {groupedCategories.other.map((category) => (
                      <li key={category.id}>
                        <span 
                          onClick={() => handleCategoryClick(category)}
                          className="category-main"
                        >
                          {category.name} ({category.productCount || 0})
                        </span>
                        {category.children.length > 0 && (
                          <ul className="subcategory-list">
                            {category.children.map((child) => (
                              <li 
                                key={child.id}
                                onClick={() => handleSubcategoryClick(child)}
                                className="subcategory-item"
                              >
                                {child.name} ({child.productCount || 0})
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;