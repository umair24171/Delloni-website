// components/CategoryDebug.jsx - Add this to debug your categories
import React, { useState, useEffect } from 'react';
import { CategoryService } from '../services/firebaseServices';

const CategoryDebug = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoriesForDebug();
  }, []);

  const loadCategoriesForDebug = async () => {
    try {
      setLoading(true);
      
      // Get all categories raw data
      const categories = await CategoryService.getAllCategories();
      setAllCategories(categories);
      
      // Get category tree
      const tree = await CategoryService.getCategoryTree();
      setCategoryTree(tree);
      
      console.log('=== CATEGORY DEBUG ===');
      console.log('Total categories:', categories.length);
      console.log('All categories:', categories);
      console.log('Category tree:', tree);
      
      // Debug parent-child relationships
      categories.forEach(cat => {
        const children = categories.filter(c => c.parentId === cat.id);
        console.log(`Category "${cat.name}" (Level ${cat.level}):`, {
          id: cat.id,
          parentId: cat.parentId,
          childrenCount: children.length,
          children: children.map(c => ({ name: c.name, id: c.id, level: c.level }))
        });
      });
      
    } catch (error) {
      console.error('Debug error:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByLevel = () => {
    const grouped = {};
    allCategories.forEach(cat => {
      if (!grouped[cat.level]) grouped[cat.level] = [];
      grouped[cat.level].push(cat);
    });
    return grouped;
  };

  if (loading) return <div>Loading debug info...</div>;

  const levelGroups = groupByLevel();

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '12px' }}>
      <h2>Category Debug Information</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Summary</h3>
        <p>Total Categories: {allCategories.length}</p>
        <p>Tree Root Categories: {categoryTree.length}</p>
        <p>Levels Found: {Object.keys(levelGroups).join(', ')}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Categories by Level</h3>
        {Object.keys(levelGroups).sort().map(level => (
          <div key={level} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h4>Level {level} ({levelGroups[level].length} categories)</h4>
            {levelGroups[level].map(cat => {
              const children = allCategories.filter(c => c.parentId === cat.id);
              return (
                <div key={cat.id} style={{ marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                  <strong>{cat.name}</strong> 
                  <br />
                  <small>
                    ID: {cat.id} | ParentID: {cat.parentId || 'null'} | 
                    Children: {children.length} | Active: {cat.isActive ? 'Yes' : 'No'}
                  </small>
                  {children.length > 0 && (
                    <ul style={{ marginLeft: '1rem', fontSize: '10px' }}>
                      {children.map(child => (
                        <li key={child.id}>
                          {child.name} (Level {child.level})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Potential Issues Found</h3>
        <ul>
          {allCategories.length === 0 && (
            <li style={{ color: 'red' }}>❌ No categories found in database</li>
          )}
          
          {allCategories.some(cat => !cat.hasOwnProperty('level')) && (
            <li style={{ color: 'red' }}>❌ Some categories missing 'level' field</li>
          )}
          
          {allCategories.some(cat => cat.parentId && !allCategories.find(p => p.id === cat.parentId)) && (
            <li style={{ color: 'red' }}>❌ Some categories have invalid parentId references</li>
          )}
          
          {categoryTree.length === 0 && allCategories.length > 0 && (
            <li style={{ color: 'red' }}>❌ Category tree is empty but categories exist</li>
          )}
          
          {categoryTree.length === 0 && (
            <li style={{ color: 'orange' }}>⚠️ No root categories found (level 0 or parentId null)</li>
          )}
        </ul>
      </div>

      <div>
        <h3>Sample Correct Category Structure</h3>
        <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
{`// Root Category (Level 0)
{
  "id": "electronics",
  "name": "Electronics", 
  "level": 0,
  "parentId": null,
  "isActive": true,
  "order": 1
}

// Sub Category (Level 1) 
{
  "id": "phones",
  "name": "Mobile Phones",
  "level": 1, 
  "parentId": "electronics",
  "isActive": true,
  "order": 1
}

// Sub-Sub Category (Level 2)
{
  "id": "smartphones", 
  "name": "Smartphones",
  "level": 2,
  "parentId": "phones", 
  "isActive": true,
  "order": 1
}`}
        </pre>
      </div>
    </div>
  );
};

export default CategoryDebug;