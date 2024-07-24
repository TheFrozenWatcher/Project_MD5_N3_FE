import React from 'react';
import PropTypes from 'prop-types';
import CommentDetail from './CommentDetail'; // Ensure this is correctly imported

const Comment = ({ comment }) => {
  

  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4">
      <div className="flex items-start mb-2">
        <img
          src={comment.avatar || 'default-avatar.png'}
          alt={`${comment.username}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{comment.username}</h3>
          <p className="text-sm text-gray-500">{comment.createdAt}</p>
        </div>
      </div>
      <p className="text-gray-700">{comment.comment}</p>
      
      {comment.responseList && comment.responseList.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          {comment.responseList.map((response) => (
            <CommentDetail key={response.commentId} commentDetail={response} />
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
        review: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Comment;
