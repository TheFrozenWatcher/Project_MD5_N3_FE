import React from 'react';

const DeleteProductDetailForm = ({ productDetailId, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(productDetailId);
  };

  return (
    <div>
      <p>Are you sure you want to delete this product detail?</p>
      <div className="flex justify-end space-x-4 mt-4">
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteProductDetailForm;
