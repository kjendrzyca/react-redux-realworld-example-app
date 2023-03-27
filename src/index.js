import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';

import App from './components/App';

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>

  // eslint-disable-next-line no-undef
  ), document.getElementById('root'),
);
