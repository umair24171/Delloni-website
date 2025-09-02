import React, { useState, useEffect } from "react";
import "./ads.css";
import "./responsive.css";
import DynamicDropdown from "../../helpers/DynamicDropdown";
import { FaHeart } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import Pagination from "../../helpers/Pagination";
import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ProductService } from "../../services/firebaseServices";

// Fallback image
import fallbackImage from "../../assets/f2.jpg";
import carAd from "../../assets/f1.jpg";

const AdsSorting = ({ filters }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [galleryAds, setGalleryAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const adsPerPage = 60;

  const dropdownOptions = [
    "Shipping Issues",
    "Payment Problems", 
    "Account Security",
    "Order Tracking",
    "Returns and Refunds",
    "Product Inquiries",
    "Technical Support",
    "Billing Questions",
    "Complaints",
    "General Feedback",
  ];

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts = [];

        if (filters?.category?.id) {
          // Fetch products for specific category
          console.log('Fetching products for category:', filters.category.name);
          fetchedProducts = await ProductService.getProductsByCategory(
            filters.category.id,
            adsPerPage * 5 // Fetch more to have enough for pagination
          );
        } else if (filters?.searchTerm) {
          // Fetch products based on search term
          console.log('Fetching products for search:', filters.searchTerm);
          fetchedProducts = await ProductService.searchProducts(
            filters.searchTerm,
            null,
            adsPerPage * 5
          );
        } else {
          // Fetch all products
          console.log('Fetching all products');
          fetchedProducts = await ProductService.getAllProducts(adsPerPage * 5);
        }

        // Apply additional filters
        if (filters?.priceRange?.min || filters?.priceRange?.max) {
          fetchedProducts = fetchedProducts.filter(product => {
            const price = product.price || 0;
            const min = filters.priceRange.min || 0;
            const max = filters.priceRange.max || Infinity;
            return price >= min && price <= max;
          });
        }

        if (filters?.location) {
          fetchedProducts = fetchedProducts.filter(product => 
            product.cityName?.toLowerCase().includes(filters.location.toLowerCase()) ||
            product.locationAddress?.toLowerCase().includes(filters.location.toLowerCase())
          );
        }

        setProducts(fetchedProducts);
        setTotalProducts(fetchedProducts.length);
        console.log('Products fetched:', fetchedProducts.length);

        // Fetch some featured/gallery ads
        const featuredProducts = await ProductService.getFeaturedProducts(3);
        setGalleryAds(featuredProducts);

      } catch (error) {
        console.error('Error fetching products:', error);
        // Set fallback data if Firebase fails
        setProducts([]);
        setGalleryAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Get current page products
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = products.slice(indexOfFirstAd, indexOfLastAd);

  const toggleFavorite = (adId) => {
    setFavorites((prev) =>
      prev.includes(adId) ? prev.filter((id) => id !== adId) : [...prev, adId]
    );
  };

  const handleTitleClick = (adId) => {
    navigate(`/ads-details/${adId}`);
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price not specified';
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M SEK`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K SEK`;
    } else {
      return `${price} SEK`;
    }
  };

  // Format time since posted
  const formatTime = (createdAt) => {
    if (!createdAt) return 'Recently posted';
    
    const now = new Date();
    const postDate = createdAt instanceof Date ? createdAt : new Date(createdAt);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Today';
    }
  };

  const MainAdItem = ({ ad }) => (
    <div className="adssorting_sollar">
      <div className="adssorting_img">
        <img 
          src={ad.imageUrls && ad.imageUrls.length > 0 ? ad.imageUrls[0] : fallbackImage} 
          alt={ad.title}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <div className="adssorting_killed">
        <div className="adssorting_kill">
          <div className="adssorting_comed">
            <div className="adssorting_com">
              <div className="adssorting_games">
                <h2>{ad.categoryName || ad.displayCategoryName || 'General'}</h2>
              </div>
              <div className="adssorting_games">
                <h2>{ad.condition || 'Used'}</h2>
              </div>
            </div>
            <div className="adssorting_today">
              <h2>{formatTime(ad.createdAt)}</h2>
            </div>
          </div>
          <div className="adssorting_heart">
            <div
              className="adssorting_cart"
              onClick={() => handleTitleClick(ad.id)}
            >
              <h2>{ad.title || 'Product Title'}</h2>
            </div>
            <FaHeart
              style={{
                color: favorites.includes(ad.id) ? "red" : "grey",
                fontSize: "2rem",
                cursor: "pointer",
              }}
              onClick={() => toggleFavorite(ad.id)}
            />
          </div>
          <div className="adssorting_buy">
            <button>
              <GiCardboardBoxClosed
                style={{ color: "var(--green)", fontSize: "2rem" }}
              />
              Buy Now
            </button>
          </div>
        </div>
        <div className="adssorting_sek">
          <h2>{formatPrice(ad.price)}</h2>
        </div>
      </div>
    </div>
  );

  const GalleryAdItem = ({ ad }) => (
    <div className="adssorting_color">
      <div className="adssorting_comma">
        <div className="adssorting_today">
          <h2>{formatTime(ad.createdAt)}</h2>
        </div>
        <div className="adssorting_sek">
          <h2>Gallery</h2>
        </div>
      </div>
      <div className="adssorting_img dynamic_img">
        <img 
          src={ad.imageUrls && ad.imageUrls.length > 0 ? ad.imageUrls[0] : fallbackImage} 
          alt={ad.title}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <div className="adssorting_today">
        <h2>{ad.title}</h2>
      </div>
      <div className="adssorting_sek">
        <h2>{formatPrice(ad.price)}</h2>
      </div>
    </div>
  );

  // Get current filter description
  const getFilterDescription = () => {
    if (filters?.category) {
      return `${filters.category.name} Ads - Browse Products`;
    } else if (filters?.searchTerm) {
      return `Search Results for "${filters.searchTerm}"`;
    } else {
      return 'All Ads - Browse Products';
    }
  };

  return (
    <div className="ads_sorting_seel">
      <DynamicDropdown options={dropdownOptions} />
      <div className="adssorting_h2">
        <h2>{getFilterDescription()}</h2>
      </div>
      
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading products...
        </div>
      ) : (
        <div className="adssorting_imgeded">
          <div className="adssorting_imged">
            {currentAds.length > 0 ? (
              <>
                {currentAds.map((ad) => (
                  <React.Fragment key={ad.id}>
                    <MainAdItem ad={ad} />
                    <hr />
                  </React.Fragment>
                ))}
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalProducts}
                  itemsPerPage={adsPerPage}
                  onPageChange={setCurrentPage}
                />
                <div className="new_ads_btn">
                  <button>
                    <IoReload style={{ color: "black", fontSize: "2rem" }} /> 
                    New Ads
                  </button>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem',
                color: '#666'
              }}>
                <h3>No products found</h3>
                <p>
                  {filters?.category 
                    ? `No products found in ${filters.category.name} category.`
                    : filters?.searchTerm 
                    ? `No products found for "${filters.searchTerm}".`
                    : 'No products available at the moment.'
                  }
                </p>
                <button 
                  onClick={() => window.location.href = '/ads'}
                  style={{
                    background: 'var(--green)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '1rem'
                  }}
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
          
          <div className="adssorting_colored">
            {galleryAds.length > 0 ? (
              <>
                {galleryAds.map((ad, index) => (
                  <React.Fragment key={ad.id}>
                    <GalleryAdItem ad={ad} />
                    {index < galleryAds.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                <p>No featured ads available</p>
              </div>
            )}
            <div className="ads_sections_fixed">
              <img src={carAd} alt="Advertisement" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsSorting;