import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductForm, createProduct } from "../../services/productService";

const NewProductForm = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const { brands, categories, loading, error } = useSelector(
    (state) => state.product
  );
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileListPreview, setImageFileListPreview] = useState([]);

  useEffect(() => {
    dispatch(fetchProductForm());
  }, [dispatch]);

  const handleImageFileChange = (e) => {
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

  const handleImageFileListChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFileList(files);

    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(previews).then((images) => {
      setImageFileListPreview(images);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      description,
      imageFile,
      imageFileList,
      brandId,
      categoryId,
    };
    onSubmit(productData);
  };

  return (
    <form
      onSubmit={handleSubmit} encType="multipart/form-data"
      className="p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Select a brand
            </option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Main Image
          </label>
          <input
            type="file"
            onChange={handleImageFileChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Main Preview"
              className="mt-2 h-20 w-20 object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Additional Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageFileListChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {imageFileListPreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="h-20 w-20 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Product
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewProductForm;
