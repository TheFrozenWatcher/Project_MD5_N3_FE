import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailById, updateProductDetail, fetchProductDetailForm } from "../../services/productDetailService";

const UpdateProductDetailForm = ({ productDetailId, onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const { productList, colors, currentProductDetail, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const [productDetailName, setProductDetailName] = useState("");
  const [colorId, setColorId] = useState("");
  const [stock, setStock] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productId, setProductId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);


  useEffect(() => {
    dispatch(fetchProductDetailForm());
    if (productDetailId) {
      dispatch(fetchProductDetailById(productDetailId));
    }
  }, [dispatch, productDetailId]);

  useEffect(() => {
    if (currentProductDetail) {
      setProductDetailName(currentProductDetail.productDetailName || "");
      setColorId(currentProductDetail.colorId || "");
      setStock(currentProductDetail.stock || "");
      setUnitPrice(currentProductDetail.unitPrice || "");
      setProductId(currentProductDetail.productId || "");
      setImagePreview(currentProductDetail.image || "");
    }
  }, [currentProductDetail]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productDetail = {
    'productDetailName': productDetailName,
    'colorId': colorId,
    'stock':stock,
    'unitPrice': unitPrice,
    'productId': productId,
      'imageFile': imageFile,
    };
    onSubmit(productDetail);
  };

  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Detail Name</label>
          <input
            type="text"
            value={productDetailName}
            onChange={(e) => setProductDetailName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
          <select
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select a color</option>
            {colors.map((color) => (
              <option key={color.colorId} value={color.colorId}>{color.colorName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>Select a product</option>
            {productList.map((pro) => (
              <option key={pro.productId} value={pro.productId}>{pro.productName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Image Preview" className="mt-2 h-20 w-20 object-cover" />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Update Product Detail
        </button>
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateProductDetailForm;
