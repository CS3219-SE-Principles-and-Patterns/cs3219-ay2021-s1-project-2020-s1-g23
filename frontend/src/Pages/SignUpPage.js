import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Layout from '../Templates/Layout';
import * as Utils from '../utils';

function getErrorSignUpData(signUpData) {
  if (!signUpData.email) {
    return 'Email is a required field';
  }
  if (signUpData.email && !Utils.validateEmail(signUpData.email)) {
    return 'Email is invalid';
  }

  if (!signUpData.nickname) {
    return 'Nickname is a required field';
  }

  if (!signUpData.password) {
    return 'Password is a required field';
  }

  if (signUpData.password !== signUpData.retypePassword) {
    return 'Retyped password does not match password';
  }

  // form is valid, prints no error
  return '';
}

const initialState = {
  email: '',
  nickname: '',
  password: '',
  retypePassword: '',
};

function SignUpPage() {
  const [signUpData, setSignUpData] = useState(initialState);
  const [error, setError] = useState('');

  // update signup fields
  const handleChange = ({ target: { value, name } }) => {
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleClick = () => {
    const errorMsg = getErrorSignUpData(signUpData);
    if (!errorMsg) {
      setError('');
      const email = Utils.trimValue(signUpData.email);

      // *** PLACEHOLDER CODE: Send to backend ***
      console.log(`Email: ${email}`);
      console.log(`Nickname: ${signUpData.nickname}`);
      console.log(`Password: ${signUpData.password}`);
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
            value={signUpData.email}
          />
          <br />
          <input
            className="input-top"
            name="nickname"
            type="text"
            onChange={handleChange}
            placeholder="Nickname"
            value={signUpData.nickname}
          />
          <br />
          <input
            className="input-top"
            name="password"
            type="text"
            onChange={handleChange}
            placeholder="Password"
            value={signUpData.password}
          />
          <br />
          <input
            className="input-top"
            name="retypePassword"
            type="text"
            onChange={handleChange}
            placeholder="Retype assword"
            value={signUpData.retypePassword}
          />
        </form>
        <Button
          variant="primary"
          size="lg"
          className="mt-5 pp-button"
          onClick={handleClick}
        >
          SignUp
        </Button>
        <p className="error-message">{error}</p>
        <br />
        <a href="/login" className="mt-5">
          Already have an account? Click here to login!
        </a>
      </div>
    </Layout>
  );
}

export default SignUpPage;
