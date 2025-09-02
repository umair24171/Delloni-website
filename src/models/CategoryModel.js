// models/CategoryModel.js - Enhanced version matching your Flutter model
export class CategoryModel {
  constructor({
    id,
    name,
    description = null,
    iconUrl = null,
    bannerUrl = null,
    level = 0,
    parentId = null,
    order = 0,
    isActive = true,
    isFeatured = false,
    showInMenu = true,
    hasCustomFields = false,
    createdAt = null,
    updatedAt = null,
    configuredFields = null,
    fieldTemplateId = null,
    inheritedTemplates = null,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconUrl = iconUrl;
    this.bannerUrl = bannerUrl;
    this.level = level;
    this.parentId = parentId;
    this.order = order;
    this.isActive = isActive;
    this.isFeatured = isFeatured;
    this.showInMenu = showInMenu;
    this.hasCustomFields = hasCustomFields;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.configuredFields = configuredFields;
    this.fieldTemplateId = fieldTemplateId;
    this.inheritedTemplates = inheritedTemplates;
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();
    return CategoryModel.fromMap(data, doc.id);
  }

  static fromMap(data, id) {
    // Parse configuredFields
    let parsedConfiguredFields = null;
    if (Array.isArray(data.configuredFields)) {
      parsedConfiguredFields = data.configuredFields;
    }

    // Parse inheritedTemplates
    let parsedInheritedTemplates = null;
    if (Array.isArray(data.inheritedTemplates)) {
      parsedInheritedTemplates = data.inheritedTemplates;
    }

    return new CategoryModel({
      id,
      name: data.name || '',
      description: data.description,
      iconUrl: data.iconUrl,
      bannerUrl: data.bannerUrl,
      level: data.level || 0,
      parentId: data.parentId,
      order: data.order || 0,
      isActive: data.isActive !== false, // default true
      isFeatured: data.isFeatured || false,
      showInMenu: data.showInMenu !== false, // default true
      hasCustomFields: data.hasCustomFields || false,
      createdAt: data.createdAt?.toDate() || null,
      updatedAt: data.updatedAt?.toDate() || null,
      configuredFields: parsedConfiguredFields,
      fieldTemplateId: data.fieldTemplate, // Note: Flutter uses 'fieldTemplate'
      inheritedTemplates: parsedInheritedTemplates,
    });
  }

  // Convert to map for Firestore
  toMap() {
    const map = {
      name: this.name,
      description: this.description,
      iconUrl: this.iconUrl,
      bannerUrl: this.bannerUrl,
      level: this.level,
      parentId: this.parentId,
      order: this.order,
      isActive: this.isActive,
      isFeatured: this.isFeatured,
      showInMenu: this.showInMenu,
      hasCustomFields: this.hasCustomFields,
    };

    if (this.createdAt) {
      map.createdAt = this.createdAt;
    }
    if (this.updatedAt) {
      map.updatedAt = this.updatedAt;
    }
    if (this.configuredFields) {
      map.configuredFields = this.configuredFields;
    }
    if (this.fieldTemplateId) {
      map.fieldTemplate = this.fieldTemplateId;
    }
    if (this.inheritedTemplates) {
      map.inheritedTemplates = this.inheritedTemplates;
    }

    return map;
  }

  // Utility methods
  getConfiguredFields() {
    return this.configuredFields || [];
  }

  get hasAnyConfiguredFields() {
    return this.configuredFields && this.configuredFields.length > 0;
  }

  get hasTemplateReference() {
    return this.fieldTemplateId && this.fieldTemplateId.trim() !== '';
  }

  get hasInheritedTemplates() {
    return this.inheritedTemplates && this.inheritedTemplates.length > 0;
  }

  getConfiguredField(fieldName) {
    if (!this.configuredFields) return null;
    
    return this.configuredFields.find(
      field => field.name === fieldName || field.key === fieldName
    ) || null;
  }

  getAllTemplateIds() {
    const templateIds = [];
    
    if (this.fieldTemplateId && this.fieldTemplateId.trim() !== '') {
      templateIds.push(this.fieldTemplateId);
    }
    
    if (this.inheritedTemplates) {
      templateIds.push(...this.inheritedTemplates);
    }
    
    return templateIds;
  }
}

// Enhanced Category Service with template support
export class EnhancedCategoryService {
  static COLLECTION_NAME = 'categories';
  static TEMPLATES_COLLECTION = 'fieldTemplates';

