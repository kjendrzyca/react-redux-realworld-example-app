import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { articleReducer } from './Article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import common from './reducers/common';
import { editorReducer } from './Editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';

export default (history) => combineReducers({
  article: articleReducer,
  articleList,
  auth,
  common,
  editor: editorReducer,
  home,
  profile,
  settings,
  router: connectRouter(history),
});
