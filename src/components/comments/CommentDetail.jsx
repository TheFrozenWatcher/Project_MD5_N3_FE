import React, { useState } from "react";
import PropTypes from "prop-types";
import { createCommentDetail, deleteCommentDetail, toggleCommentDetail, updateCommentDetail } from "../../services/commentService";
import { useDispatch } from "react-redux";

const CommentDetail = ({
  commentDetail,
  isUserComment,
  isModerator,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(commentDetail.review);
  const dispatch=useDispatch();

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      dispatch(updateCommentDetail({
        commentDetailId: commentDetail.commentDetailId,
        comment: editText
      }));
      setIsEditing(false);
    }
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = (e) => {
      dispatch(deleteCommentDetail(commentDetail.commentDetailId));
  };
  const handleToggleVisibilityClick = () => {
    // Call the onToggleVisibility function with the current comment ID
    dispatch(toggleCommentDetail(commentDetail.commentDetailId));
  };

  // If the comment detail is hidden and the user is neither the moderator nor the comment's author, return null to hide it
  if (!commentDetail.status && !isModerator && !isUserComment) {
    return null;
  }

  return (
    <div
      className={`border border-gray-300 p-4 rounded-lg mb-4 ${
        !commentDetail.status && isModerator ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start mb-2">
        <img
          src={commentDetail.avatar || "default-avatar.png"}
          alt={`${commentDetail.username}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{commentDetail.username}</h3>
          <p className="text-sm text-gray-500">{commentDetail.createdAt}</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="mt-2">
          <textarea
            value={editText}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mt-2 ml-2 bg-gray-300 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      ) : (
        <p className="text-gray-700">{commentDetail.review}</p>
      )}

      <div className="mt-2 flex space-x-2">
        {isUserComment && (
          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        )}
        {(isUserComment || isModerator) && (
          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
        {isModerator && (
          <button
            onClick={handleToggleVisibilityClick}
            className={`${
              commentDetail.status ? "text-yellow-500 hover:text-yellow-700" : "text-green-500 hover:text-green-700"
            }`}
          >
            {commentDetail.status ? "Hide" : "Unhide"}
          </button>
        )}
      </div>
    </div>
  );
};

CommentDetail.propTypes = {
  commentDetail: PropTypes.shape({
    commentId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    status: PropTypes.bool.isRequired,
  }).isRequired,
  isUserComment: PropTypes.bool.isRequired,
  isModerator: PropTypes.bool.isRequired,
};

export default CommentDetail;
