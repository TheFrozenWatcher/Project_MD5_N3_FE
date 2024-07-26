import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../api';
import { GET } from '../../constants/httpMethod';
import ProductCard from './ProductCard';
import {  toggleWishlist } from "../../services/productService";


export default function NewestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const response = await BASE_URL[GET]('user/product/newest');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching newest products');
      } finally {
        setLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);

  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Newest Products</h1>
      {loading === "PENDING" ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading newest products: {error}</div>
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
