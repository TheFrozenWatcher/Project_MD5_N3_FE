// src/components/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/productService";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);

  const [updatedProduct, setUpdatedProduct] = useState({
    productName: "",
    description: "",
    imageFile: null,
    brandId: "",
    categoryId: "",
    imageFileList: [],
  });

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        productName: product.productName,
        description: product.description,
        imageFile: null,
        brandId: product.brandId,
        categoryId: product.categoryId,
        imageFileList: [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", updatedProduct.productName);
    formData.append("description", updatedProduct.description);
    formData.append("brandId", updatedProduct.brandId);
    formData.append("categoryId", updatedProduct.categoryId);
    if (updatedProduct.imageFile) {
      formData.append("imageFile", updatedProduct.imageFile);
    }
    updatedProduct.imageFileList.forEach((file) => {
      formData.append("imageFileList", file);
    });

    dispatch(updateProduct({ productId, formData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input type="text" name="productName" value={updatedProduct.productName} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
      </label>
      <label>
        Brand ID:
        <input type="text" name="brandId" value={updatedProduct.brandId} onChange={handleChange} required />
      </label>
      <label>
        Category ID:
        <input type="text" name="categoryId" value={updatedProduct.categoryId} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" name="imageFile" onChange={handleFileChange} />
      </label>
      <label>
        Additional Images:
        <input type="file" name="imageFileList" multiple onChange={handleFileChange} />
      </label>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
