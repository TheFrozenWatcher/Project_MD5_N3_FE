import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailForm } from '../../services/productDetailService';

const NewProductDetailForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    productDetailName: '',
    colorId: '',
    stock: '',
    unitPrice: '',
    imageFile: null,
    productId: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const dispatch = useDispatch();
  const { productList, colors, loading } = useSelector((state) => state.productDetail);

  useEffect(() => {
    dispatch(fetchProductDetailForm());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'status' ? value === 'true' : newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Product Detail Name</label>
        <input
          type="text"
          name="productDetailName"
          value={formData.productDetailName}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Color</label>
        <select
          name="colorId"
          value={formData.colorId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="" disabled>Select a color</option>
          {colors.map((color) => (
            <option key={color.colorId} value={color.colorId}>
              {color.colorName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Unit Price</label>
        <input
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
    
      <div>
        <label className="block text-gray-700">Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="" disabled>Select a product</option>
          {productList.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          name="imageFile"
          onChange={handleImageChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
        {imagePreview && (
          <img src={imagePreview} alt="Image preview" className="w-48 h-48 object-cover rounded" />
        )}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewProductDetailForm;
