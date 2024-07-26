import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeOrderStatus } from "../../services/orderService";

const ConfirmStatusChangeModal = ({ orderId, currentStatus, onClose }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const dispatch = useDispatch();

  const handleChangeStatus = () => {
    dispatch(changeOrderStatus({ orderId, status: newStatus }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Change Order Status</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Status:</label>
          <select
            className="w-full border border-gray-300 rounded p-2 mt-2"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            defaultValue={currentStatus}
          >
            <option value="CONFIRM">Confirm</option>
            <option value="DELIVERY">Delivery</option>
            <option value="DENIED">Denied</option>
            <option value="SUCCESS">Success</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleChangeStatus}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStatusChangeModal;
