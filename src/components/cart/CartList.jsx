import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItems,
  deleteCartById,
  updateCart,
  deleteAllCart,
} from "../../services/cartService";
import { Link } from "react-router-dom";

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCartById(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Prevent quantity from being less than 1
    dispatch(updateCart({ productDetailId: id, quantity }));
  };

  const handleClearAll = () => {
    dispatch(deleteAllCart());
  };

  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cart items: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Index</th>
                <th className="p-2 text-left">Product Information</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Unit Price</th>
                <th className="p-2 text-left">Total Price</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <Link to={`/user/product/${item.productId}`}>
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <span className="ml-4">{item.productName}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productDetailId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productDetailId,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="mx-2 w-12 text-center border rounded"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productDetailId, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-center">${item.unitPrice?.toFixed(2)}</td>
                  <td className="p-2 text-center">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDelete(item.cartId)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total Cart Price: ${calculateTotalPrice(cartItems)}
            </h2>
            <button
              onClick={handleClearAll}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear All Items
            </button>
            <Link to="/user/payment" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
              Order
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
