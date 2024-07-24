import React from 'react';

export default function CommentDetail({ commentDetail }) {
  return (
    <div className="comment-detail border p-4 rounded shadow-md mb-4">
      <div className="flex items-center mb-2">
        <img
          src={commentDetail.avatar || '/default-avatar.png'} // Default avatar if none provided
          alt={`${commentDetail.username}'s avatar`}
          className="w-10 h-10 object-cover rounded-full mr-4"
        />
        <h3 className="text-lg font-bold">{commentDetail.username}</h3>
      </div>
      <p className="text-gray-700 mb-2">{commentDetail.review}</p>
      <p className="text-gray-500 text-sm">{commentDetail.createdAt.toString()}</p>
    </div>
  );
}
