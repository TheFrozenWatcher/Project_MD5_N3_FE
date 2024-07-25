import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET } from "../../constants/httpMethod";
import BASE_URL from "../../api";

const RelatedProducts = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <Link to={`/user/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {product.productName}
                </h3>
                <p className="text-gray-600 mb-2">{product.brandName}</p>
                <p className="text-gray-500 text-sm">{product.categoryName}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
