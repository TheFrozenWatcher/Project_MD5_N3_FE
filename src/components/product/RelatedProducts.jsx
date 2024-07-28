import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET } from "../../constants/httpMethod";
import BASE_URL from "../../api";
import ProductCard from "./ProductCard";
import { toggleWishlist } from "../../services/productService";

const RelatedProducts = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
  };

  // Function to fetch related products based on product ID
  const fetchRelatedProducts = async () => {
    try {
      const response = await BASE_URL[GET](`user/product/${id}/related`);
      if (!response) {
        throw new Error("Failed to fetch related products");
      }
      setRelatedProducts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRelatedProducts();
    }
  }, [id]); // Fetch related products whenever the product ID changes

  if (loading) {
    return <div>Loading related products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">You may also like:</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={handleToggleWishlist}
            isLoading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
