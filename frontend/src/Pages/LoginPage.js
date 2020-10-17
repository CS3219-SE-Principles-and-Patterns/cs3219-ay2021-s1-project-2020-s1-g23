import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../Templates/Layout';
import * as Utils from '../utils';
import { loginUser } from '../redux/slices/userSlice';

function getErrorLoginData(loginData) {
  if (!loginData.email) {
    return 'Email is a required field';
  }
  if (loginData.email && !Utils.validateEmail(loginData.email)) {
    return 'Email is invalid';
  }
  if (!loginData.password) {
    return 'Password is a required field';
  }

  // form is valid, prints no error
  return '';
}

const initialState = { email: '', password: '' };

function LoginPage() {
  const [loginData, setLoginData] = useState(initialState);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  // update login fields
  const handleChange = ({ target: { value, name } }) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleClick = () => {
    const errorMsg = getErrorLoginData(loginData);
    if (!errorMsg) {
      setError('');
      const email = Utils.trimValue(loginData.email);
      dispatch(loginUser(email, loginData.password));
      history.push('/');
    } else {
      setError(errorMsg);
    }
  };

  return (
    <Layout>
      <div className="container fixed-bg text-center">
        <h1 className="text-center display-4 pb-5">PeerPrep</h1>
        <form>
          <input
            className="input-top"
            name="email"
            type="text"
            onChange={handleChange}
            placeholder="Email"
            value={loginData.email}
          />
          <br />
          <input
            className="input-top"
            name="password"
            type="text"
            onChange={handleChange}
            placeholder="Password"
            value={loginData.password}
          />
        </form>
        <Button
          variant="primary"
          size="lg"
          className="mt-5 pp-button"
          onClick={handleClick}
        >
          Login
        </Button>
        <p className="error-message">{error}</p>
        <br />
        <a href="/signup" className="mt-5">
          Don&apos;t have an account? Click here to sign up!
        </a>
      </div>
    </Layout>
  );
}

export default LoginPage;
