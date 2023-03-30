import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../api';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from './store/actionTypes';
import { PAGE_UNLOADED } from '../constants/actionTypes';

import { Article } from './Article';

export function ArticleContainer(props) {
  const dispatch = useDispatch();
  const { article, comments, commentErrors } = useSelector((state) => state.article);
  const currentUser = useSelector((state) => state.common.currentUser);

  const { id: articleId } = props.match.params;

  useEffect(() => {
    const payload = Promise.all([
      agent.Articles.get(articleId),
      agent.Comments.forArticle(articleId),
    ]);

    dispatch({ type: ARTICLE_PAGE_LOADED, payload });

    return () => {
      dispatch({ type: ARTICLE_PAGE_UNLOADED });
      dispatch({ type: PAGE_UNLOADED });
    };

  // 💡 hint: destructure props and update dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log({ article });

  return (
    <Article
      article={article}
      comments={comments}
      commentErrors={commentErrors}
      currentUser={currentUser}
      articleId={articleId}
    />
  );
}
