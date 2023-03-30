import React from 'react';
import { useDispatch } from 'react-redux';
import agent from '../agent';
import { DELETE_COMMENT } from './store/actionTypes';

function DeleteButton(props) {
  const dispatch = useDispatch();
  const onClick = (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId });
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        {/* eslint-disable-next-line */}
        <i className="ion-trash-a" onClick={del} />
      </span>
    );
  }
  return null;
}

export default DeleteButton;
