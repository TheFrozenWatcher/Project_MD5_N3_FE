import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../services/productService";
import ProductCard from "./ProductCard";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";

export default function MostSoldProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostSoldProducts = async () => {
      try {
        const response = await BASE_URL[GET]("user/product/mostSold");
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching most sold products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostSoldProducts();
  }, []);

  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Most Sold Products</h1>
      {loading === "PENDING" ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading most sold products: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleWishlist={handleToggleWishlist}
              isLoading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