  // Get category with all template fields resolved
  static async getCategoryWithTemplates(categoryId) {
    try {
      const category = await this.getCategoryById(categoryId);
      if (!category) return null;

      const templateFields = await this.getTemplateFieldsForCategory(category);
      
      return {
        ...category,
        resolvedFields: templateFields
      };
    } catch (error) {
      console.error('Error getting category with templates:', error);
      return null;
    }
  }

  // Get all template fields for a category (configured + inherited)
  static async getTemplateFieldsForCategory(category) {
    try {
      const allFields = [];
      
      // Add configured fields
      if (category.hasAnyConfiguredFields) {
        allFields.push(...category.getConfiguredFields());
      }

      // Add template fields
      const templateIds = category.getAllTemplateIds();
      if (templateIds.length > 0) {
        const templateFields = await this.getFieldsFromTemplates(templateIds);
        allFields.push(...templateFields);
      }

      return allFields;
    } catch (error) {
      console.error('Error getting template fields:', error);
      return [];
    }
  }

  // Fetch field templates from Firestore
  static async getFieldsFromTemplates(templateIds) {
    try {
      const fields = [];
      
      for (const templateId of templateIds) {
        const templateDoc = await getDoc(doc(db, this.TEMPLATES_COLLECTION, templateId));
        if (templateDoc.exists()) {
          const templateData = templateDoc.data();
          if (templateData.fields && Array.isArray(templateData.fields)) {
            fields.push(...templateData.fields);
          }
        }
      }

      return fields;
    } catch (error) {
      console.error('Error fetching template fields:', error);
      return [];
    }
  }

  // Get complete category path (breadcrumb) from root to selected category
  static async getCategoryPath(categoryId) {
    try {
      const path = [];
      let currentCategoryId = categoryId;

      while (currentCategoryId) {
        const category = await this.getCategoryById(currentCategoryId);
        if (category) {
          path.unshift(category);
          currentCategoryId = category.parentId;
        } else {
          break;
        }
      }

      return path;
    } catch (error) {
      console.error('Error getting category path:', error);
      return [];
    }
  }

  // Get all leaf categories (categories with no children) for final selection
  static async getLeafCategories() {
    try {
      const allCategories = await CategoryService.getAllCategories();
      const parentIds = new Set(allCategories.map(cat => cat.parentId).filter(Boolean));
      
      return allCategories.filter(cat => !parentIds.has(cat.id));
    } catch (error) {
      console.error('Error getting leaf categories:', error);
      return [];
    }
  }

  // Build category hierarchy with all levels
  static buildCategoryHierarchy(categories) {
    const categoryMap = new Map();
    const rootCategories = [];

    // Create map of all categories
    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] });
    });

    // Build hierarchy
    categories.forEach(cat => {
      if (!cat.parentId || cat.level === 0) {
        rootCategories.push(categoryMap.get(cat.id));
      } else {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(categoryMap.get(cat.id));
        }
      }
    });

    return rootCategories;
  }

  // Get categories by level
  static async getCategoriesByLevel(level) {
    try {
      const categoriesRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        categoriesRef,
        where('level', '==', level),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      
      const categories = [];
      snapshot.forEach(doc => {
        categories.push(CategoryModel.fromFirestore(doc));
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories by level:', error);
      throw error;
    }
  }

  // Helper method - get category by ID (reuse from original service)
  static async getCategoryById(categoryId) {
    return await CategoryService.getCategoryById(categoryId);
  }
}