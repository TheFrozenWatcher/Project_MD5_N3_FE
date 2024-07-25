import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { selectProductById, toggleWishlist } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import Carousel from "../carousel/Carousel";





export default function ProductDetailById() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.currentProduct);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(selectProductById(id));
    }
  }, [dispatch, id]);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(id));
  };

  const handleQuantityChange = (detailId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [detailId]: newQuantity,
    }));
  };

  const handleAddToCart = (detailId) => {
    dispatch(addToCart({
      productDetailId: detailId,
      quantity: quantities[detailId] || 1,
    }));
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
    <div className="p-6">
      <div className="flex mb-6">
        <img
          src={product.image}
          alt={product.productName}
          className="h-64 w-64 object-cover rounded-lg"
        />
        <div className="ml-6 flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <div className="grid grid-cols-2 gap-x-4 mb-4">
            <p className="font-semibold text-gray-700">Brand:</p>
            <p className="text-gray-600">{product.brandName}</p>
            <p className="font-semibold text-gray-700">Category:</p>
            <p className="text-gray-600">{product.categoryName}</p>
            <p className="font-semibold text-gray-700">Last updated:</p>
            <p className="text-gray-600">{product.updatedAt}</p>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            onClick={handleToggleWishlist}
            disabled={loading === "PENDING"}
            className={`transition-colors duration-300 ${
              product.onWishlist ? "text-pink-500" : "text-gray-500"
            }`}
          >
            {product.onWishlist ? (
              <FaHeart className="text-pink-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-2xl" />
            )}
          </button>
        </div>
      </div>
      {product.imageList.length > 0 && (
        <div className="mb-6">
          <div className="font-bold mb-2">Gallery:</div>
          <Carousel images={product.imageList} />
        </div>
      )}
      {product.productDetails.length > 0 && (
        <div>
          <div className="font-bold mb-2">Variants:</div>
          <div className="grid grid-cols-1 gap-4">
            {product.productDetails.map((detail) => (
              <div
                key={detail.productDetailId}
                className="border border-gray-300 p-4 rounded-lg flex"
              >
                <img
                  src={detail.image}
                  alt={`${product.productName} ${detail.productDetailName}`}
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <div className="ml-6 flex-1">
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-semibold text-gray-700">Name:</p>
                    <p className="text-gray-600">{detail.productDetailName}</p>
                    <p className="font-semibold text-gray-700">Color:</p>
                    <p className="text-gray-600">{detail.color}</p>
                    <p className="font-semibold text-gray-700">Price:</p>
                    <p className="text-gray-600">${detail.unitPrice}</p>
                    <p className="font-semibold text-gray-700">Status:</p>
                    <p className="text-gray-600">
                      {detail.status ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          detail.productDetailId,
                          (quantities[detail.productDetailId] || 1) - 1
                        )
                      }
                      disabled={quantities[detail.productDetailId] <= 1}
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantities[detail.productDetailId] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          detail.productDetailId,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="mx-3 w-16 text-center border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          detail.productDetailId,
                          (quantities[detail.productDetailId] || 1) + 1
                        )
                      }
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(detail.productDetailId)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
