import React from 'react';
import Comment from './Comment';

function CommentList(props) {
  return (
    <div>
      {
        props.comments.map((comment) => (
          <Comment
            comment={comment}
            currentUser={props.currentUser}
            slug={props.slug}
            key={comment.id}
          />
        ))
      }
    </div>
  );
}

export default CommentList;
