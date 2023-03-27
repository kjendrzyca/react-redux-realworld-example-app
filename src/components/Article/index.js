import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import agent from '../../agent';
// 💡 hint: those actions should be moved to `./store/actionTypes`
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
// 💡 hint: you need a separate, generic action action here `PAGE_UNLOADED` see `common.js` reducer

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    // 💡 hint: call PAGE_UNLOADED here as well
    // eslint-disable-next-line implicit-arrow-linebreak
    dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

function Article(props) {
  useEffect(() => {
    props.onLoad(Promise.all([
      agent.Articles.get(props.match.params.id),
      agent.Comments.forArticle(props.match.params.id),
    ]));

    return () => props.onUnload();
    // 💡 hint: destructure props and update dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.article) {
    return null;
  }

  const markup = { __html: marked(props.article.body, { sanitize: true }) };

  const canModify = props.currentUser
    && props.currentUser.username === props.article.author.username;

  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{props.article.title}</h1>
          <ArticleMeta
            article={props.article}
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
                props.article.tagList.map((tag) => (
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
            comments={props.comments || []}
            errors={props.commentErrors}
            slug={props.match.params.id}
            currentUser={props.currentUser}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
