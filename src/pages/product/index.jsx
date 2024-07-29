import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewProductForm from "../../components/product/NewProductForm";
import UpdateProductForm from "../../components/product/UpdateProductForm";
import DeleteProductForm from "../../components/product/DeleteProductForm";
import {
  createProduct,
  deleteProductById,
  fetchAllProducts,
  updateProduct,
} from "../../services/productService";
import { Link, Navigate } from "react-router-dom";

export default function AdminProductIndex() {
  const dispatch = useDispatch();
  const { data: products, loading, error, totalPages } = useSelector(
    (state) => state.product
  );
  
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    dispatch(
      fetchAllProducts({ keyword, page: currentPage, size: pageSize, sortBy, sortDirection })
    );
  }, [dispatch, keyword, currentPage, pageSize, sortBy, sortDirection]);

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

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
        <div className="flex space-x-2">
          <input
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-3 py-2 border border-gray-300 rounded"
          />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="id">ID</option>
            <option value="productName">Name</option>
            <option value="createdAt">Created at</option>
            <option value="updatedAt">Updated at</option>
          </select>
          <select
            value={sortDirection}
            onChange={handleSortDirectionChange}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
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
                Brand{" "}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th colSpan={3} className="px-6 py-3 center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading === "loading" ? (
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
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1+(currentPage-1)*pageSize}</td>
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
                    {product.brandName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.categoryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.status ? "On display" : "Not displayed"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to= {`user/product/${product.id}`}>
                    <button
                      className="text-green-600 hover:text-red-900"
                    >
                      View page
                    </button>
                    </Link>
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

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
