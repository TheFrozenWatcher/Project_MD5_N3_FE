// src/pages/admin/product/AdminProductIndex.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewProductForm from "../../components/product/NewProductForm";
import UpdateProductForm from "../../components/product/UpdateProductForm";
import DeleteProductForm from "../../components/product/DeleteProductForm"; // Add import for DeleteProductForm
import {
  createProduct,
  deleteProductById,
  fetchAllProducts,
  updateProduct,
} from "../../services/productService";

export default function AdminProductIndex() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete modal
  const [idToDelete, setIdToDelete] = useState(null); // State to store id of product to delete
  const [idToUpdate, setIdToUpdate] = useState(null); // State to store id of product to update

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleUpdateForm = (id) => {
    setIdToUpdate(id);
    setShowUpdateForm(!showUpdateForm);
  };

  const toggleDeleteModal = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteProductById(idToDelete));
    setShowDeleteModal(false);
  };

  const handleCreateProduct = (productData) => {
    dispatch(createProduct(productData));
    setShowForm(false);
  };

  const handleUpdateProduct = (productData) => {
    dispatch(updateProduct({ productId: idToUpdate, formData: productData }));
    setShowUpdateForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg relative">
            <span
              className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer text-2xl font-bold"
              onClick={toggleForm}
            >
              &times;
            </span>
            <h2 className="text-xl mb-4">Add New Product</h2>
            <NewProductForm
              onSubmit={handleCreateProduct}
              onClose={toggleForm}
            />
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg relative">
            <span
              className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer text-2xl font-bold"
              onClick={() => setShowUpdateForm(false)}
            >
              &times;
            </span>
            <h2 className="text-xl mb-4">Update Product</h2>
            <UpdateProductForm
              productId={idToUpdate}
              onSubmit={handleUpdateProduct}
              onClose={() => setShowUpdateForm(false)}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg relative">
            <span
              className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer text-2xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <DeleteProductForm
              productId={idToDelete}
              onDelete={handleDelete}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      <div className="max-h-96 mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created at
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading products...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.status ? "On display" : "Not displayed"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleUpdateForm(product.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleDeleteModal(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
