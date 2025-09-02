// services/firebaseServices.js - Updated CategoryService with better debugging
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CategoryModel } from '../models/CategoryModel';
import { ProductModel } from '../models/ProductModel';

// UPDATED CATEGORY SERVICES with better tree building
export class CategoryService {
  static COLLECTION_NAME = 'categories';

  // Get all categories with detailed logging
  static async getAllCategories() {
    try {
      const categoriesRef = collection(db, this.COLLECTION_NAME);
      const q = query(categoriesRef, orderBy('level', 'asc'), orderBy('order', 'asc'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      const categories = [];
      snapshot.forEach(doc => {
        const category = CategoryModel.fromFirestore(doc);
        categories.push(category);
      });
      
      console.log('📊 Fetched categories:', categories.length);
      console.log('📊 Sample categories:', categories.slice(0, 3));
      
      return categories;
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      throw error;
    }
  }

  // Get root categories (level 0 OR parentId is null)
  static async getRootCategories() {
    try {
      const categoriesRef = collection(db, this.COLLECTION_NAME);
      // Query for level 0 OR parentId is null
      const q = query(
        categoriesRef,
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      
      const allCategories = [];
      snapshot.forEach(doc => {
        allCategories.push(CategoryModel.fromFirestore(doc));
      });
      
      // Filter for root categories (level 0 or no parentId)
      const rootCategories = allCategories.filter(cat => 
        cat.level === 0 || !cat.parentId || cat.parentId === null
      );
      
      console.log('🌳 Root categories found:', rootCategories.length);
      console.log('🌳 Root categories:', rootCategories.map(c => `${c.name} (Level: ${c.level})`));
      
      return rootCategories;
    } catch (error) {
      console.error('❌ Error fetching root categories:', error);
      throw error;
    }
  }

  // Get child categories by parent ID
  static async getChildCategories(parentId) {
    try {
      const categoriesRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        categoriesRef,
        where('parentId', '==', parentId),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      
      const categories = [];
      snapshot.forEach(doc => {
        categories.push(CategoryModel.fromFirestore(doc));
      });
      
      console.log(`👶 Children of ${parentId}:`, categories.length);
      
      return categories;
    } catch (error) {
      console.error('❌ Error fetching child categories:', error);
      throw error;
    }
  }

  // IMPROVED: Build hierarchical category tree with better logic
  static async getCategoryTree() {
    try {
      const allCategories = await this.getAllCategories();
      
      console.log('🔨 Building category tree from', allCategories.length, 'categories');
      
      if (allCategories.length === 0) {
        console.warn('⚠️ No categories found!');
        return [];
      }
      
      // Create a map for quick lookup
      const categoryMap = {};
      allCategories.forEach(cat => {
        categoryMap[cat.id] = { ...cat, children: [] };
        console.log(`📝 Mapped category: ${cat.name} (ID: ${cat.id}, Level: ${cat.level}, Parent: ${cat.parentId})`);
      });
      
      // Build the tree
      const rootCategories = [];
      
      allCategories.forEach(cat => {
        const categoryWithChildren = categoryMap[cat.id];
        
        // Check if this is a root category
        if (cat.level === 0 || !cat.parentId || cat.parentId === null || cat.parentId === '') {
          console.log(`🌳 Adding root category: ${cat.name}`);
          rootCategories.push(categoryWithChildren);
        } else {
          // Find parent and add as child
          const parent = categoryMap[cat.parentId];
          if (parent) {
            console.log(`👶 Adding ${cat.name} as child of ${parent.name}`);
            parent.children.push(categoryWithChildren);
          } else {
            console.warn(`⚠️ Parent not found for ${cat.name} (parentId: ${cat.parentId})`);
            // If parent not found, treat as root
            rootCategories.push(categoryWithChildren);
          }
        }
      });
      
      console.log('✅ Category tree built with', rootCategories.length, 'root categories');
      rootCategories.forEach(root => {
        console.log(`🌳 Root: ${root.name} has ${root.children.length} children`);
        root.children.forEach(child => {
          console.log(`  👶 Child: ${child.name} has ${child.children.length} children`);
        });
      });
      
      return rootCategories;
    } catch (error) {
      console.error('❌ Error building category tree:', error);
      throw error;
    }
  }

  // Get category by ID
  static async getCategoryById(categoryId) {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, categoryId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return CategoryModel.fromFirestore(docSnap);
      } else {
        console.log('❌ No category found with ID:', categoryId);
        return null;
      }
    } catch (error) {
      console.error('❌ Error fetching category:', error);
      throw error;
    }
  }

  // Get categories with product count
  static async getCategoriesWithProductCount() {
    try {
      const categories = await this.getRootCategories();
      const categoriesWithCount = [];

      for (const category of categories) {
        const productCount = await ProductService.getProductCountByCategory(category.id);
        categoriesWithCount.push({
          ...category,
          productCount
        });
      }

      return categoriesWithCount;
    } catch (error) {
      console.error('❌ Error fetching categories with product count:', error);
      throw error;
    }
  }

  // Real-time listener for categories
  static onCategoriesSnapshot(callback, options = {}) {
    const categoriesRef = collection(db, this.COLLECTION_NAME);
    let q = categoriesRef;
    
    if (options.level !== undefined) {
      q = query(q, where('level', '==', options.level));
    }
    if (options.parentId) {
      q = query(q, where('parentId', '==', options.parentId));
    }
    if (options.isActive !== undefined) {
      q = query(q, where('isActive', '==', options.isActive));
    }
    
    q = query(q, orderBy('order', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const categories = [];
      snapshot.forEach(doc => {
        categories.push(CategoryModel.fromFirestore(doc));
      });
      callback(categories);
    });
  }
}

// Keep your existing ProductService...
export class ProductService {
  static COLLECTION_NAME = 'items';

