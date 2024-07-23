import React, { useEffect } from "react";
import "./index.scss";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, getWishlist } from "../../services/userService";
 export default function Wishlist() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        dispatch(deleteWishlist(id))
     .then(() => {
        dispatch(getWishlist());
      })
     .catch((err) => console.log(err));
    }
  };
 
  return (
    <div className="wishlist-page">
      <div className="wishlist-container shadow-lg rounded-lg p-6 bg-white">
        <h2 className="wishlist-title flex items-center text-2xl font-bold mb-4">
          My Wishlist{" "}
          <span className="edit-icon ml-2 text-gray-500 cursor-pointer">
            ✏️
          </span>
        </h2>
        <table className="wishlist-table w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b">Product Name</th>
              <th className="text-left p-4 border-b">Image</th>
              <th className="text-left p-4 border-b">Brand</th>
              <th className="text-left p-4 border-b">Category</th>
              <th className="text-left p-4 border-b">Description</th>
              <th className="text-left p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="product-info ">
                  <span>{item.productName}</span>
                </td>
                <td className="product-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image  rounded mr-4"
                  />
                </td>
                <td className="p-4">
                  <span>{item.brand.brandName}</span>
                </td>
                <td className="p-4">{item.category.categoryName}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">
                  <Button onClick={()=>handleDelete(item.id)} variant="contained" color="primary">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


