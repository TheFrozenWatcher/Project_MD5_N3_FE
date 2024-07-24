import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  toggleWishlist,
} from "../../services/productService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductDetailById() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.currentProduct); // Access the correct slice
  const loading = useSelector((state) => state.product.loading); // Access the correct slice
  const error = useSelector((state) => state.product.error); // Access the correct slice

  useEffect(() => {
    if (id) {
      dispatch(selectProductById(id)); // Dispatch the correct action
    }
  }, [dispatch, id]);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(id));
  };

  if (loading === "PENDING") {
    return <div>Loading...</div>;
  }

  if (loading === "FAILED") {
    return <div>Error loading product details: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img
          src={product.image}
          alt={product.productName}
          className="h-48 w-48 object-cover rounded"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-lg text-gray-600 mb-2">
            Brand: {product.brandName}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Category: {product.categoryName}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: {product.updatedAt}
          </p>

          <p className="text-gray-700">{product.description}</p>
          <button
                  onClick={() => handleToggleWishlist()}
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
      </div>
    </div>
    </>
  );
}
