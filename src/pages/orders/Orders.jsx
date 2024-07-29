import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FAILED, PENDING, SUCCESS } from "../../constants/status";
import Pagination from "../../components/pagination/Pagination";
import { fetchOrders } from "../../services/orderService";
import { Link, useNavigate } from 'react-router-dom';

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const { data: orders, loading, error, currentPage, totalPages } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage, pageSize: 5, sortField: 'createdAt', sortDirection: 'desc' }));
  }, [dispatch, currentPage]);

  if (loading === PENDING) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (loading === FAILED) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (loading === SUCCESS && orders.length === 0) {
    return <div className="text-center py-4">No orders found</div>;
  }

  const handlePageChange = (newPage) => {
    dispatch(fetchOrders({ page: newPage, pageSize: 5, sortField: 'createdAt', sortDirection: 'desc' }));
  };

  
  const handleChangeStatus = (orderId) => {
    // Implement the status change logic here
    console.log(`Change status for order ID: ${orderId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">${order.totalPriceAfterCoupon}</td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <Link to={`${order.id}`}>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Details
                </button>
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminOrderList;
