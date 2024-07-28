import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentDetail from "./CommentDetail"; // Ensure this is correctly imported
import { useDispatch } from 'react-redux';
import { createCommentDetail } from '../../services/commentService'; // Ensure the path is correct

const Comment = ({
  comment,
  onEdit,
  onDelete,
  onToggleVisibility,
  isUserComment,
  isModerator,
}) => {
  const dispatch = useDispatch(); // Initialize the dispatch function from Redux
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(comment.commentId, editText);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(comment.commentId);
  };

  const handleToggleVisibilityClick = () => {
    onToggleVisibility(comment.commentId);
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      dispatch(createCommentDetail({
        commentId: comment.commentId,
        comment:replyText
      }))
        .unwrap()
        .then(() => {
          // Handle success (e.g., re-fetch comments)
          setReplyText("");
          setIsReplying(false);
        })
        .catch((error) => {
          console.error('Error creating comment detail:', error);
        });
    }
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  // If the comment is hidden and the user is neither the moderator nor the comment's author, return null to hide it
  if (!comment.status && !isModerator && !isUserComment) {
    return null;
  }

  return (
    <div
      className={`border border-gray-300 p-4 rounded-lg mb-4 ${
        !comment.status && isModerator ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start mb-2">
        <img
          src={comment.avatar || "default-avatar.png"}
          alt={`${comment.username}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{comment.username}</h3>
          <p className="text-sm text-gray-500">{comment.createdAt}</p>
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
        <p className="text-gray-700">{comment.comment}</p>
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
            className="text-yellow-500 hover:text-yellow-700"
          >
            {comment.status ? "Hide" : "Unhide"}
          </button>
        )}
        <button
          onClick={handleReplyClick}
          className="text-green-500 hover:text-green-700"
        >
          Reply
        </button>
      </div>

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            value={replyText}
            onChange={handleReplyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            type="submit"
            className="mt-2 bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
          >
            Submit Reply
          </button>
        </form>
      )}

      {comment.responseList && comment.responseList.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          {comment.responseList.map((response) => (
            <CommentDetail
              key={response.commentDetailId}
              commentDetail={response}
              isUserComment={response.madeByCurrentUser}
              isModerator={response.moderator}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    commentId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    responseList: PropTypes.arrayOf(
      PropTypes.shape({
        commentId: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        comment: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
      })
    ),
    status: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  isUserComment: PropTypes.bool.isRequired,
  isModerator: PropTypes.bool.isRequired,
};

export default Comment;
