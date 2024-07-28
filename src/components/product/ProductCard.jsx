import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

export default function ProductCard({ product, onToggleWishlist, isLoading }) {
  const location = useLocation();
  const basePath = location.pathname.startsWith('') ? '/user' : '';

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`${basePath}/product/${product.id}`}>
        <div className="flex justify-center p-4">
          <img
            src={product.image}
            alt={product.productName}
            className="h-40 w-40 object-cover"
          />
        </div>
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold">{product.productName}</h2>
          <p className="text-gray-600">{product.brandName}</p>
          <p className="text-gray-600">{product.categoryName}</p>
        </div>
      </Link>
      <div className="p-4 text-center">
        <button
          onClick={() => onToggleWishlist(product.id)}
          disabled={isLoading === "PENDING"}
          className={`w-full py-2 px-4 rounded text-white transition-colors duration-300 ${
            product.onWishlist ? "bg-pink-500" : "bg-blue-500"
          }`}
        >
          {product.onWishlist ? (
            <div className="flex items-center justify-center space-x-2">
              <FaHeart />
              <span>Remove from Wishlist</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <FaRegHeart />
              <span>Add to Wishlist</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
