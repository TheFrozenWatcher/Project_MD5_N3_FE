import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../../services/orderService";
import { useParams } from "react-router-dom";
import ConfirmStatusChangeModal from "../../components/orders/ConfirmOrderStatusChange";

const OrderDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetail(id));
  }, [dispatch, id]);

  if (loading === "pending") {
    return (
      <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded">
        Loading...
      </div>
    );
  }

  if (loading === "failed") {
    return (
      <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded">
        No order found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Information
          </h2>
          <div className="mb-2">
            <strong className="text-gray-600">Order ID:</strong> {order.id}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Created At:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Status:</strong> {order.status}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Total Price:</strong> $
            {order.totalPrice}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Total Discounted Price:</strong> $
            {order.totalDiscountedPrice}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Total Price After Coupon:</strong>{" "}
            ${order.totalPriceAfterCoupon}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Note:</strong>{" "}
            {order.note || "No note provided"}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Shipping Information
          </h2>
          <div className="mb-2">
            <strong className="text-gray-600">Phone:</strong> {order.phone}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Receive At:</strong>{" "}
            {new Date(order.receiveAt).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Serial Number:</strong>{" "}
            {order.serialNumber}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Address:</strong>
            <div>
              {order.fullAddress}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm col-span-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Additional Information
          </h2>
          <div className="mb-2">
            <strong className="text-gray-600">Coupon:</strong>{" "}
            {order.coupon
              ? `Coupon ID: ${order.coupon.id}`
              : "No coupon applied"}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">User:</strong>{" "}
            {order.user ? `User: ${order.username}` : "No user assigned"}
          </div>
        </div>
        <div className="flex justify-end col-span-full">
          
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Change Order Status
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmStatusChangeModal
          orderId={order.id}
          currentStatus={order.status}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderDetailPage;
