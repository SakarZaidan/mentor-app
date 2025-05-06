import React from 'react';

const SocialMediaCard = ({
  post,
  onLike,
  onComment,
  onShare,
  platform = 'instagram',
  style = {},
  ...props
}) => {
  // This is a shared component that will be implemented differently
  // for web (using Material-UI) and mobile (using React Native Paper)
  // This file serves as a common interface definition
  
  return (
    <div 
      className={`
        social-card 
        social-card-${platform}
      `}
      style={style}
      {...props}
    >
      <div className="social-card-header">
        <div className="social-card-user-info">
          <div className="social-card-avatar"></div>
          <div className="social-card-user-details">
            <div className="social-card-username">{post.username}</div>
            <div className="social-card-timestamp">{post.timestamp}</div>
          </div>
        </div>
        <div className="social-card-platform-icon">{platform}</div>
      </div>
      
      <div className="social-card-content">
        {post.text && <div className="social-card-text">{post.text}</div>}
        {post.media && <div className="social-card-media"></div>}
      </div>
      
      <div className="social-card-actions">
        <button className="social-card-action" onClick={() => onLike(post.id)}>
          Like {post.likeCount > 0 && `(${post.likeCount})`}
        </button>
        <button className="social-card-action" onClick={() => onComment(post.id)}>
          Comment {post.commentCount > 0 && `(${post.commentCount})`}
        </button>
        <button className="social-card-action" onClick={() => onShare(post.id)}>
          Share
        </button>
      </div>
      
      {post.comments && post.comments.length > 0 && (
        <div className="social-card-comments">
          {post.comments.map((comment, index) => (
            <div key={index} className="social-card-comment">
              <span className="social-card-comment-username">{comment.username}</span>
              <span className="social-card-comment-text">{comment.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaCard;
