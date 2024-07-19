import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, fetchCategoryById } from "../../services/categoryService";

export default function UpdateCategoryForm({ categoryId, onClose }) {
  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.category.details);
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    categoryName: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId)).then((response) => {
      setCategory(response.payload);
    });
  }, [dispatch, categoryId]);

  const validateData = (name, value) => {
    let isValid = true;
    switch (name) {
      case "categoryName":
        if (!value) {
          setErrors((prev) => ({ ...prev, categoryName: "Category name cannot be empty" }));
          isValid = false;
        } else {
          setErrors((prev) => ({ ...prev, categoryName: "" }));
        }
        break;
      case "description":
        if (!value) {
          setErrors((prev) => ({ ...prev, description: "Description cannot be empty" }));
          isValid = false;
        } else {
          setErrors((prev) => ({ ...prev, description: "" }));
        }
        break;
      case "image":
        if (!value) {
          setErrors((prev) => ({ ...prev, image: "Image URL cannot be empty" }));
          isValid = false;
        } else {
          setErrors((prev) => ({ ...prev, image: "" }));
        }
        break;
      default:
        break;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setCategory({
      ...category,
      [name]: type === "file" ? files[0] : value,
    });

    validateData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryNameValid = validateData("categoryName", category.categoryName);
    const descriptionValid = validateData("description", category.description);
    const imageValid = validateData("image", category.image);

    if (categoryNameValid && descriptionValid && imageValid) {
      dispatch(updateCategory(categoryId, category));
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.categoryName && <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
