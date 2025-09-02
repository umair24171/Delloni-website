// hooks/useCategories.js
import { useState, useEffect, useCallback } from 'react';
import { CategoryService, FirebaseUtils } from '../services/firebaseServices';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch category tree
  const fetchCategoryTree = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tree = await CategoryService.getCategoryTree();
      setCategoryTree(tree);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching category tree:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get categories by level
  const getCategoriesByLevel = useCallback((level) => {
    return categories.filter(cat => cat.level === level);
  }, [categories]);

  // Get child categories
  const getChildCategories = useCallback((parentId) => {
    return categories.filter(cat => cat.parentId === parentId);
  }, [categories]);

  // Get category by ID
  const getCategoryById = useCallback((categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  }, [categories]);

  // Format categories for navigation (like your existing format)
  const getFormattedCategories = useCallback(() => {
    return FirebaseUtils.formatCategoriesForNavigation(categoryTree);
  }, [categoryTree]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
    fetchCategoryTree();
  }, [fetchCategories, fetchCategoryTree]);

  return {
    categories,
    categoryTree,
    loading,
    error,
    getCategoriesByLevel,
    getChildCategories,
    getCategoryById,
    getFormattedCategories,
    refetch: fetchCategories,
    refetchTree: fetchCategoryTree,
  };
};

// Hook for real-time category updates
export const useCategoriesRealtime = (options = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = CategoryService.onCategoriesSnapshot(
      (fetchedCategories) => {
        setCategories(fetchedCategories);
        setLoading(false);
        setError(null);
      },
      options
    );

    // Cleanup subscription
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [options.level, options.parentId, options.isActive]);

  return {
    categories,
    loading,
    error,
  };
};

// Hook for specific category operations
export const useCategoryOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategoryPath = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const path = await FirebaseUtils.getCategoryPath(categoryId);
      return path;
    } catch (err) {
      setError(err.message);
      console.error('Error getting category path:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoriesWithCount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesWithCount = await CategoryService.getCategoriesWithProductCount();
      return categoriesWithCount;
    } catch (err) {
      setError(err.message);
      console.error('Error getting categories with count:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getCategoryPath,
    getCategoriesWithCount,
  };
};