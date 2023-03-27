import { Link } from 'react-router-dom';
import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import ListErrors from '../ListErrors';

function CommentContainer(props) {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    );
  }
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
        <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
      </p>

      <CommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser}
      />
    </div>
  );
}

export default CommentContainer;
