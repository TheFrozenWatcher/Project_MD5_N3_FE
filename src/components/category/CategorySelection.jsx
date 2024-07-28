import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesForInput } from '../../services/categoryService';

export default function CategorySelection({ selectedCategory, onSelectCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategoriesForInput());
  }, [dispatch]);

  return (
    <div className="w-1/4 p-4 border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.categoryId}
            className={`cursor-pointer p-2 ${selectedCategory === category.categoryId ? 'bg-gray-200' : ''} text-gray-800 hover:bg-gray-100`}
            onClick={() => onSelectCategory(category.categoryId)}
          >
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
