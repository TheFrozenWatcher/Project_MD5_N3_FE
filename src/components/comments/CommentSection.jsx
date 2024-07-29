import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCommentsByProduct, createComment, updateComment, deleteCommentById, toggleComment } from "../../services/commentService";
import { useParams } from "react-router-dom";
import Comment from "./Comment"; // Ensure this component is correctly imported
import * as status from "../../constants/status"; // Import status constants

export default function CommentSection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState(""); // Local state for new comment
  const {
    data: comments,
    userCommentExists,
    loading,
    error,
    moderator
  } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllCommentsByProduct(id));
  }, [dispatch, id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(createComment({ productId: id, comment: newComment }))
        .unwrap()
        .then(() => {
          setNewComment(""); // Clear input after successful submission
          dispatch(fetchAllCommentsByProduct(id)); // Re-fetch comments after creating a new one
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
    }
  };

  const handleToggleComment = (e) => {
      dispatch(toggleComment(e))
        .unwrap()
        .then(() => {
          setNewComment(""); // Clear input after successful submission
          dispatch(fetchAllCommentsByProduct(id)); // Re-fetch comments after creating a new one
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
        });
  };

  const handleEditComment = (commentId, updatedComment) => {
    dispatch(updateComment({ commentId, comment: updatedComment }))
      .unwrap()
      .then(() => {
        dispatch(fetchAllCommentsByProduct(id)); // Re-fetch comments after updating
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentById(commentId))
      .unwrap()
      .then(() => {
        dispatch(fetchAllCommentsByProduct(id)); // Re-fetch comments after deleting
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };


  if (loading === status.PENDING) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Comments</h2>
      {!userCommentExists && (
        <form onSubmit={handleCommentSubmit} className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
          <div>
            <label
              htmlFor="comment"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Enter your comment here:
            </label>
            <input
              id="comment"
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Rule: Comments must be civil!"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post
          </button>
        </form>
      )}

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.commentId}
            comment={comment}
            onEdit={handleEditComment}
            onToggleVisibility={handleToggleComment}
            onDelete={handleDeleteComment}
            isUserComment={comment.madeByCurrentUser}
            isModerator={comment.moderator}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 italic">
          No comments available.
        </div>
      )}
    </div>
  );
}
