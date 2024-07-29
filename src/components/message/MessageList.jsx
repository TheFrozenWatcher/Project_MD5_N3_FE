import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages, setMessageStatus } from "../../services/messageService";

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const loading = useSelector((state) => state.message.loading);
  const error = useSelector((state) => state.message.error);

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  const markAllAsRead = () => {
    dispatch(setMessageStatus());
  };

  if (loading) {
    return <div className="text-gray-700">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Messages</h2>
        <button
          onClick={markAllAsRead}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Mark all as read
        </button>
      </div>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-gray-700">No messages to display</div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded bg-gray-50"
            >
              {message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
