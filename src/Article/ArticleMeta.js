import { Link } from 'react-router-dom';
import React from 'react';
import ArticleActions from './ArticleActions';

function ArticleMeta(props) {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      {/* 💡 hint: we should inject that in props */}
      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
}

export default ArticleMeta;
