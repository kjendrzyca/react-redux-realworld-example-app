import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../api';

import ListErrors from './ListErrors';

import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from '../constants/actionTypes';

function SettingsForm(props) {
  const [state, setState] = useReducer(
    (currentState, newState) => ({ ...currentState, ...newState }),
    {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    },
  );

  const updateState = (field) => (ev) => {
    const newState = { ...state, [field]: ev.target.value };
    setState(newState);
  };

  const submitForm = (ev) => {
    ev.preventDefault();

    const user = { ...state };

    if (!user.password) {
      delete user.password;
    }

    props.onSubmitForm(user);
  };

  const { currentUser } = props;

  useEffect(() => {
    if (currentUser) {
      setState({
        image: currentUser.image || '',
        username: currentUser.username,
        bio: currentUser.bio,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  return (
    <form onSubmit={submitForm}>
      <fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={state.image}
            onChange={updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
            value={state.bio}
            onChange={updateState('bio')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={state.password}
            onChange={updateState('password')}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={state.inProgress}
        >
          Update Settings
        </button>

      </fieldset>
    </form>
  );
}

function Settings() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.common.currentUser);
  const settingsErrors = useSelector((state) => state.settings.errors);

  useEffect(() => () => {
    dispatch({ type: SETTINGS_PAGE_UNLOADED });
  }, [dispatch]);

  const onClickLogout = () => dispatch({ type: LOGOUT });
  const onSubmitForm = (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) });

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">

            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={settingsErrors} />

            <SettingsForm
              currentUser={currentUser}
              onSubmitForm={onSubmitForm}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={onClickLogout}
              type="submit"
            >
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
