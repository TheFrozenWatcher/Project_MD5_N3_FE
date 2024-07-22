import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  updateProduct,
  fetchProductForm,
} from "../../services/productService";

const UpdateProductForm = ({ productId, onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const { brands, categories, currentProduct, loading, error } = useSelector(
    (state) => state.product
  );
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileListPreview, setImageFileListPreview] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIds, setCurrentImageIds] = useState([]);

  useEffect(() => {
    dispatch(fetchProductForm());
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.productName || "");
      setDescription(currentProduct.description || "");
      setBrandId(currentProduct.brandId || "");
      setImage(currentProduct.image || "");
      setCategoryId(currentProduct.categoryId || "");
      setCurrentImageIds(currentProduct.imageIdList || []);
      console.log(currentImageIds);
      setCurrentImages(
        (currentProduct.imageList || []).map((img) => ({
          id: img.id,
          src: img.src,
        }))
      );
    }
  }, [currentProduct]);

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

  const handleRemoveCurrentImage = (id) => {
    setCurrentImages((prevImages) => prevImages.filter((img) => img.id !== id));
    setCurrentImageIds((prevIds) => prevIds.filter((removedId) => id != removedId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("productName", productName);
    formData.append("description", description);
    if (imageFile) formData.append("imageFile", imageFile);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("image", image);
    formData.append("imageIdList", currentImageIds);
    console.log("ids: "+currentImageIds);
    imageFileList.forEach((file) => formData.append("imageFileList", file));
    console.log("New current image Ids:" + currentImageIds);
    dispatch(updateProduct({ productId, formData }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
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
            {currentImages.map((img, index) => (
              <div key={img.id || index} className="relative">
                <img
                  src={img.src}
                  alt={`Current Image ${index}`}
                  className="h-20 w-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCurrentImage(img.id)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
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
          Update Product
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

export default UpdateProductForm;
