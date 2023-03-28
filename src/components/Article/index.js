import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import agent from '../../agent';
// 💡 hint: those actions should be moved to `./store/actionTypes`
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
// 💡 hint: you need a separate, generic action action here `PAGE_UNLOADED` see `common.js` reducer

function Article(props) {
  const dispatch = useDispatch();
  const { article, comments, commentErrors } = useSelector((state) => state.article);
  const currentUser = useSelector((state) => state.common.currentUser);

  useEffect(() => {
    const payload = Promise.all([
      agent.Articles.get(props.match.params.id),
      agent.Comments.forArticle(props.match.params.id),
    ]);

    dispatch({ type: ARTICLE_PAGE_LOADED, payload });

    // 💡 hint: call PAGE_UNLOADED here as well
    return () => dispatch({ type: ARTICLE_PAGE_UNLOADED });

  // 💡 hint: destructure props and update dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitize: true }) };

  const canModify = props.currentUser
    && currentUser.username === article.author.username;

  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            canModify={canModify}
          />

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-xs-12">

            <div dangerouslySetInnerHTML={markup} />

            <ul className="tag-list">
              {
                article.tagList.map((tag) => (
                  <li
                    className="tag-default tag-pill tag-outline"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={props.match.params.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

export default Article;
