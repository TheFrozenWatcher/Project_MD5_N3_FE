import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../services/categoryService";

export default function NewCategoryForm({ onClose }) {
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === "file") {
      setCategory({
        ...category,
        [name]: e.target.files[0], // Assuming single file upload
      });
    } else {
      setCategory({
        ...category,
        [name]: value,
      });
    }

    // Clear error message on input change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    let formIsValid = true;
    const { categoryName, description, image } = category;

    if (!categoryName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoryName: "Category name cannot be empty",
      }));
      formIsValid = false;
    }

    if (!description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description cannot be empty",
      }));
      formIsValid = false;
    }

    if (!image) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Image cannot be empty",
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      // Call API to add new category
      dispatch(createCategory(category));
      // Close form
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
          {category.image && (
            <img
              src={URL.createObjectURL(category.image)}
              alt="Preview"
              className="mt-2 w-auto h-40 rounded-md"
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
