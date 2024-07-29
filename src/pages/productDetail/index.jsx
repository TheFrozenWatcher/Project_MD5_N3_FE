import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductDetail,
  deleteProductDetailById,
  fetchAllProductDetails,
  fetchProductDetailById,
  updateProductDetail,
} from "../../services/productDetailService";
import NewProductDetailForm from "../productDetail/NewProductDetailForm";
import UpdateProductDetailForm from "../productDetail/UpdateProductDetailForm";
import DeleteProductDetailForm from "../productDetail/DeleteProductDetailForm";
import Pagination from "../../components/pagination/Pagination";

export default function AdminProductDetailIndex() {
  const dispatch = useDispatch();
  const {
    data: productDetails,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.productDetail);

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
      fetchAllProductDetails({
        keyword,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
  }, [dispatch, keyword, currentPage, pageSize, sortBy, sortDirection]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleUpdateForm = (id) => {
    setIdToUpdate(id);
    console.log("idToUpdate " + id);
    fetchProductDetailById(id);
    setShowUpdateForm(!showUpdateForm);
  };

  const toggleDeleteModal = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleCreateProductDetail = (productDetailData) => {
    dispatch(createProductDetail(productDetailData));
    dispatch(
      fetchAllProductDetails({
        keyword,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
    setShowForm(false);
  };
  const handleUpdateProductDetail = (productDetailData) => {
    dispatch(
      updateProductDetail({
        detailId: idToUpdate,
        productDetail: productDetailData,
      })
    );
    dispatch(
      fetchAllProductDetails({
        keyword,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
    setShowUpdateForm(false);
  };
  const handleDelete = () => {
    dispatch(deleteProductDetailById(idToDelete));
    dispatch(
      fetchAllProductDetails({
        keyword,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
    setShowDeleteModal(false);
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
          Add New Product Detail
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
            <option value="productDetailName">Name</option>
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
            <h2 className="text-xl mb-4">Add New Product Detail</h2>
            <NewProductDetailForm
              onSubmit={handleCreateProductDetail}
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
            <h2 className="text-xl mb-4">Update Product Detail</h2>
            <UpdateProductDetailForm
              productDetailId={idToUpdate}
              onSubmit={(productDetailData) =>
                handleUpdateProductDetail(productDetailData)
              }
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
            <DeleteProductDetailForm
              productDetailId={idToDelete}
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
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th
                colSpan={2}
                className="px-6 py-3 center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading === "loading" ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading product details...
                </td>
              </tr>
            ) : productDetails.length > 0 ? (
              productDetails.map((detail, index) => (
                <tr key={detail.productDetailId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + (currentPage - 1) * pageSize + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={detail.image}
                      alt={detail.productDetailName}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.productDetailName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.unitPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.status ? "On sale" : "Not on sale"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleUpdateForm(detail.productDetailId)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleDeleteModal(detail.productDetailId)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No product details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
}