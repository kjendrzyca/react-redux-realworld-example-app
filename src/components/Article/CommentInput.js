import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';

function CommentInput(props) {
  const dispatch = useDispatch();
  const onSubmit = (payload) => dispatch({ type: ADD_COMMENT, payload });
  const [body, setBody] = useState('');

  const createComment = (ev) => {
    ev.preventDefault();
    const payload = agent.Comments.create(
      props.slug,
      { body },
    );
    setBody('');
    onSubmit(payload);
  };

  const onChangeHandler = (ev) => {
    setBody(ev.target.value);
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={onChangeHandler}
          rows="3"
        />
      </div>
      <div className="card-footer">
        <img
          src={props.currentUser.image}
          className="comment-author-img"
          alt={props.currentUser.username}
        />
        <button
          className="btn btn-sm btn-primary"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentInput;
