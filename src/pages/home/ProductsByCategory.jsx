import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../api";
import { GET } from "../../constants/httpMethod";

const CategoryWithProducts = ({ categoryId }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryWithProducts = async () => {
      try {
        const response = await BASE_URL[GET]("user/category/" + categoryId);
        const data = response.data;

        setCategory(data.category);
        setProducts(data.products);
        setMessage(data.message);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch category and products.");
        setLoading(false);
      }
    };

    fetchCategoryWithProducts();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      {category && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
      )}

      {message && <div className="text-red-500 mb-4">{message}</div>}

      {products.length > 0 ? (
        <table className="min-w-full bg-white border-2 border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500">
          No products available for this category.
        </div>
      )}
    </div>
  );
};

export default CategoryWithProducts;
