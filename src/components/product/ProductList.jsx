import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsForUsers, toggleWishlist } from "../../services/productService";

export default function UserProductList() {
  const dispatch = useDispatch();
  const { data: products, loading, error, totalPages } = useSelector((state) => state.product);
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
        <Outlet />
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
          {loading === "PENDING"? (
            <div className="col-span-full text-center text-sm text-gray-500">
              Loading products...
            </div>
          ) : products.length > 0? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleWishlist={handleToggleWishlist}
                isLoading={loading}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-sm text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}