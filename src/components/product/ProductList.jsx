import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchAllProductsForUsers, toggleWishlist } from "../../services/productService";
import { fetchCategoriesForInput } from "../../services/categoryService";
import Pagination from "../pagination/Pagination";

export default function UserProductList() {
  const dispatch = useDispatch();
  const { data: products, loading, error, totalPages } = useSelector((state) => state.product);
  const categories = useSelector((state) => state.category.categories);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesForInput());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllProductsForUsers({
        keyword,
        categoryId: selectedCategory,
        page: currentPage,
        size: pageSize,
        sortBy,
        sortDirection,
      })
    );
  }, [dispatch, keyword, currentPage, pageSize, sortBy, sortDirection, selectedCategory]);

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

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-lg font-bold mb-4 text-gray-900 hover:cursor-pointer" onClick={() => handleCategorySelect(null)}>Categories</h2>
        <ul>
          
          {categories.map((category) => (
            <li
              key={category.categoryId}
              className={`cursor-pointer p-2 ${selectedCategory === category.categoryId ? 'bg-gray-200' : ''} text-gray-800 hover:bg-gray-100`}
              onClick={() => handleCategorySelect(category.categoryId)}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-6">
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

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
