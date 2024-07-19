// src/components/AddProduct.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../services/productService";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    imageFile: null,
    brandId: "",
    categoryId: "",
    imageFileList: [],
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input type="text" name="productName" value={product.productName} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </label>
      <label>
        Brand ID:
        <input type="text" name="brandId" value={product.brandId} onChange={handleChange} required />
      </label>
      <label>
        Category ID:
        <input type="text" name="categoryId" value={product.categoryId} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" name="imageFile" onChange={handleFileChange} />
      </label>
      <label>
        Additional Images:
        <input type="file" name="imageFileList" multiple onChange={handleFileChange} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
