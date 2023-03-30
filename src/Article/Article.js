import React from 'react';
import PropTypes from 'prop-types';

import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

export function Article(props) {
  const {
    article, currentUser, comments, commentErrors, articleId,
  } = props;

  if (!article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitize: true }) };

  const canModify = currentUser
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
            comments={comments}
            errors={commentErrors}
            slug={articleId}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({}),
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  commentErrors: PropTypes.shape({}),
  articleId: PropTypes.string.isRequired,
};

Article.defaultProps = {
  article: null,
  comments: [],
  commentErrors: {},
};
