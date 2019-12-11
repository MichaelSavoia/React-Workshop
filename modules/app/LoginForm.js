import React, { useState, useRef } from 'react';
import { login } from 'app/utils';
import VisuallyHidden from '@reach/visually-hidden';
import { FiLogIn } from 'react-icons/fi';
import TabsButton from 'app/TabsButton';

function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleShowPassword = event => {
    setShowPassword(event.target.checked);
  };

  return (
    <>
      {error && (
        <div>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <VisuallyHidden>
          <label htmlFor="login:email">Email:</label>
        </VisuallyHidden>
        <input
          ref={emailRef}
          id="login:email"
          className="input-field"
          placeholder="you@example.com"
          required
          type="text"
        />

        <VisuallyHidden>
          <label htmlFor="login:password">Password:</label>
        </VisuallyHidden>
        <input
          ref={passwordRef}
          id="login:password"
          type={showPassword ? 'text' : 'password'}
          className="input-field"
          required
          placeholder="Password"
        />
        <p>
          <label>
            <input
              className="password-checkbox"
              type="checkbox"
              onChange={handleShowPassword}
              defaultChecked={showPassword}
            />{' '}
            show password
          </label>
        </p>
        <TabsButton>
          <FiLogIn />
          <span>{loading ? 'Loading...' : 'Login'}</span>
        </TabsButton>
      </form>
    </>
  );
}

export default LoginForm;