  // Get all products
  static async getAllProducts(limitCount = 50) {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach(doc => {
        products.push(ProductModel.fromFirestore(doc));
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get products by category
  static async getProductsByCategory(categoryId, limitCount = 50) {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('category', '==', categoryId),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach(doc => {
        products.push(ProductModel.fromFirestore(doc));
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  // Get product count by category
  static async getProductCountByCategory(categoryId) {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('category', '==', categoryId),
        where('status', '==', 'active')
      );
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('Error getting product count:', error);
      return 0;
    }
  }

  // Get product by ID
  static async getProductById(productId) {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return ProductModel.fromFirestore(docSnap);
      } else {
        console.log('No such product!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get featured products
  static async getFeaturedProducts(limitCount = 10) {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('status', '==', 'active'),
        where('isFeatured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach(doc => {
        products.push(ProductModel.fromFirestore(doc));
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Search products
  static async searchProducts(searchTerm, categoryId = null, limitCount = 50) {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      let q = query(
        productsRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      if (categoryId) {
        q = query(
          productsRef,
          where('category', '==', categoryId),
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      const snapshot = await getDocs(q);
      const products = [];
      snapshot.forEach(doc => {
        const product = ProductModel.fromFirestore(doc);
        if (!searchTerm || 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          products.push(product);
        }
      });
      
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Real-time listener for products
  static onProductsSnapshot(callback, options = {}) {
    const productsRef = collection(db, this.COLLECTION_NAME);
    let q = query(productsRef, where('status', '==', 'active'));
    
    if (options.categoryId) {
      q = query(q, where('category', '==', options.categoryId));
    }
    if (options.isFeatured !== undefined) {
      q = query(q, where('isFeatured', '==', options.isFeatured));
    }
    
    q = query(q, orderBy('createdAt', 'desc'), limit(options.limit || 50));

    return onSnapshot(q, (snapshot) => {
      const products = [];
      snapshot.forEach(doc => {
        products.push(ProductModel.fromFirestore(doc));
      });
      callback(products);
    });
  }
}

// ENHANCED CATEGORY SERVICE with template support
export class EnhancedCategoryService {
  static COLLECTION_NAME = 'categories';
  static TEMPLATES_COLLECTION = 'fieldTemplates';

  // Get category with all template fields resolved
  static async getCategoryWithTemplates(categoryId) {
    try {
      const category = await CategoryService.getCategoryById(categoryId);
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
        const category = await CategoryService.getCategoryById(currentCategoryId);
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
}

// UTILITY FUNCTIONS
export const FirebaseUtils = {
  // Get category path (breadcrumb)
  async getCategoryPath(categoryId) {
    try {
      const path = [];
      let currentCategory = await CategoryService.getCategoryById(categoryId);
      
      while (currentCategory) {
        path.unshift(currentCategory);
        if (currentCategory.parentId) {
          currentCategory = await CategoryService.getCategoryById(currentCategory.parentId);
        } else {
          currentCategory = null;
        }
      }
      
      return path;
    } catch (error) {
      console.error('Error getting category path:', error);
      return [];
    }
  },

  // Format category data for dropdown/navigation
  formatCategoriesForNavigation(categories) {
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      image: category.iconUrl || category.bannerUrl,
      count: category.productCount || 0,
      level: category.level,
      parentId: category.parentId,
      children: category.children || []
    }));
  }
};