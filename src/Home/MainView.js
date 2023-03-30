import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../components/ArticleList';
import agent from '../agent';
import { CHANGE_TAB } from '../constants/actionTypes';

function YourFeedTab(props) {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
}

function GlobalFeedTab(props) {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
}

function TagFilterTab(props) {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="" className="nav-link active">
        <i className="ion-pound" />
        {' '}
        {props.tag}
      </a>
    </li>
  );
}

function MainView() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.common.token);
  const {
    currentPage, articles, articlesCount, loading, pager, tab, tag,
  } = useSelector((state) => state.articleList);

  // eslint-disable-next-line no-shadow
  const onTabClick = (tab, pager, payload) => dispatch({
    type: CHANGE_TAB, tab, pager, payload,
  });

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={token}
            tab={tab}
            onTabClick={onTabClick}
          />

          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

          <TagFilterTab tag={tag} />

        </ul>
      </div>

      <ArticleList
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
}

export default MainView;
