import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import agent from '../agent';
import Header from './Header';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import Article from './Article';
import Editor from './Editor';
import Home from '../Home';
import Login from './Login';
import Profile from './Profile';
import ProfileFavorites from './ProfileFavorites';
import Register from './Register';
import Settings from './Settings';
import { store } from '../store';

function App() {
  const dispatch = useDispatch();

  const appLoaded = useSelector(state => state.common.appLoaded);
  const appName = useSelector(state => state.common.appName);
  const currentUser = useSelector(state => state.common.currentUser);
  const redirectTo = useSelector(state => state.common.redirectTo);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    const payload = token ? agent.Auth.current() : null;

    dispatch({
      type: APP_LOAD, payload, token, skipTracking: true,
    });
  }, [dispatch]);

  useEffect(() => {
    if (redirectTo) {
      // context.router.replace(nextProps.redirectTo);
      store.dispatch(push(redirectTo));
      dispatch({ type: REDIRECT });
    }
  }, [dispatch, redirectTo]);

  if (appLoaded) {
    return (
      <div>
        <Header
          appName={appName}
          currentUser={currentUser}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header
        appName={appName}
        currentUser={currentUser}
      />
    </div>
  );
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default App;
