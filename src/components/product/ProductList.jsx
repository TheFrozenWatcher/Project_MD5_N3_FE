import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsForUsers,
  toggleWishlist,
} from "../../services/productService";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

export default function UserProductList() {
  const dispatch = useDispatch();
  const {
    data: products,
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  
  useEffect(() => {
    dispatch(
      fetchAllProductsForUsers({
        keyword,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
  }, [dispatch, keyword, currentPage, pageSize, sortBy, sortDirection]);

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

  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
  };

  return (
    <>
    <div>
      {/* Product detail by id */}
      <Outlet/>
    </div>
    <div className="p-6">
      <div className="flex justify-between mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading === "PENDING" ? (
          <div className="col-span-full text-center text-sm text-gray-500">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white border-2 border-gray-200 shadow-md rounded-md p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => handleToggleWishlist(product.id)}
                  disabled={loading === "PENDING"} // Disable button while loading
                  className={`transition-colors duration-300 ${
                    product.onWishlist ? "text-pink-500" : "text-gray-500"
                  }`}
                >
                  {product.onWishlist ? (
                    <FaHeart className="text-pink-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
              </div>
              <div className="flex items-center mb-2">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-10 w-10 object-cover rounded-full"
                />
              </div>
              <Link to={`${product.id}`}>
              <div className="text-lg font-semibold">{product.productName}</div>
              <div className="text-sm text-gray-500">{product.brandName}</div>
              <div className="text-sm text-gray-500">
                {product.categoryName}
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-sm text-gray-500">
            No products found
          </div>
        )}
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
    </>
  );
}
