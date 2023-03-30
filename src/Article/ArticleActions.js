import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import agent from '../agent';

// 💡 hint: this should be replaced with a generic ROOT_REDIRECT action, see `common.js` reducer
import { DELETE_ARTICLE } from '../constants/actionTypes';

function ArticleActions(props) {
  const dispatch = useDispatch();

  // 💡 hint: this payload is not used
  const onClickDelete = (payload) => dispatch({ type: DELETE_ARTICLE, payload });

  const { article } = props;
  const del = () => {
    onClickDelete(agent.Articles.del(article.slug));
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" />
          {' '}
          Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del} type="button">
          <i className="ion-trash-a" />
          {' '}
          Delete Article
        </button>

      </span>
    );
  }

  return (
    <span />
  );
}

export default ArticleActions;
