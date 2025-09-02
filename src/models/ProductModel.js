// models/ProductModel.js
export class ProductModel {
    constructor({
      id,
      sellerId,
      sellerName,
      sellerType = 'individual',
      title,
      description,
      category,
      categoryName = null,
      condition = 'Used',
      price,
      allowPriceNegotiation = true,
      shippingOption = 'Both',
      imageUrls = [],
      brand = null,
      dimensions = null,
      color = null,
      latitude = null,
      longitude = null,
      locationAddress = null,
      cityId = null,
      cityName = null,
      districtId = null,
      districtName = null,
      status = 'active',
      createdAt,
      updatedAt = null,
      viewCount = 0,
      favoriteCount = 0,
      isFeatured = false,
      isPromoted = false,
      promotedUntil = null,
      categorySpecificFields = null,
      categoryFieldTemplate = null,
      categoryTemplateName = null,
      hasCustomFields = null,
      isRealEstate = null,
      photoCount = null,
      hasMultiplePhotos = null,
      isPremiumListing = null,
    }) {
      this.id = id;
      this.sellerId = sellerId;
      this.sellerName = sellerName;
      this.sellerType = sellerType;
      this.title = title;
      this.description = description;
      this.category = category;
      this.categoryName = categoryName;
      this.condition = condition;
      this.price = price;
      this.allowPriceNegotiation = allowPriceNegotiation;
      this.shippingOption = shippingOption;
      this.imageUrls = imageUrls;
      this.brand = brand;
      this.dimensions = dimensions;
      this.color = color;
      this.latitude = latitude;
      this.longitude = longitude;
      this.locationAddress = locationAddress;
      this.cityId = cityId;
      this.cityName = cityName;
      this.districtId = districtId;
      this.districtName = districtName;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.viewCount = viewCount;
      this.favoriteCount = favoriteCount;
      this.isFeatured = isFeatured;
      this.isPromoted = isPromoted;
      this.promotedUntil = promotedUntil;
      this.categorySpecificFields = categorySpecificFields;
      this.categoryFieldTemplate = categoryFieldTemplate;
      this.categoryTemplateName = categoryTemplateName;
      this.hasCustomFields = hasCustomFields;
      this.isRealEstate = isRealEstate;
      this.photoCount = photoCount;
      this.hasMultiplePhotos = hasMultiplePhotos;
      this.isPremiumListing = isPremiumListing;
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      
      return new ProductModel({
        id: doc.id,
        sellerId: data.sellerId || '',
        sellerName: data.sellerName || '',
        sellerType: data.sellerType || 'individual',
        
        // Support both 'title' and 'itemTitle' for backward compatibility
        title: data.title || data.itemTitle || '',
        description: data.description || '',
        category: data.category || '',
        categoryName: data.categoryName,
        condition: data.condition || 'Used',
        price: data.price || 0,
        allowPriceNegotiation: data.allowPriceNegotiation !== false,
        shippingOption: data.shippingOption || 'Both',
        imageUrls: data.imageUrls || [],
        brand: data.brand,
        dimensions: data.dimensions,
        color: data.color,
        latitude: data.latitude,
        longitude: data.longitude,
        locationAddress: data.locationAddress,
        
        // City/District fields
        cityId: data.cityId,
        cityName: data.cityName,
        districtId: data.districtId,
        districtName: data.districtName,
        
        status: data.status || 'active',
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
        viewCount: data.viewCount || data.views || 0,
        favoriteCount: data.favoriteCount || data.likes || 0,
        isFeatured: data.isFeatured || false,
        isPromoted: data.isPromoted || false,
        promotedUntil: data.promotedUntil?.toDate(),
        
        // Category-specific fields
        categorySpecificFields: data.categorySpecificFields,
        categoryFieldTemplate: data.categoryFieldTemplate,
        categoryTemplateName: data.categoryTemplateName,
        hasCustomFields: data.hasCustomFields,
        
        // Enhanced metadata
        isRealEstate: data.isRealEstate,
        photoCount: data.photoCount,
        hasMultiplePhotos: data.hasMultiplePhotos,
        isPremiumListing: data.isPremiumListing,
      });
    }
  
