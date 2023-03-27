import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import agent from '../agent';
import Header from './Header';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import Article from './Article';
import Editor from './Editor';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import ProfileFavorites from './ProfileFavorites';
import Register from './Register';
import Settings from './Settings';
import { store } from '../store';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD, payload, token, skipTracking: true,
  }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

function App({
  onLoad, redirectTo, onRedirect, appLoaded, appName, currentUser,
}) {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    onLoad(token ? agent.Auth.current() : null, token);
  }, [onLoad]);

  useEffect(() => {
    if (redirectTo) {
      // context.router.replace(nextProps.redirectTo);
      store.dispatch(push(redirectTo));
      onRedirect();
    }
  }, [onRedirect, redirectTo]);

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
