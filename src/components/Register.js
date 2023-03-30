import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListErrors from './ListErrors';
import agent from '../api';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from '../constants/actionTypes';

function Register() {
  const dispatch = useDispatch();
  const {
    email, password, username, inProgress, errors,
  } = useSelector((state) => state.auth);

  const changeEmail = (ev) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value: ev.target.value });
  const changePassword = (ev) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value: ev.target.value });
  const changeUsername = (ev) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value: ev.target.value });
  // eslint-disable-next-line no-shadow
  const submitForm = (username, email, password) => (ev) => {
    ev.preventDefault();
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  };

  useEffect(() => () => dispatch({ type: REGISTER_PAGE_UNLOADED }), [dispatch]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">
                Have an account?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress}
                >
                  Sign up
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
