import React from 'react';
import { Link } from '../routing';
import { connect } from 'react-redux';

import api from '../api';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

import ArticleMeta from './ArticleMeta';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: api.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: api.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <ArticleMeta
        article={article}
        articleActions={(
          <div className="pull-xs-right">
            <button className={favoriteButtonClass} onClick={handleClick}>
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          </div>
        )}
      />

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
