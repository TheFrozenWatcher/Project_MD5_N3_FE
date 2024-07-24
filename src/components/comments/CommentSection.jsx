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
        <form>
          <label>
            Enter your comment here:
            <input type="text" placeholder="Rule: Comments must be civil!" />
          </label>
          <button type="submit">Post</button>
        </form>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))
      ) : (
        <div>No comments available.</div>
      )}
    </div>
  );
}
