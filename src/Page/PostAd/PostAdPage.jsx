// Page/PostAd/PostAdPage.jsx - Fixed Category Selection
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCategories } from '../../hooks/useCategories';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { CategoryService, EnhancedCategoryService } from '../../services/firebaseServices';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/footer/footer';
import './PostAdPage.css';

const PostAdPage = () => {
  const navigate = useNavigate();
  const { userModel, isLoggedIn } = useAuth();
  const { categoryTree, loading: categoriesLoading } = useCategories();

  // Basic form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    categoryName: '',
    condition: 'Used',
    price: '',
    allowPriceNegotiation: true,
    shippingOption: 'Both',
    brand: '',
    dimensions: '',
    color: '',
    locationAddress: '',
    cityName: '',
    districtName: '',
  });

  // Template fields
  const [templateFields, setTemplateFields] = useState([]);
  const [templateFieldsData, setTemplateFieldsData] = useState({});
  
  // FIXED: Category selection state
  const [categoryPath, setCategoryPath] = useState([]); // Path from root to current
  const [currentCategories, setCurrentCategories] = useState([]); // Categories at current level
  const [isCategorySelectionOpen, setIsCategorySelectionOpen] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // Other state
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login', { state: { from: '/post-ad' } });
    }
  }, [isLoggedIn, navigate]);

  // FIXED: Initialize with root categories
  useEffect(() => {
    if (categoryTree.length > 0 && currentCategories.length === 0) {
      console.log('🔄 Initializing with root categories:', categoryTree.length);
      setCurrentCategories(categoryTree);
    }
  }, [categoryTree]);

  // Load template fields when category is selected
  useEffect(() => {
    if (formData.category) {
      loadCategoryTemplateFields(formData.category);
    }
  }, [formData.category]);

  const loadCategoryTemplateFields = async (categoryId) => {
    try {
      const categoryWithTemplates = await EnhancedCategoryService.getCategoryWithTemplates(categoryId);
      if (categoryWithTemplates && categoryWithTemplates.resolvedFields) {
        setTemplateFields(categoryWithTemplates.resolvedFields);
        
        const initialData = {};
        categoryWithTemplates.resolvedFields.forEach(field => {
          initialData[field.key || field.name] = '';
        });
        setTemplateFieldsData(initialData);
      } else {
        setTemplateFields([]);
        setTemplateFieldsData({});
      }
    } catch (error) {
      console.error('Error loading template fields:', error);
      setTemplateFields([]);
      setTemplateFieldsData({});
    }
  };

  // FIXED: Category selection handler
  const handleCategorySelect = async (category) => {
    try {
      setCategoryLoading(true);
      console.log(`🎯 Selected category: ${category.name} (Level: ${category.level})`);
      
      // Get children for this category
      const children = await CategoryService.getChildCategories(category.id);
      console.log(`👶 Found ${children.length} children for ${category.name}`);
      
      if (children.length > 0) {
        // Has children - add to path and show children
        const newPath = [...categoryPath, category];
        setCategoryPath(newPath);
        setCurrentCategories(children);
        console.log('📍 Updated path:', newPath.map(c => c.name).join(' > '));
      } else {
        // No children - this is the final selection
        console.log('✅ Final category selected:', category.name);
        setFormData(prev => ({
          ...prev,
          category: category.id,
          categoryName: category.name
        }));
        setIsCategorySelectionOpen(false);
      }
    } catch (error) {
      console.error('Error selecting category:', error);
      setError('Error loading category. Please try again.');
    } finally {
      setCategoryLoading(false);
    }
  };

  // FIXED: Breadcrumb navigation
  const handleBreadcrumbClick = async (targetIndex) => {
    try {
      setCategoryLoading(true);
      
      if (targetIndex === -1) {
        // Go back to root
        console.log('🏠 Going back to root categories');
        setCategoryPath([]);
        setCurrentCategories(categoryTree);
      } else {
        // Go to specific level
        const targetCategory = categoryPath[targetIndex];
        console.log(`📍 Going to level ${targetIndex}: ${targetCategory.name}`);
        
        const children = await CategoryService.getChildCategories(targetCategory.id);
        const newPath = categoryPath.slice(0, targetIndex + 1);
        setCategoryPath(newPath);
        setCurrentCategories(children);
      }
    } catch (error) {
      console.error('Error navigating breadcrumb:', error);
    } finally {
      setCategoryLoading(false);
    }
  };

  // FIXED: Breadcrumb component
  const renderCategoryBreadcrumb = () => {
    return (
      <div className="category-breadcrumb">
        <button
          type="button"
          className="breadcrumb-item"
          onClick={() => handleBreadcrumbClick(-1)}
          disabled={categoryLoading}
        >
          🏠 All Categories
        </button>
        {categoryPath.map((category, index) => (
          <React.Fragment key={category.id}>
            <span className="breadcrumb-separator">›</span>
            <button
              type="button"
              className="breadcrumb-item"
              onClick={() => handleBreadcrumbClick(index)}
              disabled={categoryLoading}
            >
              {category.name}
            </button>
          </React.Fragment>
        ))}
        {categoryPath.length > 0 && (
          <>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Select Subcategory</span>
          </>
        )}
      </div>
    );
  };

  // Open category selection modal
  const openCategorySelection = () => {
    console.log('🔍 Opening category selection modal');
    setCategoryPath([]);
    setCurrentCategories(categoryTree);
    setIsCategorySelectionOpen(true);
  };

  // Template field rendering (same as before)
  const renderTemplateField = (field) => {
    const fieldKey = field.key || field.name;
    const fieldValue = templateFieldsData[fieldKey] || '';

    const handleTemplateFieldChange = (e) => {
      setTemplateFieldsData(prev => ({
        ...prev,
        [fieldKey]: e.target.value
      }));
    };

    switch (field.type) {
      case 'text':
        return (
          <div key={fieldKey} className="form-group">
            <label htmlFor={fieldKey}>
              {field.label || field.name}
              {field.required && ' *'}
            </label>
            <input
              type="text"
              id={fieldKey}
              value={fieldValue}
              onChange={handleTemplateFieldChange}
              placeholder={field.placeholder || `Enter ${field.label || field.name}`}
              required={field.required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={fieldKey} className="form-group">
            <label htmlFor={fieldKey}>
              {field.label || field.name}
              {field.required && ' *'}
            </label>
            <input
              type="number"
              id={fieldKey}
              value={fieldValue}
              onChange={handleTemplateFieldChange}
              placeholder={field.placeholder || `Enter ${field.label || field.name}`}
              required={field.required}
            />
          </div>
        );

      case 'select':
        return (
          <div key={fieldKey} className="form-group">
            <label htmlFor={fieldKey}>
              {field.label || field.name}
              {field.required && ' *'}
            </label>
            <select
              id={fieldKey}
              value={fieldValue}
              onChange={handleTemplateFieldChange}
              required={field.required}
            >
              <option value="">Select {field.label || field.name}</option>
              {field.options && field.options.map(option => (
                <option key={option.value || option} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={fieldKey} className="form-group full-width">
            <label htmlFor={fieldKey}>
              {field.label || field.name}
              {field.required && ' *'}
            </label>
            <textarea
              id={fieldKey}
              value={fieldValue}
              onChange={handleTemplateFieldChange}
              placeholder={field.placeholder || `Enter ${field.label || field.name}`}
              rows={field.rows || 3}
              required={field.required}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={fieldKey} className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={fieldValue === true || fieldValue === 'true'}
                onChange={(e) => setTemplateFieldsData(prev => ({
                  ...prev,
                  [fieldKey]: e.target.checked
                }))}
              />
              {field.label || field.name}
            </label>
          </div>
        );

      default:
        return (
          <div key={fieldKey} className="form-group">
            <label htmlFor={fieldKey}>
              {field.label || field.name}
              {field.required && ' *'}
            </label>
            <input
              type="text"
              id={fieldKey}
              value={fieldValue}
              onChange={handleTemplateFieldChange}
              placeholder={field.placeholder || `Enter ${field.label || field.name}`}
              required={field.required}
            />
          </div>
        );
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      setError('You can upload a maximum of 10 images');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be less than 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length !== files.length) return;

    setImageFiles(validFiles);
    
    const previewUrls = validFiles.map(file => URL.createObjectURL(file));
    setImages(previewUrls);
    setError('');
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    
    URL.revokeObjectURL(images[index]);
    
    setImages(newImages);
    setImageFiles(newFiles);
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    const uploadPromises = imageFiles.map(async (file, index) => {
      const fileName = `products/${Date.now()}_${index}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUploadProgress(prev => Math.min(prev + (90 / imageFiles.length), 90));
      
      return downloadURL;
    });

    return Promise.all(uploadPromises);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    if (imageFiles.length === 0) {
      setError('At least one image is required');
      return false;
    }

    // Validate required template fields
    for (const field of templateFields) {
      if (field.required) {
        const fieldKey = field.key || field.name;
        const fieldValue = templateFieldsData[fieldKey];
        if (!fieldValue || (typeof fieldValue === 'string' && !fieldValue.trim())) {
          setError(`${field.label || field.name} is required`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(10);
      const imageUrls = await uploadImages();
      
      const productData = {
        sellerId: userModel.uid,
        sellerName: userModel.companyName || userModel.email.split('@')[0],
        sellerType: userModel.type,
        
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        categoryName: formData.categoryName,
        condition: formData.condition,
        price: parseFloat(formData.price),
        allowPriceNegotiation: formData.allowPriceNegotiation,
        shippingOption: formData.shippingOption,
        
        brand: formData.brand.trim() || null,
        dimensions: formData.dimensions.trim() || null,
        color: formData.color.trim() || null,
        
        locationAddress: formData.locationAddress.trim() || null,
        cityName: formData.cityName.trim() || null,
        districtName: formData.districtName.trim() || null,
        latitude: userModel.latitude || null,
        longitude: userModel.longitude || null,
        
        imageUrls: imageUrls,
        
        categorySpecificFields: templateFieldsData,
        hasCustomFields: templateFields.length > 0,
        
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        viewCount: 0,
        favoriteCount: 0,
        isFeatured: false,
        isPromoted: false,
        
        photoCount: imageUrls.length,
        hasMultiplePhotos: imageUrls.length > 1,
        isPremiumListing: false,
        isRealEstate: formData.categoryName?.toLowerCase().includes('real estate') || false,
      };

      setUploadProgress(95);

      const docRef = await addDoc(collection(db, 'items'), productData);
      
      setUploadProgress(100);
      
      setTimeout(() => {
        navigate(`/ads-details/${docRef.id}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error creating ad:', error);
      setError('Failed to create ad. Please try again.');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <div className="post-ad-page">
      <Navbar />
      
      <div className="post-ad-container">
        <div className="post-ad-header">
          <h1>Post Your Ad</h1>
          <p>Fill in the details below to create your advertisement</p>
        </div>

        <form onSubmit={handleSubmit} className="post-ad-form">
          {error && <div className="error-message">{error}</div>}
          
          {/* Images Section */}
          <div className="form-section">
            <h3>Product Images *</h3>
            <div className="image-upload-section">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                id="images"
                className="image-input"
              />
              <label htmlFor="images" className="image-upload-label">
                <div className="upload-placeholder">
                  <span>Click to add images (Max 10)</span>
                  <small>JPG, PNG, GIF up to 5MB each</small>
                </div>
              </label>
              
              {images.length > 0 && (
                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="What are you selling?"
                  maxLength="100"
                  required
                />
                <small>{formData.title.length}/100 characters</small>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your item in detail..."
                  rows="5"
                  maxLength="1000"
                  required
                />
                <small>{formData.description.length}/1000 characters</small>
              </div>
            </div>
          </div>

          {/* FIXED: Enhanced Category Selection */}
          <div className="form-section">
            <h3>Category *</h3>
            <div className="category-selection-section">
              <div className="selected-category">
                <label>Selected Category:</label>
                <div className="category-display">
                  {formData.categoryName ? (
                    <span className="selected-category-name">{formData.categoryName}</span>
                  ) : (
                    <span className="no-category">No category selected</span>
                  )}
                  <button
                    type="button"
                    className="change-category-btn"
                    onClick={openCategorySelection}
                  >
                    {formData.categoryName ? 'Change Category' : 'Select Category'}
                  </button>
                </div>
              </div>

              {isCategorySelectionOpen && (
                <div className="category-selection-modal">
                  <div className="modal-overlay" onClick={() => setIsCategorySelectionOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h3>Select Category</h3>
                        <button
                          type="button"
                          className="close-modal"
                          onClick={() => setIsCategorySelectionOpen(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {renderCategoryBreadcrumb()}

                      {categoryLoading ? (
                        <div className="category-loading">
                          <p>Loading categories...</p>
                        </div>
                      ) : (
                        <div className="categories-grid">
                          {currentCategories.length > 0 ? (
                            currentCategories.map(category => (
                              <div
                                key={category.id}
                                className="category-item"
                                onClick={() => handleCategorySelect(category)}
                              >
                                {category.iconUrl && (
                                  <img src={category.iconUrl} alt={category.name} className="category-icon" />
                                )}
                                <span className="category-name">{category.name}</span>
                                <span className="category-level">Level {category.level}</span>
                                {category.children && category.children.length > 0 && (
                                  <small className="has-children">Has subcategories →</small>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="no-categories">
                              <p>No categories available at this level.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Template Fields Section */}
          {templateFields.length > 0 && (
            <div className="form-section">
              <h3>Category-Specific Information</h3>
              <div className="template-fields-grid">
                {templateFields.map(field => renderTemplateField(field))}
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="form-section">
            <h3>Product Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price (Rs) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Enter color"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dimensions">Dimensions</label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="L x W x H (cm)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="shippingOption">Delivery Options</label>
                <select
                  id="shippingOption"
                  name="shippingOption"
                  value={formData.shippingOption}
                  onChange={handleInputChange}
                >
                  <option value="Pickup">Pickup Only</option>
                  <option value="Shipping">Shipping Only</option>
                  <option value="Both">Both Available</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="allowPriceNegotiation"
                    checked={formData.allowPriceNegotiation}
                    onChange={handleInputChange}
                  />
                  Allow price negotiation
                </label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="form-section">
            <h3>Location</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cityName">City</label>
                <input
                  type="text"
                  id="cityName"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  placeholder="Enter city name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="districtName">District/Area</label>
                <input
                  type="text"
                  id="districtName"
                  name="districtName"
                  value={formData.districtName}
                  onChange={handleInputChange}
                  placeholder="Enter district/area"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="locationAddress">Full Address</label>
                <input
                  type="text"
                  id="locationAddress"
                  name="locationAddress"
                  value={formData.locationAddress}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-section">
            {loading && (
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${uploadProgress}%`}}></div>
                <span className="progress-text">{uploadProgress}%</span>
              </div>
            )}
            
            <div className="submit-section">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/ads')}
                disabled={loading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Ad'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default PostAdPage;