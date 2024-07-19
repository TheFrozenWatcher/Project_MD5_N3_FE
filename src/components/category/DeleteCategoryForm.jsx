import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../services/categoryService";

export default function DeleteCategoryForm({ categoryId, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCategory(categoryId));
    onClose();
  };

  return (
    <div>
      <p>Are you sure you want to delete this category?</p>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Category
        </button>
      </div>
    </div>
  );
}
