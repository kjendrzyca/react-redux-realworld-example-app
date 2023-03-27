import React from 'react';
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

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
      agent.Comments.forArticle(this.props.match.params.id),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser
      && this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.article.title}</h1>
            <ArticleMeta
              article={this.props.article}
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
                  this.props.article.tagList.map((tag) => (
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
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
