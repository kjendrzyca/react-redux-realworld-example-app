import React, { useReducer, useEffect } from 'react';
import { Link } from '../routing';
import ListErrors from './ListErrors';
import api from '../api';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: ({ username, email, password }) => {
    const payload = api.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

function useForm(onSubmit) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {},
  )

  const changeValue = ({ target: { name, value } }) => {
    setState({
      [name]: value,
    })
  }

  const submitForm = ev => {
    ev.preventDefault();
    onSubmit(state);
  }

  return {
    values: state,
    changeValue,
    submitForm,
  }
}

function Register(props) {
  const {onUnload, onSubmit} = props;

  const {values, changeValue, submitForm} = useForm(onSubmit)

  useEffect(() => onUnload(), [onUnload]);

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

            <ListErrors errors={props.errors} />

            <form onSubmit={submitForm}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={changeValue}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={changeValue}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={changeValue}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={props.inProgress}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
