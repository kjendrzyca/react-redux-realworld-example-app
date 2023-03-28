import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';

const Promise = global.Promise;

function Home() {
  const dispatch = useDispatch();
  const appName = useSelector((state) => state.common.appName);
  const token = useSelector((state) => state.common.token);
  const tags = useSelector((state) => state.home.tags);

  useEffect(() => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token
      ? agent.Articles.feed
      : agent.Articles.all;

    const payload = Promise.all([agent.Tags.getAll(), articlesPromise()]);

    dispatch({
      type: HOME_PAGE_LOADED, tab, pager: articlesPromise, payload,
    });

    return () => dispatch({ type: HOME_PAGE_UNLOADED });
  }, [dispatch, token]);

  const onClickTag = (tag, pager, payload) => dispatch({
    type: APPLY_TAG_FILTER, tag, pager, payload,
  });

  return (
    <div className="home-page">

      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags
                tags={tags}
                onClickTag={onClickTag}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
