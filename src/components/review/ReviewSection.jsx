import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchAllReviewsByProductDetailId,
  createReview,
  deleteReviewById,
  updateReview,
  toggleReview,
} from "../../services/reviewService";
import * as status from "../../constants/status";
import { FaStar } from "react-icons/fa";

export default function ReviewSection({ productDetailId }) {
  const dispatch = useDispatch();
  const {
    data: reviews,
    userCanCreateReview,
    loading,
    error,
  } = useSelector((state) => state.review);

  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewText, setEditingReviewText] = useState("");
  const [editingReviewRating, setEditingReviewRating] = useState(0);

  useEffect(() => {
    if (productDetailId) {
      dispatch(fetchAllReviewsByProductDetailId(productDetailId));
    }
  }, [dispatch, productDetailId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReviewText.trim() && newReviewRating > 0) {
      await dispatch(
        createReview({
          productDetailId,
          comments: newReviewText,
          rating: newReviewRating,
        })
      );
      setNewReviewText(""); // Clear the input field
      setNewReviewRating(0); // Clear the rating field
      dispatch(fetchAllReviewsByProductDetailId(productDetailId)); // Fetch reviews again
    }
  };

  const handleEditSubmit = async (e, reviewId) => {
    e.preventDefault();
    if (editingReviewText.trim() && editingReviewRating > 0) {
      await dispatch(
        updateReview({
          reviewId,
          comments: editingReviewText,
          rating: editingReviewRating,
        })
      );
      setEditingReviewId(null);
      setEditingReviewText("");
      setEditingReviewRating(0);
      dispatch(fetchAllReviewsByProductDetailId(productDetailId)); // Fetch reviews again
    }
  };

  const handleDelete = async (reviewId) => {
    await dispatch(deleteReviewById(reviewId));
    dispatch(fetchAllReviewsByProductDetailId(productDetailId)); // Fetch reviews again
  };

  const handleToggleVisibility = async (reviewId) => {
    await dispatch(toggleReview(reviewId));

    dispatch(fetchAllReviewsByProductDetailId(productDetailId)); // Fetch reviews again
  };

  if (loading === status.PENDING) {
    return <div>Loading reviews...</div>;
  }

  if (loading === status.FAILED) {
    return <div>Error loading reviews: {error}</div>;
  }

  return (
    <div>
      {userCanCreateReview && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            placeholder="Write your review"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <div className="flex items-center mb-2">
            <span>Rating:</span>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`cursor-pointer ${
                  i < newReviewRating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setNewReviewRating(i + 1)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-2 rounded"
          >
            Submit Review
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews found</div>
      ) : (
        reviews.map((review) => {
          const isHidden = review.status;
          const canViewHidden = review.madeByCurrentUser || review.moderator;

          if (isHidden && !canViewHidden) {
            return null; // Skip rendering this review
          }

          return (
            <div
              key={review.id}
              className={`border border-gray-300 p-2 rounded mb-2 ${
                isHidden ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.avatar}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{review.comments}</p>
                  <div className="flex items-center">
                    <span>Rating:</span>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={` ${
                          i < review.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500">
                    Created at: {review.createdAt}
                  </p>
                </div>
              </div>
              {review.moderator && (
                  <>
                    <button
                      onClick={() => handleToggleVisibility(review.id)}
                      className="bg-purple-500 text-white py-1 px-2 rounded mr-2"
                    >
                      {review.status ? "Unhide" : "Hide"}
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Delete
                    </button>
                  </>
                )}            </div>
          );
        })
      )}
    </div>
  );
}

ReviewSection.propTypes = {
  productDetailId: PropTypes.number.isRequired,
};
