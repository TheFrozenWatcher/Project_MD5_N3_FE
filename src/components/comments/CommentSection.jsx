import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCommentsByProduct } from "../../services/commentService";
import { useParams } from "react-router-dom";
import Comment from "./Comment"; // Ensure this component is correctly imported

export default function CommentSection() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: comments,
    userComment,
    userCommentExists,
    loading,
    error,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllCommentsByProduct(id));
  }, [dispatch, id]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Comments</h2>
      {userCommentExists ? (
        <Comment comment={userComment} /> // Render the user comment using the Comment component
      ) : (
        <form className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
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
          <Comment key={comment.commentId} comment={comment} />
        ))
      ) : (
        <div className="text-center text-gray-500 italic">
          No comments available.
        </div>
      )}
    </div>
  );
}
