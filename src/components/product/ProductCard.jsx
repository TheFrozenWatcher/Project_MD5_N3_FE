import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

export default function ProductCard({ product, onToggleWishlist, isLoading }) {
  const location = useLocation();
  const basePath = location.pathname.startsWith('')? '/user' : '';

  return (
    <div className="bg-white border-2 border-gray-200 shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center mb-4">
        <img
          src={product.image}
          alt={product.productName}
          className="h-20 w-20 object-cover rounded-full"
        />
      </div>
      <div className="text-center mb-4">
        <Link to={`${basePath}/product/${product.id}`}>
          <div className="text-lg font-semibold">{product.productName}</div>
          <div className="text-sm text-gray-500">{product.brandName}</div>
          <div className="text-sm text-gray-500">{product.categoryName}</div>
        </Link>
      </div>
      <div className="flex flex-col items-center mb-4">
      <button
        onClick={() => onToggleWishlist(product.id)}
        disabled={isLoading === "PENDING"} 
        className={`transition-colors duration-300 text-center bg-yellow-300 ${
          product.onWishlist ? "text-pink-500" : "text-gray-500"
        }`}
      >
        {product.onWishlist ? (
          <span>Remove from Wishlist <FaHeart className="text-pink-500" /></span>
        ) : (
          <span>Add to Wishlist <FaRegHeart className="text-gray-500" /></span>
        )}
      </button>
      </div>

    </div>
  );
}