    toJson() {
      return {
        sellerId: this.sellerId,
        sellerName: this.sellerName,
        sellerType: this.sellerType,
        title: this.title,
        itemTitle: this.title, // Store both for compatibility
        description: this.description,
        category: this.category,
        categoryName: this.categoryName,
        condition: this.condition,
        price: this.price,
        allowPriceNegotiation: this.allowPriceNegotiation,
        shippingOption: this.shippingOption,
        imageUrls: this.imageUrls,
        brand: this.brand,
        dimensions: this.dimensions,
        color: this.color,
        latitude: this.latitude,
        longitude: this.longitude,
        locationAddress: this.locationAddress,
        
        // City/District fields
        cityId: this.cityId,
        cityName: this.cityName,
        districtId: this.districtId,
        districtName: this.districtName,
        
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        viewCount: this.viewCount,
        views: this.viewCount, // Store both for compatibility
        favoriteCount: this.favoriteCount,
        likes: this.favoriteCount, // Store both for compatibility
        isFeatured: this.isFeatured,
        isPromoted: this.isPromoted,
        promotedUntil: this.promotedUntil,
        
        // Category-specific fields
        categorySpecificFields: this.categorySpecificFields,
        categoryFieldTemplate: this.categoryFieldTemplate,
        categoryTemplateName: this.categoryTemplateName,
        hasCustomFields: this.hasCustomFields,
        
        // Enhanced metadata
        isRealEstate: this.isRealEstate,
        photoCount: this.photoCount,
        hasMultiplePhotos: this.hasMultiplePhotos,
        isPremiumListing: this.isPremiumListing,
      };
    }
  
    // Helper methods
    getTimeSincePosted() {
      const now = new Date();
      const difference = now.getTime() - this.createdAt.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
      if (days > 0) {
        return `${days}d ago`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m ago`;
      } else if (minutes > 0) {
        return `${minutes}m ago`;
      } else {
        return 'Just now';
      }
    }
  
    getFormattedPrice() {
      if (this.price >= 100000) {
        return `Rs ${(this.price / 100000).toFixed(1)}L`;
      } else if (this.price >= 1000) {
        return `Rs ${(this.price / 1000).toFixed(0)}K`;
      } else {
        return `Rs ${this.price.toFixed(0)}`;
      }
    }
  
    getFullLocationString() {
      const locationParts = [];
      
      if (this.districtName) {
        locationParts.push(this.districtName);
      }
      if (this.cityName) {
        locationParts.push(this.cityName);
      }
      if (locationParts.length === 0 && this.locationAddress) {
        locationParts.push(this.locationAddress);
      }
      
      return locationParts.join(', ');
    }
  
    get hasCategorySpecificData() {
      return this.categorySpecificFields && 
             Object.keys(this.categorySpecificFields).length > 0;
    }
  
    getCategoryField(fieldName) {
      return this.categorySpecificFields?.[fieldName];
    }
  
    get isPremium() {
      return this.isPremiumListing || 
             this.isFeatured || 
             this.isPromoted ||
             (this.hasMultiplePhotos && (this.photoCount || 0) >= 10);
    }
  
    get displayCategoryName() {
      return this.categoryName || this.category;
    }
  
    get hasCompleteLocation() {
      return this.latitude !== null && 
             this.longitude !== null && 
             (this.cityName || this.locationAddress);
    }
  
    get isValidForEdit() {
      return this.title.trim() !== '' &&
             this.description.trim() !== '' &&
             this.category.trim() !== '' &&
             this.condition.trim() !== '' &&
             this.price > 0 &&
             this.imageUrls.length > 0;
    }
  
    getShortDescription(maxLength = 100) {
      if (this.description.length <= maxLength) {
        return this.description;
      }
      return `${this.description.substring(0, maxLength)}...`;
    }
  
    get isRecentlyPosted() {
      const now = new Date();
      const difference = now.getTime() - this.createdAt.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      return days <= 7;
    }
  
    getStatusDisplayText() {
      switch (this.status.toLowerCase()) {
        case 'active':
          return 'Active';
        case 'sold':
          return 'Sold';
        case 'inactive':
          return 'Inactive';
        default:
          return this.status;
      }
    }
  
    get canBeEdited() {
      return this.status.toLowerCase() !== 'sold';
    }
  }